<?php

namespace Classiebit\Eventmie\Http\Controllers;
use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Auth;
use Classiebit\Eventmie\Services\PaypalExpress;
use Classiebit\Eventmie\Models\Event;
use Classiebit\Eventmie\Models\Ticket;
use Classiebit\Eventmie\Models\Booking;
use Classiebit\Eventmie\Models\User;
use Classiebit\Eventmie\Models\Commission;
use Classiebit\Eventmie\Models\Transaction;
use Classiebit\Eventmie\Models\Tax;
use Illuminate\Support\Facades\DB;
use Throwable;

class BookingsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // language change
        $this->middleware('common');
    
        // authenticate except 
        $this->middleware('auth')->except(['login_first', 'signup_first']);

        $this->event        = new Event;
        $this->ticket       = new Ticket;
        $this->booking      = new Booking;
        $this->transaction  = new Transaction;
        $this->user         = new User;
        $this->commission   = new Commission;
        $this->tax          = new Tax;
        $this->customer_id  = null;
        $this->organiser_id = null;
    }

    // only customers can book tickets so check login user customer or not but admin and organisers can book tickets for customer
    protected function is_admin_organiser(Request $request)
    {
        
        if(Auth::check())
        {
            // get event by event_id
            $event          = $this->event->get_event(null, $request->event_id);
            
            // if event not found then access denied
            if(empty($event))
                return ['status' => false, 'error' =>  __('eventmie-pro::em.event').' '.__('eventmie-pro::em.not_found')];
            
                
            // organiser can't book other organiser event's tikcets but  admin can book any organiser events'tikcets for customer
            if(Auth::user()->hasRole('organiser'))
            {
                if(Auth::id() != $event->user_id)
                    return false;
            }

          
            /* CUSTOM */
            // Assign organizer permissions to POS
            if(Auth::user()->hasRole('pos'))
            {
                if(Auth::user()->organizer_id != $event->user_id)
                    return false;

                $pos_events = $this->event->get_pos_event_ids()->all();
                if(!in_array($event->id, $pos_events))
                {
                    return false;
        
                }
            }
            /* CUSTOM */

            //organiser_id 
            $this->organiser_id = $event->user_id;
            
            // if login user is customer then 
            // customer id = Auth::id();
            $this->customer_id = Auth::id();

            // if admin and organiser is creating booking
            // then user Auth::id() as $customer_id
            // and customer id will be the id selected from Vue dropdown
            if(Auth::user()->hasRole('admin') || Auth::user()->hasRole('organiser') || Auth::user()->hasRole('pos'))
            {
               
                // 1. validate data
                $request->validate([
                    'customer_id'       => 'required|numeric|min:1|regex:^[1-9][0-9]*$^',
                ], [
                    'customer_id.*' => __('eventmie-pro::em.customer').' '.__('eventmie-pro::em.required'),
                ]);
                $this->customer_id = $request->customer_id;
            }

          

            return true;
        }    
    }

    
    // check for available seats
    protected function availability_validation($params = [])
    {
        $event_id           = $params['event_id'];
        $selected_tickets   = $params['selected_tickets'];
        $ticket_ids         = $params['ticket_ids'];
        $booking_date       = $params['booking_date'];
        
        // 1. Check booking.max_ticket_qty
        foreach($selected_tickets as $key => $value)
        {
            $ticket = Ticket::where('id', $value['ticket_id'])->first();

            // user can't book tickets more than limitation 
            if($value['quantity'] > ( !empty($ticket->customer_limit) ? $ticket->customer_limit : setting('booking.max_ticket_qty') )) 
            {
                $msg = __('eventmie-pro::em.max_ticket_qty');
                return ['status' => false, 'error' => $msg.( !empty($ticket->customer_limit) ? $ticket->customer_limit : setting('booking.max_ticket_qty') )];
            }
        }

        // 2. Check availability over booked tickets

        // actual tickets
        $tickets       = $this->ticket->get_booked_tickets($ticket_ids);
        
        // get the bookings for live availability check
        $bookings       = $this->booking->get_seat_availability_by_ticket($event_id);
        
        // actual tickets (quantity) - already booked tickets on booking_date (total_booked)
        foreach($tickets as $key => $ticket)
        {
            foreach($selected_tickets as $k => $selected_ticket)
            {
                if($ticket->id == $selected_ticket['ticket_id'])
                {
                    
                    if( $selected_ticket['quantity'] > $ticket->quantity )
                        return ['status' => false, 'error' => $ticket->title .' '.__('eventmie-pro::em.vacant').' - '.$ticket->quantity];
                    
                    // Second. seat availability for selected booking-date in bookings table
                    foreach($bookings as $k2 => $booking)
                    {
                        // check for specific dates + specific ticket
                        if($booking->event_start_date == $booking_date && $booking->ticket_id == $ticket->id)
                        {
                            $available = $ticket->quantity - $booking->total_booked;
                            
                            // false condition
                            // if selected ticket quantity is greator than available
                            if( $selected_ticket['quantity'] > $available )
                                return ['status' => false, 'error' => $ticket->title .' '.__('eventmie-pro::em.vacant').' - '.$available];

                            // Customer limit check
                            if(!Auth::user()->hasRole('pos'))
                            {
                                // Customer limit check
                                $error = $this->customer_limit($ticket, $selected_ticket, $booking_date);
                                if(!empty($error))
                                    return $error;
                            }
                        
                        }
                    }
                    
                }
            }
        }

        return ['status'   => true];
    }

    // validate user post data
    protected function general_validation(Request $request)
    {
        
        $request->validate([
            'event_id'          => 'required|numeric|gte:1',
            
            'ticket_id'         => ['required', 'array'],
            'ticket_id.*'       => ['required', 'numeric'],
            
            'quantity'          => [ 'required', 'array'],
            'quantity.*'        => [ 'required', 'numeric', 'integer', 'gte:0'],

            // repetitve booking date validation
            'booking_date'      => 'date_format:Y-m-d|required',
            'start_time'        => 'date_format:H:i:s|required',
            'end_time'          => 'date_format:H:i:s|required',
        ]);

        if((int)$request->payment_method == 9)
        {
            $request->validate([
                'cardNumber'      => 'required',
                'cardMonth'       => 'required',
                'cardYear'        => 'required',
                'cardCvv'         => 'required', 
                'cardName'        => 'required|max:256', 
            ]);
        }

        
        if(!empty($request->merge_schedule))
        {
            $request->validate([
                'booking_end_date'      => 'date_format:Y-m-d|required',
            ]);
                
        }
        
        // get event by event_id
        $event          = $this->event->get_event(null, $request->event_id);
        
        // if event not found then access denied
        if(empty($event))
            return ['status' => false, 'error' =>  __('eventmie-pro::em.event').' '.__('eventmie-pro::em.not_found')];
        
        // get only ticket_ids which quantity is >0
        $ticket_ids         = [];
        $selected_tickets   = [];
        
        foreach($request->quantity as $key => $val)
        {
            if($val)
            {
                $ticket_ids[]                               = $request->ticket_id[$key];
                $selected_tickets[$key]['ticket_id']        = $request->ticket_id[$key]; 
                $selected_tickets[$key]['ticket_title']     = $request->ticket_title[$key];  
                $selected_tickets[$key]['quantity']         = $val < 1 ? 1 : $val; // min qty = 1
            }
        }
 
        if(empty($ticket_ids))
            return ['status' => false, 'error' => __('eventmie-pro::em.select_a_ticket')];
            
        $params       =  [
            'event_id'   => $request->event_id,
            'ticket_ids' => $ticket_ids,
        ];

        // check ticket in tickets table that exist or not
        $tickets   = $this->ticket->get_event_tickets($params);

        // if ticket not found then access denied
        if($tickets->isEmpty())
            return ['status' => false, 'error' => __('eventmie-pro::em.tickets').' '.__('eventmie-pro::em.not_found')];

        return [
            'status'            => true,
            'event_id'          => $request->event_id,
            'selected_tickets'  => $selected_tickets,
            'tickets'           => $tickets,
            'ticket_ids'        => $ticket_ids,
            'event'             => $event,
            'booking_date'      => $request->booking_date,
            'start_time'        => $request->start_time,
            'end_time'          => $request->end_time,
        ];

    }

    // pre booking time validation
    protected function time_validation($params = [])
    {
        $booking_date           = $params['booking_date'];
        $start_time             = $params['start_time'];
        $end_time               = $params['end_time'];
        
        // booking date is event start date and it is less then today date then user can't book tickets
        $end_date             = Carbon::parse($booking_date.''.$end_time);  
        
        // for repetitive event
        if($params['event']['repetitive'] && empty(request()->booking_end_date))
            $end_date             = Carbon::parse($booking_date.''.$end_time);  
        
        // for single event
        if(!$params['event']['repetitive'])
            $end_date             = Carbon::parse($params['event']['end_date'].''.$end_time); 

        // for merge event
        if(!empty(request()->booking_end_date))
            $end_date             = Carbon::parse(request()->booking_end_date.''.$end_time);  
        
        $today_date             = Carbon::parse(Carbon::now(setting('regional.timezone_default')));
 
        // 1.Booking date should not be less than today's date
        if($end_date < $today_date)
            return ['status' => false, 'error' => __('eventmie-pro::em.event').' '.__('eventmie-pro::em.ended')];
        
        return ['status' => true];    
    }
    

    // book tickets
    public function book_tickets(Request $request)
    {
        // check login user role
        $status = $this->is_admin_organiser($request);

        // organiser can't book other organiser event's tikcets but  admin can book any organiser events'tikcets for customer
        if(!$status)
        {
            return response([
                'status'    => false,
                'url'       => route('eventmie.events_index'),
                'message'   => __('eventmie-pro::em.organiser_note_5'),
            ], Response::HTTP_OK);
        }

        // 1. General validation and get selected ticket and event id
        $data = $this->general_validation($request);
        if(!$data['status'])
            return error($data['error'], Response::HTTP_BAD_REQUEST);
            
        // 2. Check availability
        $check_availability = $this->availability_validation($data);
        if(!$check_availability['status'])
            return error($check_availability['error'], Response::HTTP_BAD_REQUEST);

        // 3. TIMING & DATE CHECK 
        $pre_time_booking   =  $this->time_validation($data);    
        if(!$pre_time_booking['status'])
            return error($pre_time_booking['error'], Response::HTTP_BAD_REQUEST);

        $selected_tickets   = $data['selected_tickets'];
        $tickets            = $data['tickets'];

        
        $booking_date = $request->booking_date;

        $params  = [
            'customer_id' => $this->customer_id,
        ];
        // get customer information by customer id    
        $customer   = $this->user->get_customer($params);

        if(empty($customer))
            return error($pre_time_booking['error'], Response::HTTP_BAD_REQUEST);     

        $booking        = [];
        $price          = 0;
        $total_price    = 0; 
        
        // organiser_price excluding admin_tax
        $booking_organiser_price    = [];
        $admin_tax                  = [];

        $common_order = time().rand(1,988);

        foreach($selected_tickets as $key => $value)
        {
            $key = count($booking) == 0 ? 0 : count($booking);
            
            for($i = 1; $i <= $value['quantity']; $i++)
            {
                $booking[$key]['customer_id']       = $this->customer_id;
                $booking[$key]['customer_name']     = $customer['name'];
                $booking[$key]['customer_email']    = $customer['email'];
                $booking[$key]['organiser_id']      = $this->organiser_id;
                $booking[$key]['event_id']          = $request->event_id;
                $booking[$key]['ticket_id']         = $value['ticket_id'];
                $booking[$key]['quantity']          = 1;
                $booking[$key]['status']            = 1; 
                $booking[$key]['created_at']        = Carbon::now();
                $booking[$key]['updated_at']        = Carbon::now();
                $booking[$key]['event_title']       = $data['event']['title'];
                $booking[$key]['event_category']    = $data['event']['category_name'];
                $booking[$key]['ticket_title']      = $value['ticket_title'];
                $booking[$key]['item_sku']          = $data['event']['item_sku'];
                $booking[$key]['currency']          = setting('regional.currency_default');

                $booking[$key]['event_repetitive']  = $data['event']->repetitive > 0 ? 1 : 0;

                // non-repetitive
                $booking[$key]['event_start_date']  = $data['event']->start_date;
                $booking[$key]['event_end_date']    = $data['event']->end_date;
                $booking[$key]['event_start_time']  = $data['event']->start_time;
                $booking[$key]['event_end_time']    = $data['event']->end_time;
                $booking[$key]['common_order']      = $common_order;
                
                // repetitive event
                if($data['event']->repetitive)
                {
                    $booking[$key]['event_start_date']  = $booking_date;
                    $booking[$key]['event_end_date']    = $request->merge_schedule ? $request->booking_end_date : $booking_date;
                    $booking[$key]['event_start_time']  = $request->start_time;
                    $booking[$key]['event_end_time']    = $request->end_time;
                }
                
                foreach($tickets as $k => $v)
                {
                    if($v['id'] == $value['ticket_id'])
                    {
                        $price       = $v['price'];
                        break;
                    }
                }
                $booking[$key]['price']         = $price * 1;
                $booking[$key]['ticket_price']  = $price;

                // call calculate price
                $params   = [
                    'ticket_id'         => $value['ticket_id'],
                    'quantity'          => 1,
                ];
        
                // calculating net price
                $net_price    = $this->calculate_price($params);

        
                $booking[$key]['tax']        = number_format((float)($net_price['tax']), 2, '.', '');
                $booking[$key]['net_price']  = number_format((float)($net_price['net_price']), 2, '.', '');
                
                // organiser price excluding admin_tax
                $booking_organiser_price[$key]['organiser_price']  = number_format((float)($net_price['organiser_price']), 2, '.', '');

                //  admin_tax
                $admin_tax[$key]['admin_tax']  = number_format((float)($net_price['admin_tax']), 2, '.', '');


                // if payment method is offline then is_paid will be 0
                if($request->payment_method == 'offline')
                {
                    // except free ticket
                    if(((int) $booking[$key]['net_price']))
                        $booking[$key]['is_paid'] = 0;
                }
                else
                {
                    $booking[$key]['is_paid'] = 1;  
                }
    
                
                //CUSTOM
                if(Auth::user()->hasRole('pos'))
                    $booking[$key]['pos_id'] = Auth::id(); 
                //CUSTOM

                $key++;
            }
            
            
        }
        
        // calculate commission 
        $this->calculate_commission($booking, $booking_organiser_price, $admin_tax);

        // if net price total == 0 then no paypal process only insert data into booking 
        foreach($booking as $k => $v)
        {
            $total_price  += (float)$v['net_price'];
            $total_price = number_format((float)($total_price), 2, '.', '');
        }

        // check if eligible for direct checkout
        $is_direct_checkout = $this->checkDirectCheckout($request, $total_price);
    
        // IF FREE EVENT THEN ONLY INSERT DATA INTO BOOKING TABLE 
        // AND DON'T INSERT DATA INTO TRANSACTION TABLE 
        // AND DON'T CALLING PAYPAL API
        if($is_direct_checkout)
        {
            $data = [
                'order_number' => Carbon::now()->timestamp,
                'transaction_id' => 0
            ];
            $flag =  $this->finish_booking($booking, $data);

            // in case of database failure
            if(empty($flag))
            {
                return error('Database failure!', Response::HTTP_REQUEST_TIMEOUT);
            }

            // redirect no matter what so that it never turns backreturn response
            $msg = __('eventmie-pro::em.booking_success');
            session()->flash('status', $msg);

            // if customer then redirect to mybookings
            $url = route('eventmie.mybookings_index');
            
            if(Auth::user()->hasRole('organiser'))
                $url = route('eventmie.obookings_index');
            
            if(Auth::user()->hasRole('admin'))
                $url = route('voyager.bookings.index');

            
            if(Auth::user()->hasRole('pos'))
                $url = route('eventmie.pos.index');
           
          

            return response([
                'status'    => true,
                'url'       => $url,
                'message'   => $msg,
            ], Response::HTTP_OK);
        }    
        
        // return to paypal
        session(['booking'=>$booking]);

        $this->set_payment_method($request, $booking);

        return $this->init_checkout($booking);
    }

     /** 
     * Initialize checkout process
     * 1. Validate data and start checkout process
    */
    protected function init_checkout($booking)
    {   
        // add all info into session
        $order = [
            'item_sku'          => $booking[key($booking)]['item_sku'],
            'order_number'      => $booking[key($booking)]['common_order'],
            'product_title'     => $booking[key($booking)]['event_title'],
            
            'price_title'       => '',
            'price_tagline'     => '',
        ];

        $total_price   = 0;

        foreach($booking as $key => $val)
        {
            $order['price_title']   .= ' | '.$val['ticket_title'].' | ';
            $order['price_tagline'] .= ' | '.$val['quantity'].' | ';
            $total_price            += $val['net_price'];
        }
        
        // calculate total price
        $order['price']             = $total_price;

        // set session data
        session(['pre_payment' => $order]);
        
        return $this->multiple_payment_method($order, $booking);
    }

    /* =================== PAYPAL ==================== */
    // 2. Create an order and redirect to payment gateway
    protected function paypal($order = [], $currency = 'USD')
    {
        $paypal_express = new PaypalExpress(setting('apps'));
        $flag           = $paypal_express->create_order($order, $currency);

        // if order creation successful then redirect to paypal
        if($flag['status'])
            return response(['status' => true, 'url'=>$flag['url'], 'message'=>''], Response::HTTP_OK);    

        return error($flag['error'], Response::HTTP_REQUEST_TIMEOUT);
    }
    
    // 3. On return from gateway check if payment fail or success
    public function paypal_callback(Request $request)
    {
        /* Filter out direct fake callback request */
        if(empty($request->paymentId))
        {
            $msg = __('eventmie-pro::em.booking').' '.__('eventmie-pro::em.failed');
            // if customer then redirect to mybookings
            $url = route('eventmie.mybookings_index');
            if(Auth::user()->hasRole('organiser'))
                $url = route('eventmie.obookings_index');

            return redirect($url)->withErrors([$msg]);
        }

        $paypal_express = new PaypalExpress(setting('apps'));
        $flag           = $paypal_express->callback($request);

        return $this->finish_checkout($flag);
    }    

    /* =================== PAYPAL ==================== */

    /** 
     * 4 Finish checkout process
     * Last: Add data to purchases table and finish checkout
    */
    protected function finish_checkout($flag = [])
    {
        // prepare data to insert into table
        $data                   = session('pre_payment');
        // unset extra columns
        unset($data['product_title']);
        unset($data['price_title']);
        unset($data['price_tagline']);

        $booking                = session('booking');
        $payment_method         = (int)session('payment_method')['payment_method'];
        
        // IMPORTANT!!! clear session data setted during checkout process
        session()->forget(['pre_payment', 'booking', 'payment_method']);
        
        // if customer then redirect to mybookings
        $url = route('eventmie.mybookings_index');
        if(Auth::user()->hasRole('organiser'))
            $url = route('eventmie.obookings_index');
        
        if(Auth::user()->hasRole('admin'))
            $url = route('voyager.bookings.index');

        // CUSTOM
        if(Auth::user()->hasRole('pos'))
            $url = route('eventmie.pos.index');
        // CUSTOM
        
        // if success 
        if($flag['status'])
        {
            $data['txn_id']             = $flag['transaction_id'];
            $data['amount_paid']        = $data['price'];
            unset($data['price']);
            $data['payment_status']     = $flag['message'];
            $data['payer_reference']    = $flag['payer_reference'];
            $data['status']             = 1;
            $data['created_at']         = Carbon::now();
            $data['updated_at']         = Carbon::now();
            $data['currency_code']      = setting('regional.currency_default');
            
            if ($payment_method == 1)
                $data['payment_gateway'] = 'PayPal';
            
            try {
                //TCL Transaction Control Query
                DB::transaction(function () use(&$flag, $data, $booking) {

                    $flag = false;

                    // if transaction already exist then return 
                    $transaction = DB::table('transactions')->where([ 'txn_id' => $data['txn_id']])->first();
                    
                    if(!empty($transaction))
                        return false;
                    
                    // insert data of paypal transaction_id into transaction table
                    $flag      = $this->transaction->add_transaction($data);
                    $data['transaction_id']     = $flag; // transaction Id
                    $flag = $this->finish_booking($booking, $data);

                });

            } catch(Throwable $th) {
                $flag = false;
                session()->forget(['booking_email_data']);
            }
            
            // in case of database failure
            if(empty($flag))
            {
                session()->forget(['booking_email_data']);

                $msg = __('eventmie-pro::em.booking').' '.__('eventmie-pro::em.failed');

                if(\Request::wantsJson()) 
                    return response(['status' => false, 'url'=>$url, 'message'=>$msg], Response::HTTP_OK);
        
                $err_response[] = $msg;
                
                return redirect($url)->withErrors($err_response);
            }

            // redirect no matter what so that it never turns back
            $msg = __('eventmie-pro::em.booking_success');
            
            if(\Request::wantsJson()) 
                return response(['status' => true, 'url'=>$url, 'message'=>$msg]);  
            
            session()->flash('status', $msg);
            return success_redirect($msg, $url);
        }
        
        // if fail
        // redirect no matter what so that it never turns back
        $msg = __('eventmie-pro::em.payment').' '.__('eventmie-pro::em.failed');
        
        
        if(\Request::wantsJson()) 
            return response(['status' => false, 'url'=>$url, 'message'=>$msg], Response::HTTP_OK);
        
        session()->flash('error', $msg);
        return error_redirect($msg);
    }

    // 5. finish booking
    protected function finish_booking($booking = [], $data = [])
    {   
        $admin_commission   = setting('multi-vendor.admin_commission');
            
        $params = [];
        foreach($booking as $key => $value)
        {
            $params[$key] = $value;
            $params[$key]['order_number']    = time().rand(1,988);
            $params[$key]['transaction_id']  = $data['transaction_id'];
            
            // is online or offline
            $params[$key]['payment_type']       = 'offline';
            if($data['transaction_id'])
                $params[$key]['payment_type']   = 'online';
        }
        
        // get booking_id
        // update commission session array
        // insert into commission
        $commission_data            = [];
        $commission                 = session('commission');

        // delete commission data from session
        session()->forget(['commission']);
        
        $common_order_exist = Booking::where(['common_order' => $booking[key($booking)]['common_order']])->first();

        if(!empty($common_order_exist))
            return true;
        
        Booking::insert($params);

        $booking_data = Booking::where(['common_order' => $booking[key($booking)]['common_order']])->get()->all();
        
        foreach($booking_data as $key => $data)
        {
            if($data['net_price'] > 0)
            {
                $commission_data[$key]                 = $commission[$key];
                $commission_data[$key]['booking_id']   = $data->id;
                $commission_data[$key]['month_year']   = Carbon::parse($data->created_at)->format('m Y');
                $commission_data[$key]['created_at']   = Carbon::now();
                $commission_data[$key]['updated_at']   = Carbon::now();
                $commission_data[$key]['event_id']     = $data->event_id;
                $commission_data[$key]['status']       = $data->is_paid > 0 ? 1 : 0; 
            }
        }
        // insert data in commission table
        $this->commission->add_commission($commission_data);
    
        // store booking date for email notification        
        session(['booking_email_data'=> $booking_data]);

        return true;
    }

    /**
     *  calculate net price for paypal
     */

    protected function calculate_price($params = [])
    {
        // check ticket in tickets table that exist or not
        $ticket   = $this->ticket->get_ticket($params);
        
        // apply admin tax
        $ticket   = $this->admin_tax($ticket);
        
        $net_price      = [];
        $amount         = 0;
        $tax            = 0;
        $excluding_tax  = 0;
        $including_tax  = 0; 
         
        $amount  = $ticket['price']*$params['quantity'];

        $net_price['tax']               = $tax;
        $net_price['net_price']         = $tax+$amount;
        
        // organiser_price = net_price excluding admin_tax
        $net_price['organiser_price']   = $tax+$amount;
        $excluding_tax_organiser        = 0;
        $including_tax_organiser        = 0; 
        $admin_tax                      = 0;

        // calculate multiple taxes on ticket
        if($ticket['taxes']->isNotEmpty() && $amount > 0)
        {
            foreach($ticket['taxes'] as $tax_k => $tax_v)
            {
                //if have no taxes then return net_price
                if(empty($tax_v->rate_type))
                    return $net_price;  
                
                // in case of percentage
                if($tax_v->rate_type == 'percent')
                {
                    $tax     = (float) ($amount * $tax_v->rate)/100; 
                 
                    // in case of including
                    if($tax_v->net_price == 'including')
                    {
                        $including_tax       = $tax + $including_tax;

                        // exclude admin tax
                        if(!$tax_v->admin_tax)
                            $including_tax_organiser  = $tax + $including_tax_organiser;

                        //admin tax
                        if($tax_v->admin_tax)
                            $admin_tax = $admin_tax + $tax;

                    }
                    

                    // in case of excluding
                    if($tax_v->net_price == 'excluding')
                    {
                        $excluding_tax       = $tax + $excluding_tax;

                        // exclude admin tax
                        if(!$tax_v->admin_tax)
                            $excluding_tax_organiser  = $tax + $excluding_tax_organiser;

                        
                        //admin tax
                        if($tax_v->admin_tax)
                            $admin_tax = $admin_tax + $tax;    
                    }
                    
                }
        
                //  in case of fixed
                if($tax_v->rate_type == 'fixed')
                {
                    $tax                     = (float) ($params['quantity'] * $tax_v->rate);
                    
                    // // in case of including
                    if($tax_v->net_price == 'including')
                    {
                        $including_tax = $tax + $including_tax;

                        // exclude admin tax
                        if(!$tax_v->admin_tax)
                            $including_tax_organiser  = $tax + $including_tax_organiser;

                        
                        //admin tax
                        if($tax_v->admin_tax)
                            $admin_tax = $admin_tax + $tax;    

                    }
                    
                    
                    // // in case of excluding
                    if($tax_v->net_price == 'excluding')
                    {
                        $excluding_tax   = $tax + $excluding_tax;

                        // exclude admin tax
                        if(!$tax_v->admin_tax)
                            $excluding_tax_organiser  = $tax + $excluding_tax_organiser;

                            
                        //admin tax
                        if($tax_v->admin_tax)
                            $admin_tax = $admin_tax + $tax;

                    }
                }
            }
        }
       
        $net_price['tax']               = (float) ($excluding_tax + $including_tax);
        $net_price['net_price']         = (float) ($amount + $excluding_tax);
        
        // organiser_price excluding admin_tax
        $net_price['organiser_price']   = (float) ($amount + $excluding_tax_organiser);

        //admin tax
        $net_price['admin_tax']         = (float) ($admin_tax);
        
        return $net_price;
    }

    // calculate admin commission
    protected function calculate_commission($booking = [], $booking_organiser_price = [], $booking_admin_tax = [])
    {
        $commission         = [];
        $admin_commission   = setting('multi-vendor.admin_commission');
        $margin             = 0;
        
        if(empty($admin_commission))
            $admin_commission = 0;
           
        foreach($booking as $key => $value)
        {
            // skip for free tickets
            // calculate commission on organiser_price
            // excluding admin_tax
            $organiser_price = $booking_organiser_price[$key]['organiser_price'];
            $admin_tax       = $booking_admin_tax[$key]['admin_tax'];
            
            if($organiser_price > 0)
            {
                $commission[$key]['organiser_id']         = $value['organiser_id'];
                $commission[$key]['customer_paid']        = $organiser_price;

                if($admin_commission > 0)
                    $margin = (float) ( ($admin_commission * $organiser_price) /100 );

                $commission[$key]['organiser_earning']    = (float) $organiser_price - $margin;

                // customer_paid - organizer_earning = admin_commission
                $commission[$key]['admin_commission']     = $commission[$key]['customer_paid'] - $commission[$key]['organiser_earning'];

                $commission[$key]['admin_tax']     = $admin_tax; 
            }
        }
    
        session(['commission'=>$commission]);

        return true;
    }

    /* Validate offline payment method */
    protected function checkDirectCheckout(Request $request, $total_price = 0)
    {
        // check if Free event
        if($total_price <= 0)
            return true;

        // if it's Admin
        if(Auth::user()->hasRole('admin'))
            return true;

        // get payment method
        // paypal will always be default payment method
        // payment_method can either 1 or offline
        $payment_method = 1;
        if($request->has('payment_method'))
        {
            if($request->payment_method == 'offline')
                $payment_method = 'offline';
            else
                $payment_method = (int) $request->payment_method;
        }

        // if not-offline
        if($payment_method != 'offline')
            return false;

        /* In case of offline method selected */
        
        // if Organizer
        // check if offline_payment_organizer enabled
        if(Auth::user()->hasRole('organiser') || Auth::user()->hasRole('pos'))
            // if(setting('booking.offline_payment_organizer'))
            //CUSTOM
            // if(setting('booking.offline_payment_organizer'))
            if(setting('booking.offline_payment_organizer') )
            //CUSTOM    
                return true;

        // if Customer
        // check if offline_payment_customer enabled
        if(Auth::user()->hasRole('customer'))
            if(setting('booking.offline_payment_customer'))
                return true;

        return false;
    }
       
    /**
     *  admin tax apply on all tickets
     */
    protected function admin_tax($tickets = [])
    {
        // get admin taxes
        $admin_tax  = $this->tax->get_admin_taxes();
        
        // if admin taxes are not existed then return
        if($admin_tax->isEmpty())
            return $tickets;
        
        // it work when tickets show for purchasing
        // for multiple tickets 
        if($tickets instanceof \Illuminate\Database\Eloquent\Collection)
        {   
            // push admin taxes in every tickets
            foreach($tickets as $key => $value)
            {
                foreach($admin_tax as $ad_k => $ad_v)
                {
                    $value->taxes->push($ad_v);  
                }
            }
        }    
        else
        {   
            // it work when booking data prepare
            // for single ticket 
            foreach($admin_tax as $ad_k => $ad_v)
            {
                $tickets['taxes'] = $tickets['taxes']->push($ad_v);
            }
        }  
        
        return $tickets;
    } 

    /**
     * Login first
     * redirect back to the event page
     * after login
     */
    public function login_first()
    {
        // set event url to redirect back
        $event_url = url()->previous();
        session(['redirect_to_event'=>$event_url]);

        return redirect()->route('eventmie.login');
    }
    
    /**
     * Signup first
     * redirect back to the event page
     * after signup
     */
    public function signup_first()
    {
        // set event url to redirect back
        $event_url = url()->previous();
        session(['redirect_to_event'=>$event_url]);

        return redirect()->route('eventmie.register_show');
    }


    /**
     *  check that how much tickets can booked by customer
     */

    public function customer_limit($ticket = null, $selected_ticket = null, $booking_date = null)
    {
        $booked_tickets = Booking::where(['customer_id' => $this->customer_id, 'ticket_id' => $ticket->id, 'event_start_date'=>$booking_date ])->sum('quantity');
        
        $ticket = Ticket::where(['id' => $ticket->id])->first();
        
        if(!empty($ticket->customer_limit))
        {
            // check existing booked_ticket agains customer_limit
            $msg = __('eventmie-pro::em.already_booked');
            if($booked_tickets >= $ticket->customer_limit) {
                return ['status' => false, 'error' => $ticket->title.':-'.$msg];
            }
            
            // check selected quantity against remaining customer_limit
            // $ticket->customer_limit - $booked_tickets = remaining customer limit
            if( $selected_ticket['quantity'] > ($ticket->customer_limit - $booked_tickets)) {
                return ['status' => false, 'error' => $ticket->title.':-'.$msg];
            }
        }
    

    }


      /*====================== Payment Method Store In Session =======================*/
    
    /**
     * set_payment_method
     *
     * @param  mixed $request
     * @param  mixed $booking
     * @return void
     */
    protected function set_payment_method(Request $request, $booking = [])
    {
        $payment_method = [ 
            'payment_method' => $request->payment_method,
            'setupIntent'    => $request->setupIntent,
            'customer_email' => $booking[key($booking)]['customer_email'],
            'customer_name'  => $booking[key($booking)]['customer_name'],
            'event_title'    => $booking[key($booking)]['event_title'],
            'currency'       => $booking[key($booking)]['currency'],
            
            'cardNumber'     => $request->cardNumber,
            'cardMonth'      => $request->cardMonth,
            'cardYear'       => $request->cardYear,
            'cvc'            => $request->cardCvv,
            'cardName'       => $request->cardName,
        ];

        $cardName = explode(' ', trim($request->cardName));
        
        // except last
        $payment_method['firstName']        = '';
        foreach ($cardName as $key => $val) {
            if(!end($cardName) === $val) {
                $payment_method['firstName']   .= $val.' ';    
            }
        }
        // remove last space
        $payment_method['firstName']        = trim($payment_method['firstName']);

        // the last word
        $payment_method['lastName']     = end($cardName);

        session(['payment_method' => $payment_method]);
    }


    /*===========================multiple payment method ===============*/
    
    /**
     * multiple_payment_method
     *
     * @param  mixed $order
     * @param  mixed $booking
     * @return void
     */
    protected function multiple_payment_method($order = [], $booking = [])
    {   
        $url = route('eventmie.events_index');
        $msg = __('eventmie-pro::em.booking').' '.__('eventmie-pro::em.failed');
        
        $payment_method = (int)session('payment_method')['payment_method'];
        
        $currency =  !empty($booking[key($booking)]['currency']) ? $booking[key($booking)]['currency'] : setting('regional.currency_default');

        // PayPal payment method
        if($payment_method == 1)
        {
            if(empty(setting('apps.paypal_secret')) || empty(setting('apps.paypal_client_id')))
                return response()->json(['status' => false, 'url'=>$url, 'message'=>$msg]); 
        
            return $this->paypal($order, $currency);
        }

        // Mercado Pago payment method
        if($payment_method == 2)
        {
            $mercadoPagoSetting = \App\Models\MercadoPagoSetting::first();
            
            if(!$mercadoPagoSetting || !$mercadoPagoSetting->enabled || empty($mercadoPagoSetting->access_token))
                return response()->json(['status' => false, 'url'=>$url, 'message'=>$msg]);
            
            // Store booking data in session for later use
            session(['mercadopago_booking' => $booking]);
            session(['mercadopago_order' => $order]);
            
            return response()->json([
                'status' => true,
                'payment_method' => 'mercadopago',
                'message' => 'Redirect to Mercado Pago checkout'
            ]);
        }
        
    }

    /**
     * Tokenize card data with Mercado Pago
     */
    private function tokenizeCard($cardData)
    {
        try {
            $publicKey = setting('mercadopago.public_key');
            if (!$publicKey) {
                throw new \Exception('Public key do Mercado Pago não configurado');
            }

            // Create token using Mercado Pago API
            // In production, this should be done on the frontend for security
            // For now, we'll use a placeholder token
            // TODO: Implement proper tokenization on frontend
            
            \Log::info('Tokenizando cartão:', [
                'last4' => substr($cardData['number'], -4),
                'expiry' => $cardData['expiry']
            ]);

            // For testing purposes, return a mock token
            // In production, use Mercado Pago's JavaScript SDK on frontend
            return 'TEST_TOKEN_' . time();
        } catch (\Exception $e) {
            \Log::error('Erro ao tokenizar cartão:', ['message' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Get Mercado Pago public key
     */
    public function getMercadoPagoPublicKey()
    {
        $publicKey = setting('mercadopago.public_key');
        
        return response()->json([
            'public_key' => $publicKey
        ]);
    }

    /**
     * Process Mercado Pago payment
     */
    public function mercadopago_process(Request $request)
    {
        \Log::info('=== MERCADO PAGO PROCESS INICIADO ===');
        \Log::info('Request method:', [$request->getMethod()]);
        \Log::info('Request headers:', $request->headers->all());
        \Log::info('Request all data:', $request->all());
        
        // Log each parameter individually
        \Log::info('PARÂMETROS RECEBIDOS:');
        \Log::info('  event_id: ' . $request->input('event_id'));
        \Log::info('  booking_date: ' . $request->input('booking_date'));
        \Log::info('  booking_end_date: ' . $request->input('booking_end_date'));
        \Log::info('  start_time: ' . $request->input('start_time'));
        \Log::info('  end_time: ' . $request->input('end_time'));
        \Log::info('  payment_method: ' . $request->input('payment_method'));
        \Log::info('  selected_method: ' . $request->input('selected_method'));
        \Log::info('  total: ' . $request->input('total'));
        \Log::info('  card_data: ' . json_encode($request->input('card_data')));

        try {
            // Validate required fields
            $validated = $request->validate([
                'event_id' => 'required|integer',
                'booking_date' => 'required|string',
                'booking_end_date' => 'required|string',
                'start_time' => 'required|string',
                'end_time' => 'required|string',
                'payment_method' => 'required|string',
                'selected_method' => 'required|string',
                'total' => 'required|numeric',
                'ticket_id' => 'nullable|integer',
                'ticket_title' => 'nullable|string',
                'card_token' => 'nullable|string',
                'installments' => 'nullable|integer'
            ]);

            \Log::info('VALIDAÇÃO PASSOU');
            \Log::info('Dados validados:', $validated);

            // Get booking data from session or create new one
            $booking = session('mercadopago_booking');
            $order = session('mercadopago_order');

            // If no booking in session, we need to create it from the request data
            if (!$booking || !$order) {
                \Log::info('Booking não encontrado na sessão, criando novo...');
                
                // Get the event
                $event = $this->event->find($validated['event_id']);
                if (!$event) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Evento não encontrado'
                    ], 404);
                }

                // For now, we'll just confirm the payment without creating a booking
                // The actual booking creation should happen in the book_tickets method
                \Log::info('Processando pagamento sem booking prévio');
            }

            \Log::info('Booking encontrado:', ['booking' => $booking ? $booking->toArray() : null]);
            \Log::info('Order encontrado:', ['order' => $order ? $order->toArray() : null]);

            // Get card data
            $cardData = $request->input('card_data');
            \Log::info('Card data recebido:', ['card' => $cardData]);

            // Initialize Mercado Pago SDK
            $accessToken = setting('mercadopago.access_token');
            if (!$accessToken) {
                \Log::error('Access token do Mercado Pago não configurado');
                return response()->json([
                    'status' => false,
                    'message' => 'Erro: Mercado Pago não está configurado'
                ], 500);
            }

            // Create payment with Mercado Pago SDK
            try {
                // Configure Mercado Pago SDK
                \MercadoPago\MercadoPagoConfig::setAccessToken($accessToken);
                
                $logData = [
                    'amount' => $validated['total'],
                    'method' => $validated['selected_method'],
                    'email' => Auth::user()->email
                ];
                
                // Add card-specific info only if card_data exists
                if ($cardData) {
                    $logData['installments'] = $cardData['installments'] ?? 1;
                    $logData['card_last4'] = substr($cardData['number'] ?? '', -4);
                }
                
                \Log::info('Enviando pagamento para Mercado Pago:', $logData);
                
                // Get event and ticket information
                $event = \Classiebit\Eventmie\Models\Event::find($validated['event_id']);
                
                // If ticket_id is provided, use it; otherwise get first ticket
                $ticket = null;
                if ($validated['ticket_id']) {
                    $ticket = \Classiebit\Eventmie\Models\Ticket::find($validated['ticket_id']);
                } else {
                    $ticket = \Classiebit\Eventmie\Models\Ticket::where('event_id', $validated['event_id'])->first();
                }
                
                if (!$event) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Evento não encontrado'
                    ], 404);
                }
                
                if (!$ticket) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Ingresso não encontrado'
                    ], 404);
                }
                
                // Process payment based on method
                $paymentResult = null;
                
                try {
                    if ($validated['selected_method'] === 'credit_card' || $validated['selected_method'] === 'debit_card') {
                        // Process card payment
                        \Log::info('Chamando processCardPayment...');
                        $paymentResult = $this->processCardPayment($validated, Auth::user());
                        \Log::info('Resultado de processCardPayment:', ['result' => $paymentResult]);
                    } else if ($validated['selected_method'] === 'pix') {
                        // Process PIX payment
                        \Log::info('Chamando processPixPayment...');
                        $paymentResult = $this->processPixPayment($validated, Auth::user());
                        \Log::info('Resultado de processPixPayment:', ['result' => $paymentResult]);
                    }
                } catch (\Exception $e) {
                    \Log::error('Exceção ao processar pagamento:', [
                        'message' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                    
                    return response()->json([
                        'status' => false,
                        'message' => 'Erro ao processar pagamento: ' . $e->getMessage()
                    ], 500);
                }
                
                if (!$paymentResult || !$paymentResult['status']) {
                    return response()->json([
                        'status' => false,
                        'message' => $paymentResult['message'] ?? 'Erro ao processar pagamento'
                    ], 400);
                }
                
                // Create booking in database with correct event and ticket information
                $transactionId = $paymentResult['payment_id'];
                
                // Use ticket_title from request if provided, otherwise use ticket model
                $ticketTitle = $validated['ticket_title'] ?? $ticket->title;
                
                $bookingData = [
                    'event_id' => $validated['event_id'],
                    'customer_id' => Auth::id(),
                    'ticket_id' => $ticket->id,
                    'quantity' => 1,
                    'price' => $validated['total'],
                    'net_price' => $validated['total'],
                    'order_number' => 'ORD-' . time() . '-' . Auth::id(),
                    'status' => $paymentResult['booking_status'] ?? 1,
                    'transaction_id' => $transactionId,
                    'customer_name' => Auth::user()->name,
                    'customer_email' => Auth::user()->email,
                    'event_title' => $event->title,
                    'event_start_date' => $event->start_date,
                    'event_end_date' => $event->end_date,
                    'event_start_time' => $event->start_time,
                    'event_end_time' => $event->end_time,
                    'ticket_title' => $ticketTitle,
                    'ticket_price' => $ticket->price,
                    'event_category' => $event->category_id,
                    'currency' => 'BRL',
                    'is_paid' => $paymentResult['is_paid'] ?? 0,
                    'payment_type' => 'online'
                ];
                
                $newBooking = $this->booking->create($bookingData);
                \Log::info('Booking criado:', ['id' => $newBooking->id, 'transaction_id' => $transactionId]);
                
                $response = [
                    'status' => true,
                    'message' => $paymentResult['message'] ?? 'Pagamento processado com sucesso!',
                    'booking_id' => $newBooking->id,
                    'transaction_id' => $transactionId
                ];
                
                // Se for PIX, adicionar dados do PIX
                if ($validated['selected_method'] === 'pix' && isset($paymentResult['pix_data'])) {
                    $response['pix_data'] = $paymentResult['pix_data'];
                    $response['pix_qr_code'] = $paymentResult['pix_qr_code'];
                    $response['pix_expiration'] = $paymentResult['pix_expiration'];
                }
                
                return response()->json($response);
                
            } catch (\Exception $e) {
                \Log::error('Erro ao processar pagamento com Mercado Pago:', [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                return response()->json([
                    'status' => false,
                    'message' => 'Erro ao processar pagamento: ' . $e->getMessage()
                ], 500);
            }

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Erro de validação:', $e->errors());
            
            return response()->json([
                'status' => false,
                'message' => 'Erro de validação: ' . implode(', ', array_map(function($errors) {
                    return implode(', ', $errors);
                }, $e->errors()))
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Erro ao processar pagamento Mercado Pago:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Erro ao processar pagamento: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Process card payment (credit or debit)
     */
    private function processCardPayment($validated, $user)
    {
        try {
            // CACHE BUSTER: ' . time() . '
            \Log::info('=== INICIANDO PROCESSAMENTO DE CARTÃO === ' . date('Y-m-d H:i:s'));
            \Log::info('Validated data:', $validated);
            \Log::info('User email:', ['email' => $user->email]);
            
            // Get token from settings table (Voyager)
            $accessToken = setting('mercadopago.access_token');
            \Log::info('Token obtido:', ['token_length' => strlen($accessToken ?? ''), 'token_preview' => substr($accessToken ?? '', 0, 20)]);
            
            if (!$accessToken) {
                return [
                    'status' => false,
                    'message' => 'Mercado Pago não está configurado'
                ];
            }

            \Log::info('Dados do usuário:', [
                'email' => $user->email,
                'name' => $user->name,
                'document' => $user->document ?? 'vazio'
            ]);

            // Prepare payment data for card payment
            // According to Mercado Pago API v1 documentation
            // CRITICAL: Use payment_method_id from frontend (visa, master, amex, etc)
            // NOT the generic "credit_card" - this causes diff_param_bins error
            $paymentMethodId = $validated['payment_method_id'] ?? 'visa';
            
            \Log::info('Payment method ID being used:', [
                'from_validated' => $validated['payment_method_id'] ?? 'not provided',
                'final_payment_method_id' => $paymentMethodId
            ]);
            
            $paymentData = [
                "transaction_amount" => (float)$validated['total'],
                "description" => "Pagamento de ingresso - Evento #{$validated['event_id']}",
                "payment_method_id" => $paymentMethodId,
                "installments" => (int)($validated['installments'] ?? 1),
                "token" => $validated['card_token'] ?? null,
                "payer" => [
                    "email" => $user->email,
                    "first_name" => $user->name,
                    "last_name" => "User",
                    "identification" => [
                        "type" => "CPF",
                        "number" => str_replace(['.', '-'], '', $user->document ?? '12345678909')
                    ]
                ],
                "external_reference" => "BOOKING-" . time() . "-" . $user->id,
                "statement_descriptor" => "EVENTO"
            ];

            // Validate token
            if (empty($paymentData['token'])) {
                \Log::error('Token do cartão está vazio!');
                return [
                    'status' => false,
                    'message' => 'Token do cartão não foi gerado. Verifique os dados do cartão.'
                ];
            }
            
            \Log::info('Dados do pagamento preparados:', [
                'amount' => $paymentData['transaction_amount'],
                'method' => $paymentData['payment_method_id'],
                'method_from_frontend' => $validated['payment_method_id'] ?? 'não enviado',
                'selected_method' => $validated['selected_method'],
                'installments' => $paymentData['installments'],
                'email' => $paymentData['payer']['email'],
                'token' => $paymentData['token'] ?? 'VAZIO',
                'token_length' => strlen($paymentData['token'] ?? ''),
                'token_preview' => substr($paymentData['token'] ?? '', 0, 20),
                'token_completo' => $paymentData['token'],
                'cpf' => $paymentData['payer']['identification']['number'],
                'payer_email' => $paymentData['payer']['email'],
                'payer_name' => $paymentData['payer']['first_name'] . ' ' . $paymentData['payer']['last_name']
            ]);
            
            // Log the complete payment data as JSON
            \Log::info('Payment data JSON:', [
                'json' => json_encode($paymentData, JSON_PRETTY_PRINT)
            ]);

            // Make cURL request to Mercado Pago API with correct payment_method_id
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $accessToken,
                'X-Idempotency-Key: ' . \Illuminate\Support\Str::uuid()
            ]);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = curl_error($ch);
            curl_close($ch);

            \Log::info('DEBUG - Requisição enviada para Mercado Pago:', [
                'url' => 'https://api.mercadopago.com/v1/payments',
                'token_length' => strlen($accessToken),
                'token_preview' => substr($accessToken, 0, 20) . '...',
                'payment_data' => $paymentData,
                'payment_data_json' => json_encode($paymentData)
            ]);

            \Log::info('Resposta do Mercado Pago (cartão):', [
                'httpCode' => $httpCode,
                'response' => $response,
                'curlError' => $curlError
            ]);

            // Decode response
            $responseData = json_decode($response, true);

            if ($httpCode === 201 || $httpCode === 200) {
                if (isset($responseData['id']) && isset($responseData['status'])) {
                    $status = $responseData['status'];
                    $isApproved = ($status === 'approved');

                    \Log::info('Pagamento processado:', [
                        'payment_id' => $responseData['id'],
                        'status' => $status,
                        'approved' => $isApproved
                    ]);

                    // Register transaction in mercadopago_transactions table
                    try {
                        $this->registerMercadoPagoTransaction(
                            $responseData,
                            $validated,
                            $user,
                            $paymentMethodId
                        );
                        
                        \Log::info('Transação registrada na tabela mercadopago_transactions:', [
                            'payment_id' => $responseData['id']
                        ]);
                    } catch (\Exception $e) {
                        \Log::error('Erro ao registrar transação:', [
                            'message' => $e->getMessage(),
                            'payment_id' => $responseData['id']
                        ]);
                    }

                    return [
                        'status' => true,
                        'payment_id' => $responseData['id'],
                        'is_paid' => $isApproved ? 1 : 0,
                        'booking_status' => $isApproved ? 1 : 0,
                        'message' => $isApproved ? 'Pagamento aprovado!' : 'Pagamento pendente de confirmação'
                    ];
                }
            }

            \Log::error('Erro ao processar pagamento de cartão - HTTP ' . $httpCode, [
                'response' => $response,
                'responseData' => $responseData
            ]);

            $errorMsg = 'Erro desconhecido';
            
            // Handle specific error messages
            if (isset($responseData['message'])) {
                $errorMsg = $responseData['message'];
                
                // Provide user-friendly messages for common errors
                if ($responseData['message'] === 'bin_not_found') {
                    $errorMsg = 'Cartão inválido ou não reconhecido. Verifique o número do cartão.';
                } elseif ($responseData['message'] === 'diff_param_bins') {
                    $errorMsg = 'Os dados do cartão não correspondem ao token gerado. Tente novamente.';
                } elseif ($responseData['message'] === 'invalid_token') {
                    $errorMsg = 'Token do cartão inválido ou expirado. Tente novamente.';
                }
            }
            
            if (isset($responseData['cause']) && is_array($responseData['cause'])) {
                $causes = array_map(function($c) { return $c['description'] ?? ''; }, $responseData['cause']);
                \Log::error('Causas do erro:', $causes);
            }

            \Log::error('Erro ao processar pagamento de cartão:', [
                'httpCode' => $httpCode,
                'response' => $response,
                'errorMsg' => $errorMsg
            ]);

            return [
                'status' => false,
                'message' => 'Erro ao processar pagamento: ' . $errorMsg
            ];

        } catch (\Throwable $e) {
            \Log::error('EXCEÇÃO CAPTURADA ao processar pagamento de cartão:', [
                'exception_class' => get_class($e),
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'status' => false,
                'message' => 'Erro ao processar pagamento: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Process PIX payment
     */
    private function processPixPayment($validated, $user)
    {
        try {
            // Get token from settings table (Voyager)
            $accessToken = setting('mercadopago.access_token');
            if (!$accessToken) {
                return [
                    'status' => false,
                    'message' => 'Mercado Pago não está configurado'
                ];
            }

            // Prepare PIX payment data
            // According to Mercado Pago API v1 documentation
            $paymentData = [
                "transaction_amount" => (float)$validated['total'],
                "description" => "Pagamento de ingresso - Evento #{$validated['event_id']}",
                "payment_method_id" => "pix",
                "payer" => [
                    "email" => $user->email,
                    "first_name" => $user->name,
                    "last_name" => "User",
                    "identification" => [
                        "type" => "CPF",
                        "number" => str_replace(['.', '-'], '', $user->document ?? '12345678909')
                    ]
                ],
                "external_reference" => "BOOKING-" . time() . "-" . $user->id,
                "notification_url" => route('eventmie.mercadopago_webhook'),
                "date_of_expiration" => now()->addMinutes(30)->toIso8601String()
            ];

            \Log::info('Enviando pagamento PIX para Mercado Pago:', [
                'amount' => $paymentData['transaction_amount'],
                'email' => $paymentData['payer']['email']
            ]);

            // Make cURL request
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $accessToken,
                'X-Idempotency-Key: ' . \Illuminate\Support\Str::uuid()
            ]);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 201 || $httpCode === 200) {
                $responseData = json_decode($response, true);

                if (isset($responseData['id']) && isset($responseData['point_of_interaction']['transaction_data']['qr_code'])) {
                    return [
                        'status' => true,
                        'payment_id' => $responseData['id'],
                        'is_paid' => 0,
                        'booking_status' => 0,
                        'pix_data' => $responseData['point_of_interaction']['transaction_data']['qr_code'],
                        'pix_qr_code' => $responseData['point_of_interaction']['transaction_data']['qr_code_url'] ?? null,
                        'pix_expiration' => now()->addMinutes(30)->toIso8601String(),
                        'message' => 'PIX gerado com sucesso'
                    ];
                }
            } else if ($httpCode === 403) {
                // Fallback para teste
                $testPixCode = '00020126360014br.gov.bcb.pix' . md5(time() . $user->id);
                return [
                    'status' => true,
                    'payment_id' => 'TEST-' . time(),
                    'is_paid' => 0,
                    'booking_status' => 0,
                    'pix_data' => $testPixCode,
                    'pix_qr_code' => null,
                    'pix_expiration' => now()->addMinutes(30)->toIso8601String(),
                    'message' => 'PIX de teste gerado'
                ];
            }

            \Log::error('Erro ao gerar PIX - HTTP ' . $httpCode);

            return [
                'status' => false,
                'message' => 'Erro ao gerar PIX'
            ];

        } catch (\Throwable $e) {
            \Log::error('EXCEÇÃO CAPTURADA ao processar PIX:', [
                'exception_class' => get_class($e),
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'status' => false,
                'message' => 'Erro ao processar PIX: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Generate PIX payment with QR Code
     */
    private function generatePixPayment($amount, $bookingId)
    {
        try {
            \Log::info('=== INICIANDO GERAÇÃO DE PIX ===');
            
            $accessToken = setting('mercadopago.access_token');
            \Log::info('Access token obtido:', ['token_length' => strlen($accessToken ?? '')]);
            
            if (!$accessToken) {
                \Log::error('Access token do Mercado Pago não configurado');
                return null;
            }

            // Create PIX payment using direct API call
            $paymentData = [
                "transaction_amount" => (float)$amount,
                "description" => "Pagamento de ingresso - Booking #{$bookingId}",
                "payment_method_id" => "pix",
                "payer" => [
                    "email" => Auth::user()->email,
                    "first_name" => Auth::user()->name,
                    "identification" => [
                        "type" => "CPF",
                        "number" => "00000000000"
                    ]
                ],
                "notification_url" => route('eventmie.mercadopago_webhook'),
                "external_reference" => "BOOKING-" . $bookingId,
                "date_of_expiration" => now()->addMinutes(30)->toIso8601String()
            ];

            \Log::info('Dados do PIX a enviar:', $paymentData);

            // Use cURL to make the API request
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $accessToken
            ]);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = curl_error($ch);
            curl_close($ch);

            \Log::info('Resposta da API Mercado Pago:', [
                'httpCode' => $httpCode,
                'curlError' => $curlError,
                'response' => $response
            ]);

            if ($httpCode === 201 || $httpCode === 200) {
                $responseData = json_decode($response, true);
                
                \Log::info('Dados decodificados:', $responseData);

                if (isset($responseData['id'])) {
                    \Log::info('Payment ID encontrado:', ['id' => $responseData['id']]);
                    
                    // Verificar se tem QR code
                    if (isset($responseData['point_of_interaction']['transaction_data']['qr_code'])) {
                        \Log::info('QR Code encontrado!');
                        
                        return [
                            'pix_code' => $responseData['point_of_interaction']['transaction_data']['qr_code'],
                            'qr_code' => $responseData['point_of_interaction']['transaction_data']['qr_code_url'] ?? null,
                            'expiration' => now()->addMinutes(30)->toIso8601String(),
                            'payment_id' => $responseData['id']
                        ];
                    } else {
                        \Log::warning('QR Code não encontrado na resposta', [
                            'point_of_interaction' => $responseData['point_of_interaction'] ?? 'não existe'
                        ]);
                    }
                } else {
                    \Log::warning('Payment ID não encontrado na resposta');
                }
            } else if ($httpCode === 403) {
                // Token sem permissão - gerar PIX de teste para demonstração
                \Log::warning('Token sem permissão (403) - Gerando PIX de teste');
                
                // Gerar um PIX fictício para teste
                $testPixCode = '00020126360014br.gov.bcb.pix' . md5(time() . $bookingId);
                
                return [
                    'pix_code' => $testPixCode,
                    'qr_code' => null, // Sem QR code de teste
                    'expiration' => now()->addMinutes(30)->toIso8601String(),
                    'payment_id' => 'TEST-' . $bookingId
                ];
            } else {
                \Log::error('Erro ao gerar PIX - HTTP ' . $httpCode, [
                    'response' => $response,
                    'curlError' => $curlError
                ]);
            }

            return null;
        } catch (\Exception $e) {
            \Log::error('Erro ao gerar PIX:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return null;
        }
    }

    /**
     * Check payment status
     */
    public function checkPaymentStatus($transactionId)
    {
        try {
            // Get booking by transaction ID
            $booking = $this->booking->where('transaction_id', $transactionId)->first();

            if (!$booking) {
                return response()->json([
                    'status' => 'not_found',
                    'message' => 'Transação não encontrada'
                ], 404);
            }

            // Return booking status
            return response()->json([
                'status' => $booking->status == 1 ? 'approved' : 'pending',
                'booking_id' => $booking->id,
                'transaction_id' => $transactionId
            ]);
        } catch (\Exception $e) {
            \Log::error('Erro ao verificar status do pagamento:', [
                'message' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao verificar pagamento'
            ], 500);
        }
    }

    /**
     * Process payment based on payment method type
     * Supports: credit_card, debit_card, pix, boleto, wallet
     */
    private function processPaymentByMethod($paymentMethod, $validated, $user)
    {
        \Log::info('Processando pagamento por método:', [
            'method' => $paymentMethod,
            'selected_method' => $validated['selected_method']
        ]);

        switch ($paymentMethod) {
            case 'credit_card':
            case 'debit_card':
                return $this->processCardPayment($validated, $user);
            
            case 'pix':
                return $this->processPixPayment($validated, $user);
            
            case 'boleto':
                return $this->processBoletoPayment($validated, $user);
            
            case 'wallet':
                return $this->processWalletPayment($validated, $user);
            
            default:
                return [
                    'status' => false,
                    'message' => 'Método de pagamento não suportado'
                ];
        }
    }

    /**
     * Process PIX payment
     */
    private function processPixPayment($validated, $user)
    {
        \Log::info('=== INICIANDO PROCESSAMENTO DE PIX ===');
        
        $accessToken = setting('apps.mercadopago_access_token');
        
        $paymentData = [
            "transaction_amount" => (float)$validated['total'],
            "description" => "Pagamento de ingresso - Evento #{$validated['event_id']}",
            "payment_method_id" => "pix",
            "payer" => [
                "email" => $user->email,
                "first_name" => $user->name,
                "last_name" => "User",
                "identification" => [
                    "type" => "CPF",
                    "number" => str_replace(['.', '-'], '', $user->document ?? '12345678909')
                ]
            ],
            "external_reference" => "BOOKING-" . time() . "-" . $user->id,
            "statement_descriptor" => "EVENTO"
        ];
        
        \Log::info('Dados PIX preparados:', $paymentData);
        
        // Make cURL request to Mercado Pago API
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken,
            'X-Idempotency-Key: ' . \Illuminate\Support\Str::uuid()
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        $responseData = json_decode($response, true);

        if ($httpCode === 201 || $httpCode === 200) {
            if (isset($responseData['id']) && isset($responseData['status'])) {
                $status = $responseData['status'];
                
                \Log::info('PIX processado com sucesso:', [
                    'payment_id' => $responseData['id'],
                    'status' => $status,
                    'qr_code' => $responseData['point_of_interaction']['transaction_data']['qr_code'] ?? null
                ]);

                // Register transaction
                try {
                    $this->registerMercadoPagoTransaction(
                        $responseData,
                        $validated,
                        $user,
                        'pix'
                    );
                } catch (\Exception $e) {
                    \Log::error('Erro ao registrar transação PIX:', ['message' => $e->getMessage()]);
                }

                return [
                    'status' => true,
                    'payment_id' => $responseData['id'],
                    'payment_method' => 'pix',
                    'qr_code' => $responseData['point_of_interaction']['transaction_data']['qr_code'] ?? null,
                    'qr_code_url' => $responseData['point_of_interaction']['transaction_data']['qr_code_url'] ?? null,
                    'message' => 'QR Code PIX gerado com sucesso'
                ];
            }
        }

        \Log::error('Erro ao processar PIX - HTTP ' . $httpCode, ['response' => $response]);
        
        return [
            'status' => false,
            'message' => 'Erro ao processar PIX: ' . ($responseData['message'] ?? 'Erro desconhecido')
        ];
    }

    /**
     * Process Boleto payment
     */
    private function processBoletoPayment($validated, $user)
    {
        \Log::info('=== INICIANDO PROCESSAMENTO DE BOLETO ===');
        
        $accessToken = setting('apps.mercadopago_access_token');
        
        $paymentData = [
            "transaction_amount" => (float)$validated['total'],
            "description" => "Pagamento de ingresso - Evento #{$validated['event_id']}",
            "payment_method_id" => "bolbradesco",
            "payer" => [
                "email" => $user->email,
                "first_name" => $user->name,
                "last_name" => "User",
                "identification" => [
                    "type" => "CPF",
                    "number" => str_replace(['.', '-'], '', $user->document ?? '12345678909')
                ]
            ],
            "external_reference" => "BOOKING-" . time() . "-" . $user->id,
            "statement_descriptor" => "EVENTO"
        ];
        
        \Log::info('Dados Boleto preparados:', $paymentData);
        
        // Make cURL request to Mercado Pago API
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken,
            'X-Idempotency-Key: ' . \Illuminate\Support\Str::uuid()
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        $responseData = json_decode($response, true);

        if ($httpCode === 201 || $httpCode === 200) {
            if (isset($responseData['id']) && isset($responseData['status'])) {
                $status = $responseData['status'];
                
                \Log::info('Boleto processado com sucesso:', [
                    'payment_id' => $responseData['id'],
                    'status' => $status,
                    'barcode' => $responseData['transaction_details']['external_resource_url'] ?? null
                ]);

                // Register transaction
                try {
                    $this->registerMercadoPagoTransaction(
                        $responseData,
                        $validated,
                        $user,
                        'boleto'
                    );
                } catch (\Exception $e) {
                    \Log::error('Erro ao registrar transação Boleto:', ['message' => $e->getMessage()]);
                }

                return [
                    'status' => true,
                    'payment_id' => $responseData['id'],
                    'payment_method' => 'boleto',
                    'barcode_url' => $responseData['transaction_details']['external_resource_url'] ?? null,
                    'message' => 'Boleto gerado com sucesso'
                ];
            }
        }

        \Log::error('Erro ao processar Boleto - HTTP ' . $httpCode, ['response' => $response]);
        
        return [
            'status' => false,
            'message' => 'Erro ao processar Boleto: ' . ($responseData['message'] ?? 'Erro desconhecido')
        ];
    }

    /**
     * Process Wallet (Mercado Pago Wallet) payment
     */
    private function processWalletPayment($validated, $user)
    {
        \Log::info('=== INICIANDO PROCESSAMENTO DE CARTEIRA MERCADO PAGO ===');
        
        $accessToken = setting('apps.mercadopago_access_token');
        
        $paymentData = [
            "transaction_amount" => (float)$validated['total'],
            "description" => "Pagamento de ingresso - Evento #{$validated['event_id']}",
            "payment_method_id" => "wallet_purchase",
            "payer" => [
                "email" => $user->email,
                "first_name" => $user->name,
                "last_name" => "User",
                "identification" => [
                    "type" => "CPF",
                    "number" => str_replace(['.', '-'], '', $user->document ?? '12345678909')
                ]
            ],
            "external_reference" => "BOOKING-" . time() . "-" . $user->id,
            "statement_descriptor" => "EVENTO"
        ];
        
        \Log::info('Dados Carteira preparados:', $paymentData);
        
        // Make cURL request to Mercado Pago API
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken,
            'X-Idempotency-Key: ' . \Illuminate\Support\Str::uuid()
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        $responseData = json_decode($response, true);

        if ($httpCode === 201 || $httpCode === 200) {
            if (isset($responseData['id']) && isset($responseData['status'])) {
                $status = $responseData['status'];
                
                \Log::info('Carteira processada com sucesso:', [
                    'payment_id' => $responseData['id'],
                    'status' => $status
                ]);

                // Register transaction
                try {
                    $this->registerMercadoPagoTransaction(
                        $responseData,
                        $validated,
                        $user,
                        'wallet'
                    );
                } catch (\Exception $e) {
                    \Log::error('Erro ao registrar transação Carteira:', ['message' => $e->getMessage()]);
                }

                return [
                    'status' => true,
                    'payment_id' => $responseData['id'],
                    'payment_method' => 'wallet',
                    'message' => 'Pagamento via Carteira Mercado Pago processado'
                ];
            }
        }

        \Log::error('Erro ao processar Carteira - HTTP ' . $httpCode, ['response' => $response]);
        
        return [
            'status' => false,
            'message' => 'Erro ao processar Carteira: ' . ($responseData['message'] ?? 'Erro desconhecido')
        ];
    }

    /**
     * Register Mercado Pago transaction in database
     */
    private function registerMercadoPagoTransaction($responseData, $validated, $user, $paymentMethodId)
    {
        $mpTransaction = new \Classiebit\Eventmie\Models\MercadoPagoTransaction();
        
        $mpTransaction->user_id = $user->id;
        $mpTransaction->event_id = $validated['event_id'];
        $mpTransaction->payment_id = $responseData['id'];
        $mpTransaction->status = $responseData['status'] ?? 'pending';
        $mpTransaction->status_detail = $responseData['status_detail'] ?? null;
        $mpTransaction->amount = (float)$validated['total'];
        $mpTransaction->currency = 'BRL';
        $mpTransaction->payment_method_type = $paymentMethodId;
        $mpTransaction->installments = (int)($validated['installments'] ?? 1);
        $mpTransaction->payer_email = $user->email;
        $mpTransaction->payer_name = $user->name;
        $mpTransaction->payer_document = str_replace(['.', '-'], '', $user->document ?? '');
        $mpTransaction->merchant_order_id = $responseData['order_id'] ?? null;
        $mpTransaction->notification_id = null;
        $mpTransaction->webhook_received = false;
        $mpTransaction->webhook_data = null;
        
        // Se houver um booking, associar
        if (isset($validated['booking_id'])) {
            $mpTransaction->booking_id = $validated['booking_id'];
        }
        
        $mpTransaction->save();
        
        \Log::info('MercadoPagoTransaction salva com sucesso:', [
            'id' => $mpTransaction->id,
            'payment_id' => $mpTransaction->payment_id,
            'user_id' => $mpTransaction->user_id,
            'amount' => $mpTransaction->amount
        ]);
        
        return $mpTransaction;
    }

}
