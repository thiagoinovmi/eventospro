<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Exceptions\MPApiException;

class TestMercadoPago extends Command
{
    protected $signature = 'test:mercadopago';
    protected $description = 'Test Mercado Pago SDK configuration and payment';

    public function handle()
    {
        $this->info('=== TESTE DE CONFIGURAÇÃO MERCADO PAGO ===');
        $this->newLine();

        // Get token from settings
        $accessToken = setting('mercadopago.access_token');

        $this->info('1. Token configurado: ' . (!empty($accessToken) ? '✅ SIM' : '❌ NÃO'));
        if ($accessToken) {
            $this->line('   Token preview: ' . substr($accessToken, 0, 20) . '...');
            $this->line('   Token length: ' . strlen($accessToken));
            $this->line('   Token type: ' . (strpos($accessToken, 'TEST-') === 0 ? 'TESTE' : 'PRODUÇÃO'));
        }
        $this->newLine();

        // Initialize SDK
        try {
            MercadoPagoConfig::setAccessToken($accessToken);
            $this->info('2. SDK inicializado: ✅ SIM');
            $this->newLine();
        } catch (\Exception $e) {
            $this->error('2. SDK inicializado: ❌ NÃO');
            $this->error('   Erro: ' . $e->getMessage());
            $this->newLine();
            return 1;
        }

        // Test simple payment
        $this->info('3. Testando pagamento simples...');

        $paymentClient = new PaymentClient();

        // Test 1: Payload simples (sem items, sem additional_info)
        $testPayload = [
            'transaction_amount' => 5.00,
            'description' => 'Teste de pagamento',
            'payment_method_id' => 'visa',
            'payer' => [
                'email' => 'test@test.com'
            ],
            'token' => 'e9761f47e8541504642bae6f69aef646',
            'installments' => 1,
            'capture' => true
        ];

        $this->line('   Payload: ' . json_encode($testPayload, JSON_PRETTY_PRINT));
        $this->newLine();

        try {
            $payment = $paymentClient->create($testPayload);
            $this->info('   Resultado: ✅ SUCESSO');
            $this->line('   Payment ID: ' . $payment->id);
            $this->line('   Status: ' . $payment->status);
        } catch (MPApiException $e) {
            $this->error('   Resultado: ❌ ERRO');
            $this->error('   Mensagem: ' . $e->getMessage());
            $apiResponse = $e->getApiResponse();
            $this->error('   API Response: ' . (is_array($apiResponse) ? json_encode($apiResponse, JSON_PRETTY_PRINT) : json_encode((array)$apiResponse, JSON_PRETTY_PRINT)));
        } catch (\Exception $e) {
            $this->error('   Resultado: ❌ ERRO');
            $this->error('   Mensagem: ' . $e->getMessage());
            $this->error('   Trace: ' . $e->getTraceAsString());
        }

        $this->newLine();
        $this->info('=== FIM DO TESTE ===');

        return 0;
    }
}
