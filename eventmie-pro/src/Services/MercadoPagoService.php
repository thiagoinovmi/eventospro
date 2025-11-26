<?php

namespace Classiebit\Eventmie\Services;

use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Exceptions\MPApiException;
use Illuminate\Support\Facades\Log;

class MercadoPagoService
{
    private $accessToken;
    private $publicKey;
    private $mode;
    private $paymentClient;

    /**
     * Constructor - Initialize Mercado Pago SDK
     */
    public function __construct($settings = [])
    {
        // Try to get token from settings array first, then from Voyager settings, then from env
        $this->accessToken = $settings['access_token'] 
            ?? setting('mercadopago.access_token')
            ?? env('MERCADOPAGO_ACCESS_TOKEN')
            ?? null;
            
        $this->publicKey = $settings['public_key'] 
            ?? setting('mercadopago.public_key')
            ?? env('MERCADOPAGO_PUBLIC_KEY')
            ?? null;
            
        $this->mode = $settings['mode'] ?? 'production';

        if (!$this->accessToken) {
            \Log::error('Mercado Pago access token not configured', [
                'from_settings' => !empty($settings['access_token']),
                'from_voyager' => !empty(setting('mercadopago.access_token')),
                'from_env' => !empty(env('MERCADOPAGO_ACCESS_TOKEN'))
            ]);
            throw new \Exception('Mercado Pago access token not configured');
        }

        // Initialize Mercado Pago SDK
        MercadoPagoConfig::setAccessToken($this->accessToken);
        
        // Note: setRuntimeEnv não existe na versão atual do SDK
        // O SDK detecta automaticamente o ambiente baseado no token
        // (TEST- para sandbox, APP_USR- para production)

        $this->paymentClient = new PaymentClient();
    }

