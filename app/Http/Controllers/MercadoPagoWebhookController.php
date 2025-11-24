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
                    
                    // 🔑 NOVO: Consultar API do Mercado Pago para validar status real
                    $paymentDetails = $this->getPaymentDetailsFromAPI($dataId);
                    
                    if ($paymentDetails && $paymentDetails['status'] === 'approved') {
                        Log::info('✅ Pagamento validado na API do Mercado Pago:', [
                            'status' => $paymentDetails['status'],
                            'status_detail' => $paymentDetails['status_detail'] ?? null,
                            'payment_method' => $paymentDetails['payment_method_id'] ?? null,
                            'amount' => $paymentDetails['transaction_amount'] ?? null
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
                                    'booking_id' => $booking->id,
                                    'payment_method' => $paymentDetails['payment_method_id'] ?? null
                                ]);
                            } else {
                                Log::warning('❌ Booking não encontrado:', ['booking_id' => $transaction->booking_id]);
                            }
                        } else {
                            Log::warning('⚠️ Transação não tem booking_id');
                        }
                    } else {
                        // Pagamento não foi aprovado
                        Log::warning('⚠️ Pagamento não está aprovado:', [
                            'status' => $paymentDetails['status'] ?? 'unknown',
                            'status_detail' => $paymentDetails['status_detail'] ?? null
                        ]);
                        
                        // Atualizar com status real da API
                        if ($paymentDetails) {
                            $transaction->status = $paymentDetails['status'] ?? 'pending';
                            $transaction->save();
                        }
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
    
    /**
     * 🔑 NOVO: Consultar detalhes do pagamento na API do Mercado Pago
     */
    private function getPaymentDetailsFromAPI($paymentId)
    {
        try {
            $accessToken = setting('mercadopago.access_token');
            
            if (!$accessToken) {
                Log::error('❌ Access token do Mercado Pago não configurado');
                return null;
            }
            
            Log::info('🔍 Consultando detalhes do pagamento na API:', ['payment_id' => $paymentId]);
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://api.mercadopago.com/v1/payments/{$paymentId}");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $accessToken,
                'Content-Type: application/json'
            ]);
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            $paymentData = json_decode($response, true);
            
            Log::info('📡 Resposta da API do Mercado Pago:', [
                'http_code' => $httpCode,
                'status' => $paymentData['status'] ?? null,
                'status_detail' => $paymentData['status_detail'] ?? null
            ]);
            
            if ($httpCode === 200 && isset($paymentData['status'])) {
                return $paymentData;
            }
            
            return null;
            
        } catch (\Exception $e) {
            Log::error('❌ Erro ao consultar API do Mercado Pago:', [
                'message' => $e->getMessage()
            ]);
            return null;
        }
    }
}
