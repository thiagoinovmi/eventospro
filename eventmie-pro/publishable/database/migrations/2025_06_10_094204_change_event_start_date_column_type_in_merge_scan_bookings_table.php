<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class ChangeEventStartDateColumnTypeInMergeScanBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('merge_scan_bookings', function (Blueprint $table) {
            // First, create a temporary column
            $table->date('event_start_date_new')->nullable()->after('event_start_date');
        });

        // Convert existing data
        DB::table('merge_scan_bookings')->orderBy('id')->each(function ($record) {
            DB::table('merge_scan_bookings')
                ->where('id', $record->id)
                ->update([
                    'event_start_date_new' => Carbon::parse($record->event_start_date)->format('Y-m-d')
                ]);
        });

        Schema::table('merge_scan_bookings', function (Blueprint $table) {
            // Drop the old column
            $table->dropColumn('event_start_date');
            // Rename the new column
            $table->renameColumn('event_start_date_new', 'event_start_date');
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
            // First, create a temporary column
            $table->string('event_start_date_old')->nullable()->after('event_start_date');
        });

        // Convert existing data back
        DB::table('merge_scan_bookings')->orderBy('id')->each(function ($record) {
            DB::table('merge_scan_bookings')
                ->where('id', $record->id)
                ->update([
                    'event_start_date_old' => $record->event_start_date
                ]);
        });

        Schema::table('merge_scan_bookings', function (Blueprint $table) {
            // Drop the date column
            $table->dropColumn('event_start_date');
            // Rename the old column back
            $table->renameColumn('event_start_date_old', 'event_start_date');
        });
    }
} 