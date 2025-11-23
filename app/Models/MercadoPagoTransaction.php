<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MercadoPagoTransaction extends Model
{
    protected $table = 'mercadopago_transactions';
    
    protected $fillable = [
        'booking_id',
        'user_id',
        'event_id',
        'payment_id',
        'status',
        'status_detail',
        'amount',
        'currency',
        'payment_method_type',
        'installments',
        'payer_email',
        'payer_name',
        'payer_document',
        'merchant_order_id',
        'notification_id',
        'webhook_received',
        'webhook_data',
        'refund_id',
        'refund_amount',
        'refund_status'
    ];
    
    protected $casts = [
        'amount' => 'decimal:2',
        'refund_amount' => 'decimal:2',
        'webhook_received' => 'boolean',
        'webhook_data' => 'json',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}
