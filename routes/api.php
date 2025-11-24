<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Mercado Pago Webhook (sem CSRF, sem autenticação)
Route::post('/mercadopago/webhook', '\Classiebit\Eventmie\Http\Controllers\BookingsController@mercadopagoWebhook')
    ->name('api.mercadopago_webhook')
    ->withoutMiddleware(['api']);
