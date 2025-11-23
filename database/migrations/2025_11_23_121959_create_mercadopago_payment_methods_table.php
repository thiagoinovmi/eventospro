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
        Schema::create('mercadopago_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->enum('method_type', ['credit_card', 'debit_card', 'boleto', 'pix', 'mercadopago_wallet'])->unique();
            $table->boolean('enabled')->default(true);
            $table->string('display_name');
            $table->string('icon_url')->nullable();
            $table->text('description')->nullable();
            $table->boolean('installments_enabled')->default(false);
            $table->integer('max_installments')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mercadopago_payment_methods');
    }
};