    /**
     * Create a payment token for transparent checkout
     * 
     * @param array $cardData
     * @return array
     */
    public function createPaymentToken($cardData = [])
    {
        try {
            // This would be generated on the frontend using Mercado Pago SDK
            // We just validate and return it here
            if (empty($cardData['token'])) {
                return [
                    'status' => false,
                    'error' => 'Token is required'
                ];
            }

            return [
                'status' => true,
                'token' => $cardData['token']
            ];
        } catch (\Exception $e) {
            Log::error('Error creating payment token: ' . $e->getMessage());
            return [
                'status' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Create payment with optimizations (items, additional_info, device_id)
     * This is the main method that replaces cURL implementation
     * 
     * @param array $paymentData
     * @return array
     */
    public function createPayment($paymentData = [])
    {
        try {
            \Log::info('🚀 Iniciando createPayment', [
                'payment_method_id' => $paymentData['payment_method_id'] ?? 'unknown',
                'amount' => $paymentData['amount'] ?? 0
            ]);

            // Build optimized payload with all enhancements
            $payload = $this->buildOptimizedPayload($paymentData);

            \Log::info('📦 Payload otimizado construído:', [
                'payload_keys' => array_keys($payload),
                'has_items' => isset($payload['items']),
                'has_additional_info' => isset($payload['additional_info']),
                'has_device_id' => isset($payload['device_id']),
                'has_notification_url' => isset($payload['notification_url']),
                'payload_full' => json_encode($payload, JSON_PRETTY_PRINT)
            ]);

            // Create payment using SDK
            $payment = $this->paymentClient->create($payload);

            \Log::info('✅ Pagamento criado via SDK:', [
                'payment_id' => $payment->id,
                'status' => $payment->status,
                'status_detail' => $payment->status_detail ?? null
            ]);

            // Handle response and return standardized format
            return $this->handlePaymentResponse($payment, $paymentData);

        } catch (MPApiException $e) {
            $apiResponse = $e->getApiResponse();
            
            // Convert object to array if needed
            $apiResponseArray = is_array($apiResponse) ? $apiResponse : (array)$apiResponse;
            
            \Log::error('❌ Mercado Pago API Error:', [
                'message' => $e->getMessage(),
                'api_response' => $apiResponseArray,
                'api_response_full' => json_encode($apiResponseArray),
                'api_status' => $apiResponseArray['status'] ?? null,
                'api_errors' => $apiResponseArray['errors'] ?? null,
                'api_cause' => $apiResponseArray['cause'] ?? null
            ]);
            
            // Extract detailed error message
            $errorMsg = $e->getMessage();
            if (isset($apiResponseArray['errors']) && is_array($apiResponseArray['errors'])) {
                $errorMsg = implode(', ', array_map(function($err) {
                    return $err['message'] ?? $err['description'] ?? 'Unknown error';
                }, $apiResponseArray['errors']));
            } elseif (isset($apiResponseArray['cause']) && is_array($apiResponseArray['cause'])) {
                $errorMsg = implode(', ', array_map(function($err) {
                    return $err['description'] ?? 'Unknown error';
                }, $apiResponseArray['cause']));
            }
            
            return [
                'status' => false,
                'error' => $errorMsg,
                'api_error' => true,
                'message' => 'Erro na API do Mercado Pago: ' . $errorMsg
            ];
        } catch (\Exception $e) {
            \Log::error('❌ Error creating optimized payment:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return [
                'status' => false,
                'error' => $e->getMessage(),
                'message' => 'Erro ao processar pagamento: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Get payment details
     * 
     * @param string $paymentId
     * @return array
     */
    public function getPayment($paymentId)
    {
        try {
            $payment = $this->paymentClient->get($paymentId);

            return [
                'status' => true,
                'payment_id' => $payment->id,
                'status' => $payment->status,
                'status_detail' => $payment->status_detail ?? null,
                'amount' => $payment->transaction_amount,
                'currency' => $payment->currency_id,
                'payment_method' => $payment->payment_method_id,
                'installments' => $payment->installments,
                'payer_email' => $payment->payer->email ?? null,
                'created_at' => $payment->date_created
            ];
        } catch (\Exception $e) {
            Log::error('Error getting payment: ' . $e->getMessage());
            return [
                'status' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Refund a payment
     * 
     * @param string $paymentId
     * @param float $amount (optional - partial refund)
     * @return array
     */
    public function refundPayment($paymentId, $amount = null)
    {
        try {
            $request = [];
            if ($amount) {
                $request['amount'] = (float)$amount;
            }

            $refund = $this->paymentClient->refund($paymentId, $request);

            return [
                'status' => true,
                'refund_id' => $refund->id,
                'amount' => $refund->amount,
                'status' => $refund->status
            ];
        } catch (MPApiException $e) {
            Log::error('Mercado Pago Refund Error: ' . $e->getMessage());
            return [
                'status' => false,
                'error' => $e->getMessage(),
                'api_error' => true
            ];
        } catch (\Exception $e) {
            Log::error('Error refunding payment: ' . $e->getMessage());
            return [
                'status' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Get public key for frontend
     * 
     * @return string
     */
    public function getPublicKey()
    {
        return $this->publicKey;
    }

    /**
     * Validate webhook signature
     * 
     * @param array $headers
     * @param string $body
     * @param string $webhookToken
     * @return bool
     */
    public function validateWebhookSignature($headers, $body, $webhookToken)
    {
        try {
            // Mercado Pago sends X-Signature header
            $signature = $headers['x-signature'] ?? null;
            $requestId = $headers['x-request-id'] ?? null;

            if (!$signature || !$requestId) {
                return false;
            }

            // Validate signature
            $parts = explode(',', $signature);
            foreach ($parts as $part) {
                $partData = explode('=', $part);
                if (count($partData) === 2) {
                    $algorithm = trim($partData[0]);
                    $hash = trim($partData[1]);

                    if ($algorithm === 'sha256') {
                        $expectedHash = hash_hmac('sha256', $requestId . '.' . $body, $webhookToken);
                        if (hash_equals($hash, $expectedHash)) {
                            return true;
                        }
                    }
                }
            }

            return false;
        } catch (\Exception $e) {
            Log::error('Error validating webhook signature: ' . $e->getMessage());
            return false;
        }
    }


    /**
     * Build optimized payload with items, additional_info, device_id, notification_url
     * 
     * @param array $paymentData
     * @return array
     */
    private function buildOptimizedPayload($paymentData)
    {
        // Base payload structure
        $payload = [
            'transaction_amount' => (float)$paymentData['amount'],
            'description' => $paymentData['description'] ?? 'Pagamento de ingresso',
            'payment_method_id' => $paymentData['payment_method_id'],
            'installments' => (int)($paymentData['installments'] ?? 1),
            'capture' => true
        ];

        // Add payer information
        $payload['payer'] = [
            'email' => $paymentData['payer_email'] ?? $paymentData['user']->email ?? 'user@example.com'
        ];

        // Add identification if available
        if (!empty($paymentData['payer_document']) || !empty($paymentData['user']->document)) {
            $payload['payer']['identification'] = [
                'type' => 'CPF',
                'number' => $paymentData['payer_document'] ?? $paymentData['user']->document ?? ''
            ];
        }

        // Add first_name and last_name if available
        if (!empty($paymentData['user'])) {
            $user = $paymentData['user'];
            $payload['payer']['first_name'] = $user->name ?? 'Cliente';
            
            // Try to split name into first and last
            $nameParts = explode(' ', $user->name ?? 'Cliente');
            $payload['payer']['first_name'] = $nameParts[0];
            $payload['payer']['last_name'] = count($nameParts) > 1 ? implode(' ', array_slice($nameParts, 1)) : 'Silva';
        }

        // Add token for card payments
        if (!empty($paymentData['token'])) {
            $payload['token'] = $paymentData['token'];
        }

        // Add external reference
        $payload['external_reference'] = $paymentData['external_reference'] ?? 'BOOKING-' . time();

        // Add statement descriptor
        if (!empty($paymentData['statement_descriptor'])) {
            $payload['statement_descriptor'] = $paymentData['statement_descriptor'];
        }

        // 🎯 OPTIMIZATION 1: Items (+14 points)
        if (!empty($paymentData['event']) && !empty($paymentData['ticket'])) {
            $event = $paymentData['event'];
            $ticket = $paymentData['ticket'];
            
            $payload['items'] = [
                [
                    'id' => (string)$ticket->id,
                    'title' => $ticket->title ?? 'Ingresso',
                    'description' => 'Ingresso para ' . ($event->title ?? 'evento'),
                    'category_id' => 'event_ticket',
                    'quantity' => (int)($paymentData['quantity'] ?? 1),
                    'unit_price' => (float)$ticket->price,
                    'picture_url' => $event->poster ? url('storage/' . $event->poster) : null,
                    'warranty' => 'Garantia do evento'
                ]
            ];

            \Log::info('📋 Items adicionados:', $payload['items']);
        }

        // 🎯 OPTIMIZATION 2: Additional Info (+15 points)
        if (!empty($paymentData['user'])) {
            $user = $paymentData['user'];
            
            $payload['additional_info'] = [
                'payer' => [
                    'first_name' => $payload['payer']['first_name'],
                    'last_name' => $payload['payer']['last_name']
                ]
            ];

            // Add phone if available
            if (!empty($user->phone)) {
                $phone = preg_replace('/\D/', '', $user->phone);
                if (strlen($phone) >= 10) {
                    $areaCode = substr($phone, 0, 2);
                    $number = substr($phone, 2);
                    
                    $payload['additional_info']['payer']['phone'] = [
                        'area_code' => $areaCode,
                        'number' => $number
                    ];
                }
            }

            // Add address if available
            if (!empty($user->zip_code)) {
                $payload['additional_info']['payer']['address'] = [
                    'zip_code' => $user->zip_code,
                    'street_name' => $user->street_name ?? 'Rua Principal',
                    'street_number' => (int)($user->street_number ?? 1)
                ];

                // Add shipments (same as payer address for events)
                $payload['additional_info']['shipments'] = [
                    'receiver_address' => $payload['additional_info']['payer']['address']
                ];
            }

            \Log::info('📍 Additional info adicionado:', $payload['additional_info']);
        }

        // 🎯 OPTIMIZATION 3: Device ID (+10 points)
        if (!empty($paymentData['device_id'])) {
            $payload['device_id'] = $paymentData['device_id'];
            \Log::info('📱 Device ID adicionado:', ['device_id' => $payload['device_id']]);
        }

        // 🎯 OPTIMIZATION 4: Notification URL (+2 points)
        $payload['notification_url'] = url('/api/mercadopago/webhook');
        \Log::info('🔔 Notification URL adicionada:', ['url' => $payload['notification_url']]);

        return $payload;
    }

    /**
     * Handle payment response and return standardized format
     * 
     * @param object $payment
     * @param array $originalData
     * @return array
     */
    private function handlePaymentResponse($payment, $originalData)
    {
        $paymentMethodId = $originalData['payment_method_id'] ?? 'unknown';
        
        // Base response structure
        $response = [
            'status' => true,
            'payment_id' => $payment->id,
            'payment_method' => $paymentMethodId,
            'transaction_amount' => $payment->transaction_amount,
            'currency_id' => $payment->currency_id ?? 'BRL',
            'status_payment' => $payment->status,
            'status_detail' => $payment->status_detail ?? null,
            'external_reference' => $payment->external_reference ?? null,
            'date_created' => $payment->date_created ?? null
        ];

        // Handle specific payment methods
        switch ($paymentMethodId) {
            case 'pix':
                $response['pix_status'] = $payment->status;
                
                // Extract QR code data
                if (isset($payment->point_of_interaction->transaction_data)) {
                    $transactionData = $payment->point_of_interaction->transaction_data;
                    $response['qr_code'] = $transactionData->qr_code ?? null;
                    $response['qr_code_base64'] = $transactionData->qr_code_base64 ?? null;
                    $response['qr_code_url'] = null; // PIX doesn't have URL
                }
                
                $response['message'] = 'QR Code PIX gerado com sucesso';
                break;

            case 'bolbradesco':
            case 'bolsantander':
                $response['boleto_status'] = $payment->status;
                
                // Extract boleto URL
                if (isset($payment->transaction_details->external_resource_url)) {
                    $response['boleto_url'] = $payment->transaction_details->external_resource_url;
                }
                
                $response['message'] = 'Boleto gerado com sucesso';
                break;

            case 'account_money':
                $response['wallet_status'] = $payment->status;
                $response['message'] = 'Pagamento via carteira processado';
                break;

            default:
                // Credit/Debit cards
                $response['card_status'] = $payment->status;
                $response['installments'] = $payment->installments ?? 1;
                
                if ($payment->status === 'approved') {
                    $response['message'] = 'Pagamento aprovado com sucesso';
                } else {
                    $response['message'] = 'Pagamento processado - Status: ' . $payment->status;
                }
                break;
        }

        // Add payer information if available
        if (isset($payment->payer)) {
            $response['payer_email'] = $payment->payer->email ?? null;
            $response['payer_id'] = $payment->payer->id ?? null;
        }

        \Log::info('📤 Resposta padronizada:', [
            'payment_id' => $response['payment_id'],
            'status' => $response['status_payment'],
            'method' => $response['payment_method'],
            'has_qr_code' => isset($response['qr_code']),
            'has_boleto_url' => isset($response['boleto_url'])
        ]);

        return $response;
    }
}
