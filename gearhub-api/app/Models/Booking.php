<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Booking extends Model
{
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'equipment_id',
        'pickup_date',
        'return_date',
        'total_days',
        'total_price',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
