<?php

namespace App\Models;

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
        'processed_at'
    ];
    
    protected $casts = [
        'amount' => 'decimal:2',
        'requested_at' => 'datetime',
        'processed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
    
    public function transaction()
    {
        return $this->belongsTo(MercadoPagoTransaction::class, 'transaction_id');
    }
}
