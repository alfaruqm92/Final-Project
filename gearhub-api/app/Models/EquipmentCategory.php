<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentCategory extends Model
{
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
    ];

    public function equipments()
    {
        return $this->hasMany(Equipment::class, 'id');
    }
}
