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
        Schema::create('mercadopago_settings', function (Blueprint $table) {
            $table->id();
            $table->text('access_token')->nullable();
            $table->text('public_key')->nullable();
            $table->enum('mode', ['test', 'production'])->default('test');
            $table->string('webhook_url')->nullable();
            $table->string('webhook_token')->nullable();
            $table->boolean('enabled')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mercadopago_settings');
    }
};
