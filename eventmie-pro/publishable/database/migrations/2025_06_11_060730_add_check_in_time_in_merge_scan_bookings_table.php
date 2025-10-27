<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('merge_scan_bookings', function (Blueprint $table) {
            $table->time('check_in_time')->nullable()->after('event_start_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('merge_scan_bookings', function (Blueprint $table) {
            $table->dropColumn('check_in_time');
        });
    }
};
