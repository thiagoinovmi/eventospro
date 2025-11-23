<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMercadopagoTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mercadopago_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('booking_id')->nullable()->comment('ID da reserva');
            $table->unsignedBigInteger('user_id')->comment('ID do usuário');
            $table->unsignedBigInteger('event_id')->nullable()->comment('ID do evento');
            $table->string('payment_id')->unique()->comment('ID do pagamento no Mercado Pago');
            $table->string('merchant_order_id')->nullable()->comment('ID do pedido no Mercado Pago');
            $table->enum('status', [
                'pending',
                'authorized',
                'approved',
                'rejected',
                'cancelled',
                'refunded',
                'in_process'
            ])->default('pending')->comment('Status do pagamento');
            $table->string('status_detail')->nullable()->comment('Motivo do status');
            $table->decimal('amount', 12, 2)->comment('Valor da transação');
            $table->string('currency', 3)->default('BRL')->comment('Moeda');
            $table->enum('payment_method_type', [
                'credit_card',
                'debit_card',
                'boleto',
                'pix',
                'mercadopago_wallet'
            ])->comment('Tipo de método de pagamento');
            $table->integer('installments')->default(1)->comment('Número de parcelas');
            $table->string('payer_email')->comment('Email do pagador');
            $table->string('payer_name')->nullable()->comment('Nome do pagador');
            $table->string('payer_document')->nullable()->comment('CPF/CNPJ do pagador');
            $table->string('payer_phone')->nullable()->comment('Telefone do pagador');
            $table->string('card_last_four')->nullable()->comment('Últimos 4 dígitos do cartão');
            $table->string('card_brand')->nullable()->comment('Bandeira do cartão');
            $table->string('notification_id')->nullable()->comment('ID da notificação');
            $table->boolean('webhook_received')->default(false)->comment('Webhook recebido');
            $table->json('webhook_data')->nullable()->comment('Dados do webhook');
            $table->unsignedBigInteger('refund_id')->nullable()->comment('ID do reembolso');
            $table->timestamps();

            // Foreign keys
            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('event_id')->references('id')->on('events')->onDelete('set null');

            // Indexes
            $table->index('user_id');
            $table->index('booking_id');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mercadopago_transactions');
    }
}
