<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixDataRowsDetails extends Command
{
    protected $signature = 'fix:data-rows-details {--data-type-id=1}';
    protected $description = 'Fix malformed JSON in data_rows details column';

    public function handle()
    {
        $dataTypeId = $this->option('data-type-id');
        
        $rows = DB::table('data_rows')
            ->where('data_type_id', $dataTypeId)
            ->get();

        $fixed = 0;
        $errors = 0;

        foreach ($rows as $row) {
            try {
                // Try to decode the details
                $details = json_decode($row->details, true);
                
                // If it's null or not valid JSON, reset to empty object
                if ($details === null && $row->details !== '{}' && $row->details !== '[]') {
                    $this->warn("Row ID {$row->id} ({$row->field}): Invalid JSON detected. Resetting to empty object.");
                    DB::table('data_rows')
                        ->where('id', $row->id)
                        ->update(['details' => '{}']);
                    $fixed++;
                } else {
                    // Re-encode to ensure consistency
                    $reencoded = json_encode($details ?? new \stdClass());
                    if ($reencoded !== $row->details) {
                        DB::table('data_rows')
                            ->where('id', $row->id)
                            ->update(['details' => $reencoded]);
                        $this->info("Row ID {$row->id} ({$row->field}): Details re-encoded for consistency.");
                        $fixed++;
                    }
                }
            } catch (\Exception $e) {
                $this->error("Row ID {$row->id} ({$row->field}): Error - " . $e->getMessage());
                $errors++;
            }
        }

        $this->info("\nSummary:");
        $this->info("Fixed: {$fixed}");
        $this->info("Errors: {$errors}");
    }
}
