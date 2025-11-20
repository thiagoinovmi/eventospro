<?php

namespace Classiebit\Eventmie\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;

class FixVoyagerBreadDataRows
{
    /**
     * Handle an incoming request.
     * This middleware ensures that data_rows details are properly decoded
     * before Voyager tries to access them, preventing "Undefined array key 0" errors.
     */
    public function handle($request, Closure $next)
    {
        // Only process BREAD edit requests
        if (strpos($request->path(), 'admin/bread') !== false) {
            try {
                // Get the table name from the request
                $table = $request->route('table') ?? null;
                
                if ($table) {
                    // Get the data_type_id for this table
                    $dataType = DB::table('data_types')
                        ->where('slug', $table)
                        ->first();
                    
                    if ($dataType) {
                        // Ensure all data_rows for this table have valid JSON in details
                        $rows = DB::table('data_rows')
                            ->where('data_type_id', $dataType->id)
                            ->get();
                        
                        foreach ($rows as $row) {
                            // Try to decode and re-encode to ensure consistency
                            try {
                                $details = json_decode($row->details, true);
                                if ($details === null && $row->details !== '{}' && $row->details !== '[]') {
                                    // Invalid JSON, reset to empty object
                                    DB::table('data_rows')
                                        ->where('id', $row->id)
                                        ->update(['details' => '{}']);
                                }
                            } catch (\Exception $e) {
                                // Silently handle any issues
                            }
                        }
                    }
                }
            } catch (\Exception $e) {
                // Silently handle any middleware errors
            }
        }

        return $next($request);
    }
}
