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
        Schema::create('event_kit_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('event_id');
            $table->unsignedBigInteger('kit_id');
            $table->unsignedBigInteger('kit_item_id');
            $table->string('image')->nullable();
            $table->timestamps();
            
            // Foreign keys
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->foreign('kit_id')->references('id')->on('kits')->onDelete('cascade');
            $table->foreign('kit_item_id')->references('id')->on('kit_items')->onDelete('cascade');
            
            // Unique constraint
            $table->unique(['event_id', 'kit_id', 'kit_item_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_kit_items');
    }
};
