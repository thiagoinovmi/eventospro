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
        Schema::table('checkins', function (Blueprint $table) {
            // Adicionar colunas faltantes que o TicketScannerController espera
            if (!Schema::hasColumn('checkins', 'event_id')) {
                $table->unsignedBigInteger('event_id')->nullable()->after('id');
            }
            
            if (!Schema::hasColumn('checkins', 'user_id')) {
                $table->unsignedBigInteger('user_id')->nullable()->after('event_id');
            }
            
            if (!Schema::hasColumn('checkins', 'event_start_date')) {
                $table->date('event_start_date')->nullable()->after('user_id');
            }
            
            if (!Schema::hasColumn('checkins', 'check_in_time')) {
                $table->time('check_in_time')->nullable()->after('event_start_date');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('checkins', function (Blueprint $table) {
            if (Schema::hasColumn('checkins', 'event_id')) {
                $table->dropColumn('event_id');
            }
            
            if (Schema::hasColumn('checkins', 'user_id')) {
                $table->dropColumn('user_id');
            }
            
            if (Schema::hasColumn('checkins', 'event_start_date')) {
                $table->dropColumn('event_start_date');
            }
            
            if (Schema::hasColumn('checkins', 'check_in_time')) {
                $table->dropColumn('check_in_time');
            }
        });
    }
};
