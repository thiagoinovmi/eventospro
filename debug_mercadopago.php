<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Verificar bookings com payment_type = mercadopago
$bookings = \Classiebit\Eventmie\Models\Booking::where('payment_type', 'mercadopago')->get();
echo "=== BOOKINGS COM MERCADO PAGO ===\n";
echo "Total: " . $bookings->count() . "\n";
foreach ($bookings as $b) {
    echo "ID: {$b->id}, Customer: {$b->customer_id}, Payment Type: {$b->payment_type}, Is Paid: {$b->is_paid}\n";
}

echo "\n=== TRANSAÇÕES MERCADO PAGO ===\n";
$transactions = \Classiebit\Eventmie\Models\MercadoPagoTransaction::all();
echo "Total: " . $transactions->count() . "\n";
foreach ($transactions as $t) {
    echo "ID: {$t->id}, Booking ID: {$t->booking_id}, QR Code: " . (!empty($t->qr_code) ? 'SIM' : 'NÃO') . ", Base64: " . (!empty($t->qr_code_base64) ? 'SIM' : 'NÃO') . "\n";
}

echo "\n=== VERIFICAR RELAÇÃO ===\n";
if ($bookings->count() > 0) {
    $booking = $bookings->first();
    echo "Booking ID: {$booking->id}\n";
    $transaction = $booking->mercadopago_transaction;
    echo "Transaction: " . ($transaction ? 'ENCONTRADA' : 'NÃO ENCONTRADA') . "\n";
    if ($transaction) {
        echo "Transaction ID: {$transaction->id}\n";
        echo "QR Code: " . (!empty($transaction->qr_code) ? 'SIM' : 'NÃO') . "\n";
        echo "Base64: " . (!empty($transaction->qr_code_base64) ? 'SIM' : 'NÃO') . "\n";
    }
}

echo "\n=== VERIFICAR BANCO DE DADOS DIRETO ===\n";
$result = DB::select('SELECT * FROM mercadopago_transactions LIMIT 5');
echo "Registros na tabela mercadopago_transactions: " . count($result) . "\n";
foreach ($result as $row) {
    echo "ID: {$row->id}, Booking ID: {$row->booking_id}, QR Code: " . (!empty($row->qr_code) ? 'SIM' : 'NÃO') . "\n";
}
