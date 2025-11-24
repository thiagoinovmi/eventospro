<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MercadoPagoWebhookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Essas rotas usam o middleware "api" e NÃO têm CSRF.
*/

Route::post('/mercadopago/webhook', [MercadoPagoWebhookController::class, 'handle'])
    ->name('api.mercadopago.webhook');
