<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Exceptions\MPApiException;

class TestMercadoPagoFull extends Command
{
    protected $signature = 'test:mercadopago-full';
    protected $description = 'Teste completo e automático do Mercado Pago - descobre erros dinamicamente';

    public function handle()
    {
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║   TESTE COMPLETO E AUTOMÁTICO - MERCADO PAGO SDK V2       ║');
        $this->info('╚════════════════════════════════════════════════════════════╝');
        $this->newLine();

        // ============ TESTE 1: Configuração ============
        $this->testConfiguration();

        // ============ TESTE 2: Cartões de Teste ============
        $this->testCards();

        // ============ TESTE 3: Payload Mínimo ============
        $this->testMinimalPayload();

        // ============ TESTE 4: Payload Completo ============
        $this->testFullPayload();

        $this->newLine();
        $this->info('╔════════════════════════════════════════════════════════════╗');
        $this->info('║   FIM DO TESTE                                            ║');
        $this->info('╚════════════════════════════════════════════════════════════╝');

        return 0;
    }

    private function testConfiguration()
    {
        $this->info('📋 TESTE 1: CONFIGURAÇÃO');
        $this->line('─────────────────────────────────────────────────────────');

        $accessToken = setting('mercadopago.access_token');
        $publicKey = setting('mercadopago.public_key');

        $this->line('✓ Access Token: ' . (!empty($accessToken) ? '✅ CONFIGURADO' : '❌ NÃO CONFIGURADO'));
        if ($accessToken) {
            $this->line('  └─ Preview: ' . substr($accessToken, 0, 30) . '...');
            $this->line('  └─ Tipo: ' . (strpos($accessToken, 'TEST-') === 0 ? 'TESTE ✅' : 'PRODUÇÃO ⚠️'));
        }

        $this->line('✓ Public Key: ' . (!empty($publicKey) ? '✅ CONFIGURADA' : '❌ NÃO CONFIGURADA'));
        if ($publicKey) {
            $this->line('  └─ Preview: ' . substr($publicKey, 0, 30) . '...');
            $this->line('  └─ Tipo: ' . (strpos($publicKey, 'TEST-') === 0 ? 'TESTE ✅' : 'PRODUÇÃO ⚠️'));
        }

        try {
            MercadoPagoConfig::setAccessToken($accessToken);
            $this->line('✓ SDK Inicializado: ✅ OK');
        } catch (\Exception $e) {
            $this->error('✗ SDK Inicializado: ❌ ERRO - ' . $e->getMessage());
            return false;
        }

        $this->newLine();
        return true;
    }

    private function testCards()
    {
        $this->info('💳 TESTE 2: CARTÕES DE TESTE OFICIAIS');
        $this->line('─────────────────────────────────────────────────────────');

        $cards = [
            [
                'brand' => 'VISA',
                'number' => '4509953566233704',
                'expiry' => '11/30',
                'cvv' => '123',
                'cpf' => '12345678909'
            ],
            [
                'brand' => 'MASTERCARD',
                'number' => '5031433215406351',
                'expiry' => '11/30',
                'cvv' => '123',
                'cpf' => '12345678909'
            ],
            [
                'brand' => 'AMEX',
                'number' => '378282246310005',
                'expiry' => '11/30',
                'cvv' => '1234',
                'cpf' => '12345678909'
            ]
        ];

        foreach ($cards as $card) {
            $this->line('✓ ' . $card['brand'] . ': ' . substr($card['number'], 0, 4) . ' **** **** ' . substr($card['number'], -4));
            $this->line('  └─ Vencimento: ' . $card['expiry'] . ' | CVV: ' . $card['cvv'] . ' | CPF: ' . $card['cpf']);
        }

        $this->line('');
        $this->warn('⚠️  IMPORTANTE: Tokens devem ser gerados no FRONTEND com o SDK Mercado Pago');
        $this->warn('    Tokens expiram em ~5-10 minutos após geração');

        $this->newLine();
    }

