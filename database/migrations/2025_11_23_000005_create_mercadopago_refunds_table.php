<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMercadopagoRefundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mercadopago_refunds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transaction_id')->comment('ID da transação');
            $table->unsignedBigInteger('booking_id')->nullable()->comment('ID da reserva');
            $table->decimal('amount', 12, 2)->comment('Valor do reembolso');
            $table->enum('reason', [
                'user_request',
                'payment_error',
                'duplicate',
                'fraud',
                'cancelled_event',
                'other'
            ])->comment('Motivo do reembolso');
            $table->enum('status', [
                'pending',
                'approved',
                'rejected',
                'cancelled'
            ])->default('pending')->comment('Status do reembolso');
            $table->string('refund_id')->nullable()->unique()->comment('ID do reembolso no Mercado Pago');
            $table->text('notes')->nullable()->comment('Notas adicionais');
            $table->unsignedBigInteger('requested_by')->comment('ID do usuário que solicitou');
            $table->unsignedBigInteger('processed_by')->nullable()->comment('ID do admin que processou');
            $table->timestamp('requested_at')->nullable()->comment('Data da solicitação');
            $table->timestamp('processed_at')->nullable()->comment('Data do processamento');
            $table->timestamps();

            // Foreign keys
            $table->foreign('transaction_id')->references('id')->on('mercadopago_transactions')->onDelete('cascade');
            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('set null');
            $table->foreign('requested_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('processed_by')->references('id')->on('users')->onDelete('set null');

            // Indexes
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
        Schema::dropIfExists('mercadopago_refunds');
    }
}
