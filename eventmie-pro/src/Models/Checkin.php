<?php

namespace Classiebit\Eventmie\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

use Carbon\Carbon;

use Classiebit\Eventmie\Models\User;
use Classiebit\Eventmie\Models\Event;
use Classiebit\Eventmie\Models\Booking;

class Checkin extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'checkins';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'event_id',
        'booking_id',
        'user_id',
        'event_start_date',
        'check_in_time'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'event_start_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Accessor for check_in_time to return a Carbon instance
    public function getCheckInTimeAttribute($value)
    {
        return $value ? Carbon::createFromFormat('H:i:s', $value) : null;
    }

    /**
     * Get the event that owns the scan booking.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the booking that owns the scan booking.
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * Get the scanner (user) who performed the scan.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
} 