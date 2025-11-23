<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMercadopagoWebhooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mercadopago_webhooks', function (Blueprint $table) {
            $table->id();
            $table->string('event_type')->comment('Tipo de evento (payment.created, payment.updated, etc)');
            $table->string('resource_id')->nullable()->comment('ID do recurso');
            $table->json('payload')->comment('Dados do webhook');
            $table->boolean('processed')->default(false)->comment('Webhook processado');
            $table->text('error_message')->nullable()->comment('Mensagem de erro');
            $table->timestamps();

            // Indexes
            $table->index('event_type');
            $table->index('processed');
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
        Schema::dropIfExists('mercadopago_webhooks');
    }
}
