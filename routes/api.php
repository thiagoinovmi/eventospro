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

// Rota para obter dados do usuário logado
Route::middleware('auth')->get('/user', function (Request $request) {
    return response()->json([
        'status' => true,
        'data' => $request->user()
    ]);
});

// Rota para verificar status de transação PIX
Route::middleware('auth')->get('/mercadopago/transaction/{transactionId}/status', function (Request $request, $transactionId) {
    $transaction = \Classiebit\Eventmie\Models\MercadoPagoTransaction::where('id', $transactionId)
        ->where('user_id', $request->user()->id)
        ->first();
    
    if (!$transaction) {
        return response()->json([
            'status' => false,
            'message' => 'Transação não encontrada'
        ], 404);
    }
    
    return response()->json([
        'status' => true,
        'data' => [
            'transaction_status' => $transaction->status,
            'payment_id' => $transaction->payment_id,
            'is_paid' => $transaction->booking ? $transaction->booking->is_paid : false,
            'updated_at' => $transaction->updated_at
        ]
    ]);
});
