<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\MercadoPagoTransaction;
use Classiebit\Eventmie\Models\Booking;

class MercadoPagoWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // Logar tudo que o Mercado Pago mandar, pra debug
        $logFile = storage_path('logs/webhook_debug.log');
        $timestamp = date('Y-m-d H:i:s');
        
        file_put_contents($logFile, "\n[$timestamp] === WEBHOOK MERCADO PAGO RECEBIDO ===\n", FILE_APPEND);
        file_put_contents($logFile, "[$timestamp] Method: " . $request->method() . "\n", FILE_APPEND);
        file_put_contents($logFile, "[$timestamp] URL: " . $request->url() . "\n", FILE_APPEND);
        file_put_contents($logFile, "[$timestamp] Payload: " . json_encode($request->all()) . "\n", FILE_APPEND);
        file_put_contents($logFile, "[$timestamp] Headers: " . json_encode($request->headers->all()) . "\n", FILE_APPEND);
        
        Log::info('=== WEBHOOK MERCADO PAGO RECEBIDO - CONTROLLER CHAMADO ===');
        Log::info('Payload:', $request->all());
        Log::info('Headers:', $request->headers->all());

        try {
            // Mercado Pago envia o tipo de evento em 'type' e o ID do recurso em 'data.id'
            $type = $request->input('type');
            $dataId = $request->input('data.id');
            
            Log::info('Webhook Info:', [
                'type' => $type,
                'data_id' => $dataId,
            ]);
            
            // Validar se é um evento de pagamento
            if (!$type || !$dataId) {
                Log::warning('⚠️ Webhook inválido - type ou data.id vazio');
                return response()->json(['status' => 'ok'], 200);
            }
            
            // Se for um pagamento, processar
            if ($type === 'payment') {
                Log::info('🔵 Processando pagamento com ID:', ['payment_id' => $dataId]);
                
                $transaction = MercadoPagoTransaction::where('payment_id', $dataId)->first();
                
                if ($transaction) {
                    Log::info('✅ Transação encontrada:', [
                        'id' => $transaction->id,
                        'payment_id' => $transaction->payment_id,
                        'booking_id' => $transaction->booking_id,
                        'status_atual' => $transaction->status
                    ]);
                    
                    // Atualizar status da transação para 'approved'
                    $transaction->status = 'approved';
                    $transaction->save();
                    
                    Log::info('✅ Transação atualizada para approved');
                    
                    // Atualizar booking se existir
                    if ($transaction->booking_id) {
                        $booking = Booking::find($transaction->booking_id);
                        if ($booking) {
                            Log::info('📦 Booking encontrado - atualizando is_paid');
                            
                            $booking->is_paid = 1;
                            $booking->save();
                            
                            Log::info('✅ Booking atualizado para paid:', [
                                'booking_id' => $booking->id
                            ]);
                        } else {
                            Log::warning('❌ Booking não encontrado:', ['booking_id' => $transaction->booking_id]);
                        }
                    } else {
                        Log::warning('⚠️ Transação não tem booking_id');
                    }
                } else {
                    Log::warning('❌ Transação não encontrada para payment_id:', ['payment_id' => $dataId]);
                }
            } else {
                Log::info('ℹ️ Evento não é payment, ignorando:', ['type' => $type]);
            }
            
            // Sempre retornar 200 OK para Mercado Pago
            return response()->json(['status' => 'ok'], 200);
            
        } catch (\Exception $e) {
            Log::error('❌ Erro ao processar webhook:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            // Retornar 200 mesmo em caso de erro para não fazer retry infinito
            return response()->json(['status' => 'ok'], 200);
        }
    }
}
