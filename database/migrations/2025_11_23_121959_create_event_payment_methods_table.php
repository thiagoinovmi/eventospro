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
        Schema::create('event_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->integer('event_id');
            $table->unsignedBigInteger('payment_method_id');
            $table->boolean('enabled')->default(true);
            $table->boolean('installments_enabled')->default(false);
            $table->integer('max_installments')->default(1);
            $table->timestamps();
            
            $table->foreign('payment_method_id')->references('id')->on('mercadopago_payment_methods')->onDelete('cascade');
            $table->unique(['event_id', 'payment_method_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_payment_methods');
    }
};
