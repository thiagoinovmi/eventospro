<?php

require_once __DIR__ . '/bootstrap/app.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "=== TESTE DE CONFIGURAÇÕES MERCADO PAGO ===\n\n";

echo "1. Testando setting('mercadopago.enabled'):\n";
$enabled = setting('mercadopago.enabled');
echo "   Valor: " . var_export($enabled, true) . "\n";
echo "   Tipo: " . gettype($enabled) . "\n";
echo "   Vazio? " . (empty($enabled) ? "SIM" : "NÃO") . "\n";
echo "   == 1? " . ($enabled == 1 ? "SIM" : "NÃO") . "\n\n";

echo "2. Testando setting('mercadopago.access_token'):\n";
$token = setting('mercadopago.access_token');
echo "   Vazio? " . (empty($token) ? "SIM" : "NÃO") . "\n";
echo "   Tamanho: " . strlen($token) . "\n";
echo "   Primeiros 20 chars: " . substr($token, 0, 20) . "\n\n";

echo "3. Testando setting('mercadopago.public_key'):\n";
$key = setting('mercadopago.public_key');
echo "   Vazio? " . (empty($key) ? "SIM" : "NÃO") . "\n";
echo "   Tamanho: " . strlen($key) . "\n";
echo "   Valor: " . $key . "\n\n";

echo "4. Lógica is_mercadopago():\n";
$is_mp = 0;
if(!empty($enabled) && $enabled == 1) {
    echo "   ✓ Enabled check passou\n";
    if(!empty($token) && !empty($key)) {
        echo "   ✓ Token e Key check passou\n";
        $is_mp = 1;
    } else {
        echo "   ✗ Token ou Key vazio\n";
    }
} else {
    echo "   ✗ Enabled check falhou\n";
}
echo "   Resultado Final: " . $is_mp . " (" . ($is_mp ? "HABILITADO" : "DESABILITADO") . ")\n";
