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
        // 🔧 Configurações Globais do Mercado Pago
        Schema::create('mercadopago_settings', function (Blueprint $table) {
            $table->id();
            $table->string('access_token')->nullable();
            $table->string('public_key')->nullable();
            $table->enum('mode', ['test', 'production'])->default('test');
            $table->string('webhook_url')->nullable();
            $table->string('webhook_token')->nullable();
            $table->boolean('enabled')->default(false);
            $table->timestamps();
        });

        // 💳 Métodos de Pagamento Globais
        Schema::create('mercadopago_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('method_type'); // credit_card, debit_card, boleto, pix, mercadopago_wallet
            $table->boolean('enabled')->default(true);
            $table->string('display_name');
            $table->string('icon_url')->nullable();
            $table->text('description')->nullable();
            $table->boolean('installments_enabled')->default(false);
            $table->integer('max_installments')->default(1);
            $table->timestamps();
            $table->unique('method_type');
        });

        // 🎫 Métodos de Pagamento por Evento
        Schema::create('event_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('payment_method_id');
            $table->boolean('enabled')->default(true);
            $table->boolean('installments_enabled')->default(false);
            $table->integer('max_installments')->default(1);
            $table->timestamps();
            
            // Foreign keys sem constraints para evitar problemas
            $table->unique(['event_id', 'payment_method_id']);
        });

        // 💰 Transações do Mercado Pago
        Schema::create('mercadopago_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('booking_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('event_id')->nullable();
            $table->string('payment_id')->nullable()->unique();
            $table->enum('status', ['pending', 'approved', 'rejected', 'cancelled', 'refunded', 'in_process'])->default('pending');
            $table->string('status_detail')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('BRL');
            $table->string('payment_method_type')->nullable();
            $table->integer('installments')->default(1);
            $table->string('payer_email')->nullable();
            $table->string('payer_name')->nullable();
            $table->string('payer_document')->nullable();
            $table->string('merchant_order_id')->nullable();
            $table->string('notification_id')->nullable();
            $table->boolean('webhook_received')->default(false);
            $table->json('webhook_data')->nullable();
            $table->unsignedBigInteger('refund_id')->nullable();
            $table->decimal('refund_amount', 10, 2)->nullable();
            $table->string('refund_status')->nullable();
            $table->timestamps();
            
            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('event_id')->references('id')->on('events')->onDelete('set null');
        });

        // 🔄 Reembolsos
        Schema::create('mercadopago_refunds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transaction_id');
            $table->unsignedBigInteger('booking_id')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('reason')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('refund_id')->nullable()->unique();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('requested_by')->nullable();
            $table->timestamp('requested_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
            
            $table->foreign('transaction_id')->references('id')->on('mercadopago_transactions')->onDelete('cascade');
            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('set null');
            $table->foreign('requested_by')->references('id')->on('users')->onDelete('set null');
        });

        // 🔔 Log de Webhooks
        Schema::create('mercadopago_webhooks', function (Blueprint $table) {
            $table->id();
            $table->string('event_type');
            $table->string('resource_id')->nullable();
            $table->json('payload')->nullable();
            $table->boolean('processed')->default(false);
            $table->text('error_message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mercadopago_webhooks');
        Schema::dropIfExists('mercadopago_refunds');
        Schema::dropIfExists('mercadopago_transactions');
        Schema::dropIfExists('event_payment_methods');
        Schema::dropIfExists('mercadopago_payment_methods');
        Schema::dropIfExists('mercadopago_settings');
    }
};
