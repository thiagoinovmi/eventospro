<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mercadopago_transactions', function (Blueprint $table) {
            // Adicionar campos para PIX QR Code
            $table->longText('qr_code')->nullable()->comment('Código PIX para copiar e colar');
            $table->longText('qr_code_base64')->nullable()->comment('QR Code em formato base64');
            $table->timestamp('qr_code_expires_at')->nullable()->comment('Data de expiração do QR Code (30 minutos)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mercadopago_transactions', function (Blueprint $table) {
            $table->dropColumn(['qr_code', 'qr_code_base64', 'qr_code_expires_at']);
        });
    }
};
