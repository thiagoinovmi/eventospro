<?php

namespace Classiebit\Eventmie\Models;

use Illuminate\Database\Eloquent\Model;

class MercadoPagoRefund extends Model
{
    protected $table = 'mercadopago_refunds';

    protected $fillable = [
        'transaction_id',
        'booking_id',
        'amount',
        'reason',
        'status',
        'refund_id',
        'notes',
        'requested_by',
        'requested_at',
        'processed_at',
    ];

    protected $casts = [
        'requested_at' => 'datetime',
        'processed_at' => 'datetime',
    ];

    public function transaction()
    {
        return $this->belongsTo(MercadoPagoTransaction::class, 'transaction_id');
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }

    public function requestedBy()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}
