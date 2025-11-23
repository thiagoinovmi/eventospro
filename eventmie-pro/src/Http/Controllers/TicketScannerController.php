<?php

namespace Classiebit\Eventmie\Http\Controllers;


use App\Http\Controllers\Controller; 
use Facades\Classiebit\Eventmie\Eventmie;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Intervention\Image\Facades\Image;
use File;

use Auth;

use Classiebit\Eventmie\Models\Event;
use Classiebit\Eventmie\Models\Booking;
use Classiebit\Eventmie\Models\Checkin;


class TicketScannerController extends Controller
{
    public function __construct()
    {
        $this->middleware('organiser');
    }

    public function index(Request $request, $view = 'eventmie::ticket_scanner.index', $extra = [])
    {
        /**
         * Event Validations
         * 1. Fetch event who end_date >= today
         * 2. If Organiser is logged in, then fetch event who user_id = logged in user_id
         * 3. If Admin is logged in, don't fetch any event, Admin can scan tickets for all events
         */
        
        // On the basis of logged in scanner or organiser, fetch all the event ids for which they can scan tickets for
        $allowed_event_ids = [];
        $today = Carbon::today()->format('Y-m-d');

        if (Auth::user()->hasRole('organiser')) {
            // Get events created by organiser that are not expired
            $query = Event::select('id', 'scan_on_event_day_only')
                ->where('user_id', Auth::id())
                ->where('end_date', '>=', $today);

            // Use chunk to handle large datasets
            $query->chunk(50, function($events) use (&$allowed_event_ids) {
                foreach($events as $event) {
                    $allowed_event_ids[] = [
                        'event_id' => $event->id,
                        'scan_on_event_day_only' => (bool)$event->scan_on_event_day_only
                    ];
                }
            });

            if(empty($allowed_event_ids)) {
                return error_redirect(__('eventmie-pro::em.no_events_available_scanning'));
            }
        }
        elseif (Auth::user()->hasRole('scanner')) {
            // Get events assigned to scanner that are active today
            $query = Event::select('events.id', 'events.scan_on_event_day_only')
                ->join('user_roles', function($join) {
                    $join->on('events.id', '=', 'user_roles.event_id')
                        ->where('user_roles.user_id', Auth::id());
                })
                ->where('events.end_date', '>=', $today);

            // Use chunk to handle large datasets
            $query->chunk(50, function($events) use (&$allowed_event_ids) {
                foreach($events as $event) {
                    $allowed_event_ids[] = [
                        'event_id' => $event->id,
                        'scan_on_event_day_only' => (bool)$event->scan_on_event_day_only
                    ];
                }
            });

            if(empty($allowed_event_ids)) {
                if ($request->expectsJson()) {
                    return response()->json([
                        'status' => false,
                        'message' => __('eventmie-pro::em.no_events_assigned_active')
                    ], 404);
                }
                return error_redirect(__('eventmie-pro::em.no_events_assigned_active'));
            }
        }
        // Admin can access all events, so no need to set allowed_event_ids

        session()->put('allowed_event_ids', $allowed_event_ids);

        $extra['refresh_timer'] = 3000;

        if ($request->expectsJson()) {
            return response()->json([
                'status' => true,
                'allowed_event_ids' => $allowed_event_ids,
                'extra' => $extra
            ]);
        }

        return view($view, compact('extra'));
    }

    /**
     * Fetch bookings based on order_number from request
     */
    private function getBookingsFromRequest(Request $request)
    {
        // Strip any single or double quotes from the order number
        $orderNumber = trim($request->order_number, "'\"");
        
        // Always get single booking for manual mode
        $select = [
            'id', 'event_id', 'order_number', 'customer_name', 'customer_email', 'ticket_id', 'ticket_title', 'status', 'is_paid', 'event_title', 'event_start_date', 'event_end_date'
        ];
        return Booking::select($select)
                ->from('bookings')
                ->where('order_number', $orderNumber)
                ->get();
    }

