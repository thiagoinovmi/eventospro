<?php

namespace App\Database\Schema;

use TCG\Voyager\Database\Schema\SchemaManager as BaseSchemaManager;

class SchemaManager extends BaseSchemaManager
{
    /**
     * Override describeTable to fix "Undefined array key 0" error
     * This happens when Voyager tries to process table columns
     */
    public static function describeTable($table, $connection = null)
    {
        try {
            return parent::describeTable($table, $connection);
        } catch (\ErrorException $e) {
            if (strpos($e->getMessage(), 'Undefined array key 0') !== false) {
                // Return empty array instead of crashing
                return collect([]);
            }
            throw $e;
        }
    }
}
