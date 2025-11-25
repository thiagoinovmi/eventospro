<?php

namespace Classiebit\Eventmie\Models;

use Illuminate\Database\Eloquent\Model;

class EventPaymentMethod extends Model
{
    protected $table = 'event_payment_methods';

    protected $fillable = [
        'event_id',
        'payment_method_id',
        'enabled',
        'installments_enabled',
        'max_installments',
    ];

    protected $casts = [
        'enabled' => 'boolean',
        'installments_enabled' => 'boolean',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(MercadoPagoPaymentMethod::class, 'payment_method_id');
    }
}
