<?php

namespace App\Models;

use TCG\Voyager\Models\DataRow as BaseDataRow;

class DataRow extends BaseDataRow
{
    /**
     * Cast the details column to object automatically
     * This fixes the "Undefined array key 0" error when Voyager tries to access
     * $row->details->width or other properties
     */
    protected $casts = [
        'details' => 'object',
    ];
}
