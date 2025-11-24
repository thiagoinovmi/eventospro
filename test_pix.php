<?php
// Test script to check PIX generation

require 'vendor/autoload.php';
require 'bootstrap/app.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Http\Kernel::class);

// Get the access token
$accessToken = \Classiebit\Eventmie\Models\Setting::where('key', 'mercadopago.access_token')->first();

echo "=== PIX TEST ===\n";
echo "Access Token exists: " . ($accessToken ? "YES" : "NO") . "\n";

if ($accessToken) {
    echo "Access Token value: " . substr($accessToken->value, 0, 20) . "...\n";
    
    // Test API call
    $paymentData = [
        "transaction_amount" => 5.00,
        "description" => "Teste PIX",
        "payment_method_id" => "pix",
        "payer" => [
            "email" => "test@example.com",
            "first_name" => "Test User"
        ],
        "date_of_expiration" => date('c', strtotime('+30 minutes'))
    ];
    
    echo "\nPayment Data:\n";
    echo json_encode($paymentData, JSON_PRETTY_PRINT) . "\n";
    
    // Make cURL request
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.mercadopago.com/v1/payments');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken->value
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    echo "\nHTTP Code: " . $httpCode . "\n";
    echo "cURL Error: " . ($curlError ?: "NONE") . "\n";
    echo "\nResponse:\n";
    echo json_encode(json_decode($response, true), JSON_PRETTY_PRINT) . "\n";
}
?>
