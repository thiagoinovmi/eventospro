<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MercadoPagoWebhook extends Model
{
    protected $table = 'mercadopago_webhooks';
    
    protected $fillable = [
        'event_type',
        'resource_id',
        'payload',
        'processed',
        'error_message'
    ];
    
    protected $casts = [
        'payload' => 'json',
        'processed' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}
