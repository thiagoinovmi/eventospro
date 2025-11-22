<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventKitItem extends Model
{
    protected $table = 'event_kit_items';

    protected $fillable = [
        'event_id',
        'kit_id',
        'kit_item_id',
        'image',
    ];

    /**
     * Relacionamento com Event
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Relacionamento com Kit
     */
    public function kit()
    {
        return $this->belongsTo(Kit::class);
    }

    /**
     * Relacionamento com KitItem
     */
    public function kitItem()
    {
        return $this->belongsTo(KitItem::class, 'kit_item_id');
    }
}
