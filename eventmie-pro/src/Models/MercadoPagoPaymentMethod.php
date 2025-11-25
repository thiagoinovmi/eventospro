<?php

namespace Classiebit\Eventmie\Models;

use Illuminate\Database\Eloquent\Model;

class MercadoPagoPaymentMethod extends Model
{
    protected $table = 'mercadopago_payment_methods';

    protected $fillable = [
        'method_type',
        'enabled',
        'display_name',
        'icon_url',
        'description',
        'installments_enabled',
        'max_installments',
    ];

    protected $casts = [
        'enabled' => 'boolean',
        'installments_enabled' => 'boolean',
    ];

    public function eventPaymentMethods()
    {
        return $this->hasMany(EventPaymentMethod::class, 'payment_method_id');
    }
}
