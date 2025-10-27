<?php

namespace Classiebit\Eventmie\Http\Controllers;

use Facades\Classiebit\Eventmie\Eventmie;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Auth;
use Classiebit\Eventmie\Models\Event;
use Classiebit\Eventmie\Models\Ticket;
use Classiebit\Eventmie\Models\Booking;
use Classiebit\Eventmie\Models\Transaction;
use Classiebit\Eventmie\Models\Commission;
use Classiebit\Eventmie\Models\User;
use Classiebit\Eventmie\Notifications\MailNotification;

use Classiebit\Eventmie\Models\ScannerModel;
use App\Http\Controllers\Controller;


class ScannerController extends Controller
{
       /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // language change
        $this->middleware(['common', 'scanner']);

        $this->event        = new Event;
        $this->ticket       = new Ticket;
        $this->booking      = new Booking;
        $this->transaction  = new Transaction;
        $this->commission   = new Commission;

        $this->scanner      = new ScannerModel;
    }
    
    /**
     * Show my booking
     *
     * @return array
     */
    public function index()
    {
        // get prifex from eventmie config
        $path = false;
        if(!empty(config('eventmie.route.prefix')))
            $path = config('eventmie.route.prefix');
        
        // if have booking email data then send booking notification
        $is_success = !empty(session('booking_email_data')) ? 1 : 0;  
        
        
        $path = !empty($path) ? $path.'/dashboard/scanner-bookings/index' : '/dashboard/scanner-bookings/index';
        
        $extra  = [];

        return view('eventmie::bookings.organiser_bookings', compact('path', 'is_success', 'extra'));
        // show organiser_bookings for scanner organizer
        

    }
    
    
    // get organizer's booking for scanner organizer 
    public function bookings(Request $request)
    {
        // $organiser_id = Auth::user()->organizer_id;
        
        $params     = [
            // 'organiser_id'  => $organiser_id,
            'start_date'    => !empty($request->start_date) ? $request->start_date : null,
            'end_date'      => !empty($request->end_date) ? $request->end_date : null,
            'event_id'      => (int)$request->event_id,
            'order_number'    => (int)$request->order_number,
            // 'scanner_id'      => Auth::id(),
            'organiser_id'    => Auth::user()->organizer_id,
            
        ];

        // in case of today and tomorrow and weekand
        if($request->start_date == $request->end_date)
            $params['end_date']     = null;
    
        $scanner_organizer_id = Auth::id();   

        // get related event's ids for scanner organizer 
        $event_ids   = $this->scanner->get_scanner_event_ids($scanner_organizer_id);
        
        $params['event_ids'] = $event_ids;

        

        $bookings    = $this->scanner->get_bookings($params);

        
        return response([
            'bookings'  => $bookings->jsonSerialize(),
            'currency'  => setting('regional.currency_default'),
        ], Response::HTTP_OK);
    }

    // booking edit for customer by scanner organizer
    public function edit_bookings(Request $request)
    {
        $request->validate([
            'event_id'           => 'required|numeric',
            'ticket_id'          => 'required|numeric',
            'booking_id'         => 'required|numeric',
            'customer_id'        => 'required|numeric',
            'booking_cancel'     => 'required|numeric',
            'status'             => 'numeric|nullable',
            'is_paid'            => 'numeric|nullable',
        ]);

        $params = [
            'event_id'         => $request->event_id,
            'ticket_id'        => $request->ticket_id,
            'id'               => $request->booking_id,
            // 'organiser_id'     => Auth::user()->organizer_id,
            'customer_id'      => $request->customer_id,
        ];

        // check booking id in booking table for scanner organiser
        $check_booking     = (array) $this->scanner->check_booking($params);

        if(empty($check_booking))
            return error(__('eventmie-pro::em.booking').' '.__('eventmie-pro::em.not_found'), Response::HTTP_BAD_REQUEST );
        
        $start_date              = Carbon::parse($check_booking['event_end_date'].' '.$check_booking['event_end_time']);
        $end_date                = Carbon::parse(Carbon::now());
        
        // check date expired or not
        if($end_date > $start_date)
            return error(__('eventmie-pro::em.booking_cancellation_fail'), Response::HTTP_BAD_REQUEST );

        // pre booking time cancellation check    
        $pre_cancellation_time   = (float) setting('booking.pre_cancellation_time'); 
        $min                     = number_format((float)($start_date->diffInMinutes($end_date) ), 2, '.', '');
        $hour_difference         = (float)sprintf("%d.%02d", floor($min/60), $min%60);
        
        if($pre_cancellation_time > $hour_difference)
            return error(__('eventmie-pro::em.booking_cancellation_fail'), Response::HTTP_BAD_REQUEST );

        $params = [
            'event_id'         => $request->event_id,
            'ticket_id'        => $request->ticket_id,
            'id'               => $request->booking_id,
            // 'organiser_id'     => Auth::user()->organizer_id,
            'customer_id'      => $request->customer_id,
        ];

        $data = [
            'booking_cancel'   => $request->booking_cancel,
            'status'           => $request->status ? $request->status : 0 ,
            
            // is_paid
            'is_paid'          =>  $request->is_paid,
        ];
        // booking edit
        $booking_edit    = $this->scanner->edit_booking($data, $params);
        if(empty($booking_edit))
            return error(__('eventmie-pro::em.booking_cancellation_fail'), Response::HTTP_BAD_REQUEST );


        $params = [
            'booking_id'       => $request->booking_id,
            // 'organiser_id'     => Auth::user()->organizer_id,
            'status'           => $request->status ? $request->status : 0,
        ];
       
        // edit commision table status when change booking table status change by scanner organiser 
        $edit_commission  = $this->commission->edit_commission($params);    

        if(empty($edit_commission))
            return error(__('eventmie-pro::em.commission').' '.__('eventmie-pro::em.not_found'), Response::HTTP_BAD_REQUEST );
        
        // ====================== Notification ====================== 
        //send notification after bookings
        $msg[]                  = __('eventmie-pro::em.customer').' - '.$check_booking['customer_name'];
        $msg[]                  = __('eventmie-pro::em.email').' - '.$check_booking['customer_email'];
        $msg[]                  = __('eventmie-pro::em.event').' - '.$check_booking['event_title'];
        $msg[]                  = __('eventmie-pro::em.category').' - '.$check_booking['event_category'];
        $msg[]                  = __('eventmie-pro::em.ticket').' - '.$check_booking['ticket_title'];
        $msg[]                  = __('eventmie-pro::em.price').' - '.$check_booking['ticket_price'];
        $msg[]                  = __('eventmie-pro::em.order').' - #'.$check_booking['order_number'];
        $msg[]                  = __('eventmie-pro::em.status').' - '.($check_booking['status'] ? __('eventmie-pro::em.enabled') : __('eventmie-pro::em.disabled'));
        $msg[]                  = __('eventmie-pro::em.payment').' - '.($check_booking['is_paid'] ? __('eventmie-pro::em.paid') : __('eventmie-pro::em.unpaid'));
        $cancellation_msg           = __('eventmie-pro::em.no_cancellation');
        if($check_booking['booking_cancel'] == 1)
            $cancellation_msg       = __('eventmie-pro::em.pending');
        elseif($check_booking['booking_cancel'] == 2)
            $cancellation_msg       = __('eventmie-pro::em.approved');
        elseif($check_booking['booking_cancel'] == 3)
            $cancellation_msg       = __('eventmie-pro::em.refunded');

        $msg[]                  = __('eventmie-pro::em.cancellation').' - '.$cancellation_msg;
        $extra_lines            = $msg;

        $mail['mail_subject']   = __('eventmie-pro::em.booking_cancellation_update');
        $mail['mail_message']   = __('eventmie-pro::em.booking_status');
        $mail['action_title']   = __('eventmie-pro::em.mybookings');
        $mail['action_url']     = route('eventmie.mybookings_index');
        $mail['n_type']       = "cancel";

        $notification_ids       = [1, $check_booking['organiser_id'], $check_booking['customer_id']];
        
        $users = User::whereIn('id', $notification_ids)->get();
        try {
            \Notification::locale(\App::getLocale())->send($users, new MailNotification($mail, $extra_lines));
        } catch (\Throwable $th) {}
        // ====================== Notification ======================  
        
        return response([
            'status'=> true,
        ], Response::HTTP_OK);
    }

    // view coustomer booking by scanner oraganizer
    public function show($id = null, $view = 'eventmie::scanner_bookings.show', $extra = [])
    {
        $id    = (int) $id;
        // $organiser_id  = Auth::user()->organizer_id; 

        if(!$id)
              // redirect no matter what so that it never turns back
              return response(['status'=>__('eventmie-pro::em.invalid').' '.__('eventmie-pro::em.data'), 'url'=>'/events'], Response::HTTP_OK);    

        

        $params = [
            // 'organiser_id' => $organiser_id,
            'id'           => $id,
            'scanner_id'   => Auth::id(),
        ];

        // get customer booking by orgniser
        $booking =  $this->scanner->get_booking($params);  
               
        if(empty($booking))
        {
            // redirect no matter what so that it never turns back
            return success_redirect(__('eventmie-pro::em.booking').' '.__('eventmie-pro::em.not_found'), route('eventmie.events_index'));  
        }    

        $currency   = setting('regional.currency_default');
        
        $params = [
            'transaction_id' => $booking['transaction_id'],
            'order_number'   => $booking['order_number']
        ];

        // get transaction information by orgniser for this booking
        $payment = $this->transaction->organiser_payment_info($params);   
        
        return Eventmie::view($view, compact('booking', 'payment', 'currency', 'extra'));

    }

    /**
     *  get all events for related scanner_organizer
     */

    public function events()
    {
        $scanner_organizer_id = Auth::id();   

        // get related event's ids for scanner organizer 
        $event_ids   = $this->scanner->get_scanner_event_ids($scanner_organizer_id);
    
        $params   = [
            'event_ids'    => $event_ids,
        ];

        // get related event's ids for scanner organizer 
        $myevents    = $this->scanner->get_events($params);

        if(empty($myevents))
            return error(__('eventmie-pro::em.event').' '.__('eventmie-pro::em.not_found'), Response::HTTP_BAD_REQUEST );
        
        return response([
            'myevents'=> $myevents,
        ], Response::HTTP_OK);

    }
}
