<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentCategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('equipment_categories')->insert([
            [
                'name' => 'Camera',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lens',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Accessory',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
