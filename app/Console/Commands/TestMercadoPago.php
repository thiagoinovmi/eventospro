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

        // Test 1: Payload COMPLETO com cartão MASTERCARD oficial
        // Cartão: 5031 4332 1540 6351 | Expiração: 11/30 | CVV: 123
        // Este token deve ser gerado no frontend com o SDK do Mercado Pago
        $testPayload = [
            'transaction_amount' => 5.00,
            'description' => 'Teste de pagamento - MASTERCARD',
            'payment_method_id' => 'mastercard',
            'payer' => [
                'email' => 'test@test.com',
                'first_name' => 'Test',
                'last_name' => 'User',
                'identification' => [
                    'type' => 'CPF',
                    'number' => '12345678909'  // CPF obrigatório para teste
                ]
            ],
            'token' => '82854a36cb3f9285bc2396b493133ad7', // Token real gerado
            'installments' => 1,
            'capture' => true
        ];

        // Para teste, vamos usar um token de teste conhecido
        // Você deve gerar um novo token no frontend e substituir aqui
        $this->line('   ⚠️  IMPORTANTE: Este teste usa um token placeholder.');
        $this->line('   Para testar com sucesso, você precisa:');
        $this->line('   1. Acessar: https://eventos.inovmi.com.br/events/corrida-outubro-rosa#/checkout');
        $this->line('   2. Selecionar Mercado Pago → Cartão de Crédito');
        $this->line('   3. Preencher com: 4111111111111111 | 11/30 | 123');
        $this->line('   4. Copiar o token gerado e substituir em INSIRA_TOKEN_GERADO_AQUI');
        $this->newLine();

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
