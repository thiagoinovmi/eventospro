<?php

require 'vendor/autoload.php';

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;

// Get token from settings
$accessToken = setting('mercadopago.access_token');

echo "=== TESTE DE CONFIGURAÇÃO MERCADO PAGO ===\n\n";

echo "1. Token configurado: " . (!empty($accessToken) ? "✅ SIM" : "❌ NÃO") . "\n";
echo "   Token preview: " . substr($accessToken, 0, 20) . "...\n";
echo "   Token length: " . strlen($accessToken) . "\n";
echo "   Token type: " . (strpos($accessToken, 'TEST-') === 0 ? "TESTE" : "PRODUÇÃO") . "\n\n";

// Initialize SDK
try {
    MercadoPagoConfig::setAccessToken($accessToken);
    echo "2. SDK inicializado: ✅ SIM\n\n";
} catch (\Exception $e) {
    echo "2. SDK inicializado: ❌ NÃO\n";
    echo "   Erro: " . $e->getMessage() . "\n\n";
    exit(1);
}

// Test simple payment
echo "3. Testando pagamento simples...\n";

$paymentClient = new PaymentClient();

$testPayload = [
    'transaction_amount' => 5.00,
    'description' => 'Teste de pagamento',
    'payment_method_id' => 'visa',
    'payer' => [
        'email' => 'test@test.com',
        'first_name' => 'Test',
        'last_name' => 'User',
        'identification' => [
            'type' => 'CPF',
            'number' => '12345678909'
        ]
    ],
    'token' => 'e9761f47e8541504642bae6f69aef646',
    'installments' => 1,
    'capture' => true
];

echo "   Payload: " . json_encode($testPayload, JSON_PRETTY_PRINT) . "\n\n";

try {
    $payment = $paymentClient->create($testPayload);
    echo "   Resultado: ✅ SUCESSO\n";
    echo "   Payment ID: " . $payment->id . "\n";
    echo "   Status: " . $payment->status . "\n";
} catch (\MercadoPago\Exceptions\MPApiException $e) {
    echo "   Resultado: ❌ ERRO\n";
    echo "   Mensagem: " . $e->getMessage() . "\n";
    echo "   API Response: " . json_encode($e->getApiResponse(), JSON_PRETTY_PRINT) . "\n";
} catch (\Exception $e) {
    echo "   Resultado: ❌ ERRO\n";
    echo "   Mensagem: " . $e->getMessage() . "\n";
}

echo "\n=== FIM DO TESTE ===\n";
?>
