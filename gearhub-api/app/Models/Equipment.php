<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipments';

    protected $primaryKey = 'id';

    protected $fillable = [
        'category_id',
        'brand',
        'model',
        'unit_number',
        'year',
        'price_per_day',
        'status',
        'image',
        'description',
    ];

    public function category()
    {
        return $this->belongsTo(EquipmentCategory::class, 'category_id', 'category_id');
    }

    public function bookings()
    {
        return $this->hasMany(
            Booking::class,
            'equipment_id',
            'equipment_id'
        );
    }

}
