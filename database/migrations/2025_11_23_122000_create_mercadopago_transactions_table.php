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
        Schema::create('mercadopago_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('booking_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->integer('event_id');
            $table->string('payment_id')->unique();
            $table->enum('status', ['pending', 'approved', 'rejected', 'cancelled', 'refunded', 'in_process'])->default('pending');
            $table->string('status_detail')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('BRL');
            $table->string('payment_method_type');
            $table->integer('installments')->default(1);
            $table->string('payer_email');
            $table->string('payer_name');
            $table->string('payer_document')->nullable();
            $table->string('merchant_order_id')->nullable();
            $table->string('notification_id')->nullable();
            $table->boolean('webhook_received')->default(false);
            $table->json('webhook_data')->nullable();
            $table->unsignedBigInteger('refund_id')->nullable();
            $table->decimal('refund_amount', 10, 2)->nullable();
            $table->string('refund_status')->nullable();
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('payment_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mercadopago_transactions');
    }
};
