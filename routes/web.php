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

// Mercado Pago Webhook (sem CSRF)
Route::post('/mercadopago/webhook', '\Classiebit\Eventmie\Http\Controllers\BookingsController@mercadopagoWebhook')
    ->name('mercadopago_webhook')
    ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);

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

if(file_exists(storage_path()."/installed")) {
    Eventmie::routes();
}