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
        MercadoPagoConfig::setRuntimeEnv(
            $this->mode === 'production' ? 'production' : 'sandbox'
        );

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
     * Create a payment
     * 
     * @param array $paymentData
     * @return array
     */
    public function createPayment($paymentData = [])
    {
        try {
            // Validate required fields
            $required = ['amount', 'description', 'payer_email', 'payment_method_id', 'token'];
            foreach ($required as $field) {
                if (empty($paymentData[$field])) {
                    return [
                        'status' => false,
                        'error' => "Field '{$field}' is required"
                    ];
                }
            }

            // Prepare payment request
            $request = [
                'transaction_amount' => (float)$paymentData['amount'],
                'description' => $paymentData['description'],
                'payment_method_id' => $paymentData['payment_method_id'],
                'payer' => [
                    'email' => $paymentData['payer_email'],
                    'first_name' => $paymentData['payer_name'] ?? 'Customer',
                    'identification' => [
                        'type' => 'CPF',
                        'number' => $paymentData['payer_document'] ?? ''
                    ]
                ],
                'token' => $paymentData['token'],
                'installments' => (int)($paymentData['installments'] ?? 1),
                'capture' => true
            ];

            // Add statement descriptor if provided
            if (!empty($paymentData['statement_descriptor'])) {
                $request['statement_descriptor'] = $paymentData['statement_descriptor'];
            }

            // Create payment
            $payment = $this->paymentClient->create($request);

            return [
                'status' => true,
                'payment_id' => $payment->id,
                'status_payment' => $payment->status,
                'status_detail' => $payment->status_detail ?? null,
                'transaction_id' => $payment->id,
                'payer_reference' => $payment->payer->id ?? null,
                'message' => $payment->status
            ];
        } catch (MPApiException $e) {
            Log::error('Mercado Pago API Error: ' . $e->getMessage());
            return [
                'status' => false,
                'error' => $e->getMessage(),
                'api_error' => true
            ];
        } catch (\Exception $e) {
            Log::error('Error creating payment: ' . $e->getMessage());
            return [
                'status' => false,
                'error' => $e->getMessage()
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
}
