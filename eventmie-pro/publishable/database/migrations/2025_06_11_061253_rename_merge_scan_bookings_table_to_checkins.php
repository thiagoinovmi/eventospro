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
        Schema::rename('merge_scan_bookings', 'checkins');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('checkins', 'merge_scan_bookings');
    }
}; 