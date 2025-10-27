<?php

namespace Classiebit\Eventmie\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;

use Classiebit\Eventmie\Models\Booking;

class ScannerModel extends Model
{
    use HasFactory;
    // get bookings for scanner organizer
    public function get_bookings($params = [])
    {
        $query = Booking::query();
        
        $query->with('checkins');
        
        //CUSTOM
        $query->select('bookings.*', 'CM.customer_paid', 'events.online_location', 'events.thumbnail as event_thumbnail')
        //CUSTOM

            ->from('bookings')
            ->selectRaw("(SELECT E.slug FROM events E WHERE E.id = bookings.event_id) event_slug")
           
            //CUSTOM
            ->leftJoin('events', function ($join) {
                $join->on('bookings.event_id', '=', 'events.id')
                     ->where(['bookings.is_paid' => 1, 'bookings.status' => 1]);
            })
            //CUSTOM

            ->leftJoin('commissions as CM', 'CM.booking_id', '=', 'bookings.id');
            
            // in case of searching by between two dates
            if(!empty($params['start_date']) && !empty($params['end_date']))
            {
                $query ->whereDate('bookings.created_at', '>=' , $params['start_date']);
                $query ->whereDate('bookings.created_at', '<=' , $params['end_date']);
            }
            
            // in case of searching by start_date
            if(!empty($params['start_date']) && empty($params['end_date']))
                $query ->whereDate('bookings.created_at', $params['start_date']);

            // in case of searching by event_id
            if($params['event_id'] > 0) {
                $query->where(['bookings.event_id' => $params['event_id']]);
            } else {
                $query->whereIn('bookings.event_id', $params['event_ids']);
            }

            // CUSTOM
            // in case of searching by order_number
            if(!empty($params['order_number']))
                $query->where('bookings.order_number', 'like', '%'.$params['order_number'].'%');
            // CUSTOM
            
        return  $query
                ->orderBy('id', 'desc')
                ->paginate(10);
    }

    // get booking details
    public function get_booking($params = [])
    {
       
        return Booking::where($params)->first();    
            
    }

    // booking_edit for customer by scanner organiser
    public function edit_booking($data = [], $params = [])
    {
        return DB::table('bookings')
                ->where($params)
                ->update($data);
    }

    // check booking id for cancellation for scanner organiser
    public function check_booking($params = [])
    {
        return DB::table('bookings')
            ->where($params)
            ->first();   
    }

    // get related event_ids for scanner organizer 
    public function get_scanner_event_ids($scanner_organizer_id = null)
    {
        return DB::table('user_roles')->where(['user_id' => $scanner_organizer_id])->pluck('event_id');
    }

    // get  event for related scanner organizer 
    public function get_events($params = [])
    {
        $result = DB::table('events')->select('events.*')
                    ->from('events')
                    ->selectRaw("(SELECT CN.country_name FROM countries CN WHERE CN.id = events.country_id) country_name")
                    ->selectRaw("(SELECT CT.name FROM categories CT WHERE CT.id = events.category_id) category_name")
                    // ->where(['user_id' => $params['organiser_id'] ])
                    ->whereIn('events.id', $params['event_ids'])
                    ->get();
        
        return to_array($result);
    }
}