    private function testMinimalPayload()
    {
        $this->info('📦 TESTE 3: PAYLOAD MÍNIMO (sem token real)');
        $this->line('─────────────────────────────────────────────────────────');

        $payload = [
            'transaction_amount' => 5.00,
            'description' => 'Teste Mínimo',
            'payment_method_id' => 'master',
            'payer' => [
                'email' => 'test@test.com',
                'identification' => [
                    'type' => 'CPF',
                    'number' => '12345678909'
                ]
            ],
            'token' => 'TOKEN_PLACEHOLDER_INVALIDO',
            'installments' => 1,
            'capture' => true
        ];

        $this->line('Payload:');
        $this->line(json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        $this->line('');
        $this->warn('⚠️  Este teste usa token inválido - erro esperado: "Card Token not found"');

        $this->testPaymentWithPayload($payload, 'MÍNIMO');

        $this->newLine();
    }

    private function testFullPayload()
    {
        $this->info('📦 TESTE 4: PAYLOAD COMPLETO (com campos extras)');
        $this->line('─────────────────────────────────────────────────────────');

        $payload = [
            'transaction_amount' => 5.00,
            'description' => 'Teste Completo - Evento #1',
            'payment_method_id' => 'master',
            'payer' => [
                'email' => 'thiagotinformatica@gmail.com',
                'first_name' => 'USUARIO',
                'last_name' => 'SANDBOX',
                'identification' => [
                    'type' => 'CPF',
                    'number' => '12345678909'
                ]
            ],
            'token' => 'TOKEN_PLACEHOLDER_INVALIDO',
            'installments' => 1,
            'capture' => true,
            'external_reference' => 'BOOKING-' . time() . '-9',
            'statement_descriptor' => 'EVENTO',
            'notification_url' => 'https://eventos.inovmi.com.br/api/mercadopago/webhook'
        ];

        $this->line('Payload:');
        $this->line(json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        $this->line('');
        $this->warn('⚠️  Este teste usa token inválido - erro esperado: "Card Token not found"');

        $this->testPaymentWithPayload($payload, 'COMPLETO');

        $this->newLine();
    }

    private function testPaymentWithPayload($payload, $testName)
    {
        try {
            $paymentClient = new PaymentClient();
            $payment = $paymentClient->create($payload);

            $this->info('✅ SUCESSO - Pagamento criado!');
            $this->line('   Payment ID: ' . $payment->id);
            $this->line('   Status: ' . $payment->status);
            $this->line('   Status Detail: ' . ($payment->status_detail ?? 'N/A'));

        } catch (MPApiException $e) {
            $this->error('❌ ERRO DA API - ' . $testName);
            $this->line('   Mensagem: ' . $e->getMessage());

            $apiResponse = $e->getApiResponse();
            $content = $apiResponse->getContent();

            if (is_array($content)) {
                $this->line('   Status Code: ' . ($content['status'] ?? 'N/A'));
                $this->line('   Error: ' . ($content['error'] ?? 'N/A'));
                $this->line('   Message: ' . ($content['message'] ?? 'N/A'));

                if (isset($content['cause']) && is_array($content['cause'])) {
                    foreach ($content['cause'] as $cause) {
                        $this->line('   └─ Código: ' . ($cause['code'] ?? 'N/A'));
                        $this->line('   └─ Descrição: ' . ($cause['description'] ?? 'N/A'));
                    }
                }
            } else {
                $this->line('   Response: ' . json_encode($content, JSON_PRETTY_PRINT));
            }

        } catch (\Exception $e) {
            $this->error('❌ ERRO GERAL - ' . $testName);
            $this->line('   Classe: ' . get_class($e));
            $this->line('   Mensagem: ' . $e->getMessage());
            $this->line('   Arquivo: ' . $e->getFile() . ':' . $e->getLine());
        }
    }
}
