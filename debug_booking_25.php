<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== BOOKING ID 25 ===\n";
$booking = \Classiebit\Eventmie\Models\Booking::find(25);
if ($booking) {
    echo "ID: {$booking->id}\n";
    echo "Customer ID: {$booking->customer_id}\n";
    echo "Payment Type: {$booking->payment_type}\n";
    echo "Is Paid: {$booking->is_paid}\n";
    echo "Status: {$booking->status}\n";
    echo "Order Number: {$booking->order_number}\n";
    
    echo "\n=== TRANSAÇÃO ASSOCIADA ===\n";
    $transaction = $booking->mercadopago_transaction;
    if ($transaction) {
        echo "Transaction ID: {$transaction->id}\n";
        echo "Booking ID: {$transaction->booking_id}\n";
        echo "QR Code: " . (!empty($transaction->qr_code) ? 'SIM - ' . substr($transaction->qr_code, 0, 50) . '...' : 'NÃO') . "\n";
        echo "Base64: " . (!empty($transaction->qr_code_base64) ? 'SIM - ' . strlen($transaction->qr_code_base64) . ' bytes' : 'NÃO') . "\n";
        echo "Expires At: {$transaction->qr_code_expires_at}\n";
    } else {
        echo "Nenhuma transação encontrada!\n";
    }
} else {
    echo "Booking não encontrado!\n";
}

echo "\n=== VERIFICAR TODOS OS BOOKINGS DO CUSTOMER 4 ===\n";
$bookings = \Classiebit\Eventmie\Models\Booking::where('customer_id', 4)->get();
echo "Total: " . $bookings->count() . "\n";
foreach ($bookings as $b) {
    echo "ID: {$b->id}, Payment Type: {$b->payment_type}, Is Paid: {$b->is_paid}\n";
}
