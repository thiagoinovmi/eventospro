<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventPaymentMethodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_id')->comment('ID do evento');
            $table->unsignedBigInteger('payment_method_id')->comment('ID do método de pagamento');
            $table->boolean('enabled')->default(true)->comment('Método habilitado para este evento');
            $table->boolean('installments_enabled')->default(false)->comment('Parcelamento habilitado');
            $table->integer('max_installments')->default(1)->comment('Máximo de parcelas para este evento');
            $table->timestamps();

            // Foreign keys
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->foreign('payment_method_id')->references('id')->on('mercadopago_payment_methods')->onDelete('cascade');

            // Unique constraint
            $table->unique(['event_id', 'payment_method_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_payment_methods');
    }
}
