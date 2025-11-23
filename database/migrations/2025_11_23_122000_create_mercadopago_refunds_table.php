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
        Schema::create('mercadopago_refunds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transaction_id');
            $table->unsignedBigInteger('booking_id')->nullable();
            $table->decimal('amount', 10, 2);
            $table->enum('reason', ['user_request', 'payment_error', 'duplicate', 'fraud', 'other'])->default('user_request');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('refund_id')->nullable();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('requested_by');
            $table->timestamp('requested_at');
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
            
            $table->foreign('transaction_id')->references('id')->on('mercadopago_transactions')->onDelete('cascade');
            $table->foreign('requested_by')->references('id')->on('users')->onDelete('cascade');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mercadopago_refunds');
    }
};
