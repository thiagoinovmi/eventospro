<?php

namespace App\Models;

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
        'enabled'
    ];
    
    protected $casts = [
        'enabled' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
    
    /**
     * Override the default encryption behavior
     * These fields should NOT be encrypted
     */
    protected function shouldBeEncrypted($key)
    {
        return false;
    }
    
    /**
     * Get the attributes that should be encrypted.
     */
    protected function getEncryptable()
    {
        return [];
    }
}
