<?php

/**
 * Script para testar o webhook do Mercado Pago
 * Execute: php test_webhook.php
 */

// Simular um webhook do Mercado Pago
$webhookData = [
    'type' => 'payment',
    'data' => [
        'id' => 123456789  // ID do pagamento (será procurado no banco)
    ]
];

// URL do webhook
$webhookUrl = 'https://eventos.inovmi.com.br/mercadopago/webhook';

// Fazer requisição POST
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $webhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($webhookData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'User-Agent: MercadoPago/1.0'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

echo "=== TESTE DE WEBHOOK ===\n";
echo "URL: $webhookUrl\n";
echo "HTTP Code: $httpCode\n";
echo "Response: $response\n";
if ($curlError) {
    echo "Erro: $curlError\n";
}
echo "\nVerifique os logs em: storage/logs/laravel.log\n";
