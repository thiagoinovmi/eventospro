<?php

namespace Classiebit\Eventmie\Models;

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
        'refund_status',
    ];

    protected $casts = [
        'webhook_data' => 'json',
        'webhook_received' => 'boolean',
        'amount' => 'decimal:2',
        'refund_amount' => 'decimal:2',
    ];

    /**
     * Relacionamento com Booking
     */
    public function booking()
    {
        return $this->belongsTo(\Classiebit\Eventmie\Models\Booking::class);
    }

    /**
     * Relacionamento com User
     */
    public function user()
    {
        return $this->belongsTo(\Classiebit\Eventmie\Models\User::class);
    }

    /**
     * Relacionamento com Event
     */
    public function event()
    {
        return $this->belongsTo(\Classiebit\Eventmie\Models\Event::class);
    }

    /**
     * Scope para transações aprovadas
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope para transações pendentes
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope para transações rejeitadas
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope para transações reembolsadas
     */
    public function scopeRefunded($query)
    {
        return $query->where('status', 'refunded');
    }

    /**
     * Verifica se a transação foi aprovada
     */
    public function isApproved()
    {
        return $this->status === 'approved';
    }

    /**
     * Verifica se a transação está pendente
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Verifica se a transação foi rejeitada
     */
    public function isRejected()
    {
        return $this->status === 'rejected';
    }

    /**
     * Verifica se a transação foi reembolsada
     */
    public function isRefunded()
    {
        return $this->status === 'refunded';
    }
}
