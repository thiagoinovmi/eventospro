<?php

namespace Classiebit\Eventmie\Models;

use Illuminate\Database\Eloquent\Model;

class MercadoPagoSetting extends Model
{
    protected $table = 'mercadopago_settings';

    protected $fillable = [
        'access_token',
        'public_key',
        'mode',
        'webhook_url',
        'webhook_token',
        'enabled',
    ];

    protected $casts = [
        'enabled' => 'boolean',
    ];
}
