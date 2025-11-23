<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMercadopagoSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mercadopago_settings', function (Blueprint $table) {
            $table->id();
            $table->text('access_token')->nullable()->comment('Token de acesso criptografado');
            $table->text('public_key')->nullable()->comment('Chave pública criptografada');
            $table->text('webhook_token')->nullable()->comment('Token do webhook criptografado');
            $table->string('webhook_url')->nullable()->comment('URL para receber webhooks');
            $table->enum('mode', ['test', 'production'])->default('test')->comment('Modo de operação');
            $table->boolean('enabled')->default(false)->comment('Integração habilitada');
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
        Schema::dropIfExists('mercadopago_settings');
    }
}
