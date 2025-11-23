<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMercadopagoPaymentMethodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mercadopago_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->enum('method_type', [
                'credit_card',
                'debit_card',
                'boleto',
                'pix',
                'mercadopago_wallet'
            ])->unique()->comment('Tipo de método de pagamento');
            $table->boolean('enabled')->default(true)->comment('Método habilitado');
            $table->string('display_name')->comment('Nome para exibição');
            $table->string('icon')->nullable()->comment('Classe Font Awesome');
            $table->text('description')->nullable()->comment('Descrição do método');
            $table->boolean('installments_enabled')->default(false)->comment('Parcelamento habilitado');
            $table->integer('max_installments')->default(1)->comment('Máximo de parcelas');
            $table->decimal('min_amount', 10, 2)->default(0)->comment('Valor mínimo');
            $table->decimal('max_amount', 10, 2)->nullable()->comment('Valor máximo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mercadopago_payment_methods');
    }
}