    public function verify_and_checkin(Request $request)
    {
        $request->validate([
            'order_number' => 'required',
        ],['order_number.required' => __('eventmie-pro::em.ticket_not_found')]);

        // Fetch bookings
        $bookings = $this->getBookingsFromRequest($request);

        if ($bookings->isEmpty()) {
            $msg = __('eventmie-pro::em.ticket_not_found');
            return response()->json(['status' => false, 'flag' => 'fail', 'message' => $msg]);
        }

        $allowed_event_ids = session('allowed_event_ids', []);
        $today = now();

        // Assume all bookings are for the same event/order
        $firstBooking = $bookings->first();
        $eventTitle = $firstBooking->event_title ?? '';
        $orderNumber = $firstBooking->order_number;
        $customerName = $firstBooking->customer_name ?? '';
        $customerEmail = $firstBooking->customer_email ?? '';
        $checkinDate = $today->format('d/m/Y');
        $checkinTime = $today->format('H:i');

        foreach ($bookings as $booking) {
            // Validate event access
            if (!Auth::user()->hasRole('admin')) {
                $eventFound = false;
                $scanOnEventDayOnly = false;
                
                foreach ($allowed_event_ids as $allowed_event) {
                    if ($allowed_event['event_id'] == $booking->event_id) {
                        $eventFound = true;
                        $scanOnEventDayOnly = $allowed_event['scan_on_event_day_only'];
                        break;
                    }
                }
                
                if (!$eventFound) {
                    $msg = __('eventmie-pro::em.not_authorized_scan_event');
                    return response()->json(['status' => false, 'flag' => 'fail', 'message' => $msg]);
                }
            }

            // Validate booking status and payment
            if ($booking->status != 1) {
                $msg = __('eventmie-pro::em.ticket_not_valid_cancelled');
                return response()->json(['status' => false, 'flag' => 'fail', 'message' => $msg]);
            }
            if ($booking->is_paid != 1) {
                $msg = __('eventmie-pro::em.ticket_not_paid');
                return response()->json(['status' => false, 'flag' => 'fail', 'message' => $msg]);
            }
            
            // Validate event date based on scan_on_event_day_only setting
            if (!Auth::user()->hasRole('admin')) {
                if ($scanOnEventDayOnly) {
                    // If enabled, only allow scanning on event day
                    if ($today->toDateString() < $booking->event_start_date || $today->toDateString() > $booking->event_end_date) {
                        $msg = __('eventmie-pro::em.ticket_scan_event_day_only');
                        return response()->json(['status' => false, 'flag' => 'fail', 'message' => $msg]);
                    }
                } else {
                    // If disabled, allow scanning any time before event expires
                    if ($today->toDateString() > $booking->event_end_date) {
                        $msg = __('eventmie-pro::em.event_expired');
                        return response()->json(['status' => false, 'flag' => 'fail', 'message' => $msg]);
                    }
                }
            }
        }

        // Create check-in records for all bookings
        $scanRecords = [];
        $wasRecentlyCreated = false;
        
        foreach ($bookings as $booking) {
            $scanRecord = Checkin::firstOrCreate(
                [
                    'event_id' => $booking->event_id,
                    'booking_id' => $booking->id,
                    'event_start_date' => $today->toDateString()
                ],
                [
                    'user_id' => Auth::id(),
                    'check_in_time' => $today->format('H:i:s')
                ]
            );
            
            $scanRecords[] = $scanRecord;
            if ($scanRecord->wasRecentlyCreated) {
                $wasRecentlyCreated = true;
            }
        }

        // Group bookings by ticket_id
        $tickets = [];
        foreach ($bookings->groupBy('ticket_id') as $ticket_id => $ticketBookings) {
            $ticketTitle = $ticketBookings->first()->ticket_title ?? '';
            $tickets[] = [
                'ticket_id' => $ticket_id,
                'ticket_title' => $ticketTitle,
            ];
        }

        // Use the first record for response data
        $firstScanRecord = $scanRecords[0];
        
        if ($wasRecentlyCreated) {
            return response()->json([
                'status' => true,
                'flag' => 'success',
                'event_title' => $eventTitle,
                'order_number' => $orderNumber,
                'customer_name' => $customerName,
                'customer_email' => $customerEmail,
                'checkin_date' => $checkinDate,
                'checkin_time' => $checkinTime,
                'tickets' => $tickets
            ]);
        } else {
            // Use the actual check-in time from the first record
            $checkinTime = Carbon::parse($firstScanRecord->check_in_time)->format('H:i');
            $checkinDate = Carbon::parse($firstScanRecord->event_start_date)->format('d/m/Y');
            return response()->json([
                'status' => true,
                'flag' => 'warning',
                'event_title' => $eventTitle,
                'order_number' => $orderNumber,
                'customer_name' => $customerName,
                'customer_email' => $customerEmail,
                'checkin_date' => $checkinDate,
                'checkin_time' => $checkinTime,
                'tickets' => $tickets
            ]);
        }
    }

    public function getBookingDetails(Request $request)
    {
        $request->validate([
            'order_number' => 'required',
        ],['order_number.required' => __('eventmie-pro::em.ticket_not_found')]);

        $bookings = $this->getBookingsFromRequest($request);

        if ($bookings->isEmpty()) {
            $msg = __('eventmie-pro::em.ticket_not_found');
            return response()->json(['status' => false, 'flag' => 'fail', 'message' => $msg]);
        }

        $today = now();
        $firstBooking = $bookings->first();
        $eventTitle = $firstBooking->event_title ?? '';
        $orderNumber = $firstBooking->order_number;
        $customerName = $firstBooking->customer_name ?? '';
        $customerEmail = $firstBooking->customer_email ?? '';
        $checkinDate = $today->format('d/m/Y');
        $checkinTime = $today->format('H:i');

        // Group bookings by ticket_id
        $tickets = [];
        foreach ($bookings->groupBy('ticket_id') as $ticket_id => $ticketBookings) {
            $ticketTitle = $ticketBookings->first()->ticket_title ?? '';
            $tickets[] = [
                'ticket_id' => $ticket_id,
                'ticket_title' => $ticketTitle,
            ];
        }

        // Check if any of the bookings are already checked in
        $isCheckedIn = false;
        foreach ($bookings as $booking) {
            $checkin = Checkin::where([
                'event_id' => $booking->event_id,
                'booking_id' => $booking->id,
                'event_start_date' => $today->toDateString()
            ])->first();
            
            if ($checkin) {
                $isCheckedIn = true;
                break;
            }
        }

        return response()->json([
            'status' => true,
            'flag' => 'details',
            'event_title' => $eventTitle,
            'order_number' => $orderNumber,
            'customer_name' => $customerName,
            'customer_email' => $customerEmail,
            'checkin_date' => $checkinDate,
            'checkin_time' => $checkinTime,
            'is_checked_in' => $isCheckedIn,
            'tickets' => $tickets
        ]);
    }

}
