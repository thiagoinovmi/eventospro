<?php

use Illuminate\Support\Facades\Route;
use TCG\Voyager\Models\Page;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(!file_exists(storage_path()."/installed")) {
        header('location:license');die;
    }

    return view('welcome');
});

Route::get('/license', 'App\Http\Controllers\LicenseController@index');
Route::get('/52cab7070ba5124895a63a3703f66893232', function() {
    header('location:install');die;
});

// API route para buscar páginas (Política de Privacidade e Termos)
Route::get('/api/pages/{id}', function ($id) {
    $page = Page::find($id);
    
    if (!$page) {
        return response()->json(['error' => 'Página não encontrada'], 404);
    }
    
    return response()->json([
        'id' => $page->id,
        'title' => $page->title,
        'body' => $page->body,
        'slug' => $page->slug,
    ]);
})->name('api.pages.show');

// Mercado Pago API Routes
Route::middleware(['auth'])->prefix('api/mercadopago')->group(function () {
    Route::get('/settings', 'App\Http\Controllers\MercadoPagoSettingsController@getSettings')->name('mercadopago.settings.get');
    Route::post('/settings', 'App\Http\Controllers\MercadoPagoSettingsController@updateSettings')->name('mercadopago.settings.update');
    Route::post('/test-connection', 'App\Http\Controllers\MercadoPagoSettingsController@testConnection')->name('mercadopago.test-connection');
    Route::get('/payment-methods', 'App\Http\Controllers\MercadoPagoSettingsController@getPaymentMethods')->name('mercadopago.payment-methods.get');
    Route::put('/payment-methods/{id}', 'App\Http\Controllers\MercadoPagoSettingsController@updatePaymentMethod')->name('mercadopago.payment-methods.update');
    Route::post('/seed-payment-methods', 'App\Http\Controllers\MercadoPagoSettingsController@seedPaymentMethods')->name('mercadopago.seed-payment-methods');
});

if(file_exists(storage_path()."/installed")) {
    Eventmie::routes();
}