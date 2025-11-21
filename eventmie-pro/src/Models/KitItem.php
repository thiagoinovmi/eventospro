<?php

namespace Classiebit\Eventmie\Models;

use Illuminate\Database\Eloquent\Model;

class KitItem extends Model
{
    protected $table = 'kit_items';
    protected $guarded = [];

    /**
     * Get the kit that owns this item.
     */
    public function kit()
    {
        return $this->belongsTo(Kit::class);
    }

    /**
     * Get the image attribute with full path
     */
    public function getImageAttribute($value)
    {
        if (checkPrefix()) {
            return asset('storage/' . $value);
        }

        return $value;
    }
}
