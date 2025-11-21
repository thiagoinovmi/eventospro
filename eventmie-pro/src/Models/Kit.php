<?php

namespace Classiebit\Eventmie\Models;

use Illuminate\Database\Eloquent\Model;

class Kit extends Model
{
    protected $guarded = [];

    protected $casts = [
        'status' => 'boolean',
    ];

    /**
     * Get the items for the kit.
     */
    public function items()
    {
        return $this->hasMany(KitItem::class)->orderBy('order');
    }

    /**
     * Get the events that have this kit.
     */
    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_kit');
    }

    /**
     * Get active kits
     */
    public function scopeActive($query)
    {
        return $query->where('status', true);
    }
}
