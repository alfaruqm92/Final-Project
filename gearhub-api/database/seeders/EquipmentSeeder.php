<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        $camera = DB::table('equipment_categories')
            ->where('name', 'Camera')
            ->value('id');

        $lens = DB::table('equipment_categories')
            ->where('name', 'Lens')
            ->value('id');

        $accessory = DB::table('equipment_categories')
            ->where('name', 'Accessory')
            ->value('id');

        DB::table('equipments')->insert([
            // Cameras
            [
                'category_id' => $camera,
                'brand' => 'SONY',
                'model' => 'A7 IV',
                'unit_number' => 'CAM-SONY-A7IV-001',
                'year' => 2021,
                'price_per_day' => 250000,
                'status' => 'available',
                'image' => 'sony-a7-iv.jpg',
                'description' => 'Full-frame mirrorless camera suitable for photography and professional video production.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $camera,
                'brand' => 'SONY',
                'model' => 'A7S III',
                'unit_number' => 'CAM-SONY-A7SIII-001',
                'year' => 2020,
                'price_per_day' => 300000,
                'status' => 'available',
                'image' => 'sony-a7s-iii.jpg',
                'description' => 'Full-frame camera designed for high-quality video production and low-light shooting.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $camera,
                'brand' => 'CANON',
                'model' => 'EOS R6 Mark II',
                'unit_number' => 'CAM-CANON-R6II-001',
                'year' => 2022,
                'price_per_day' => 300000,
                'status' => 'booked',
                'image' => 'canon-r6-mark-ii.jpg',
                'description' => 'Versatile full-frame mirrorless camera for photography and video.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $camera,
                'brand' => 'CANON',
                'model' => 'EOS R5',
                'unit_number' => 'CAM-CANON-R5-001',
                'year' => 2020,
                'price_per_day' => 350000,
                'status' => 'available',
                'image' => 'canon-r5.jpg',
                'description' => 'High-resolution full-frame mirrorless camera for professional photography.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $camera,
                'brand' => 'FUJIFILM',
                'model' => 'X-T5',
                'unit_number' => 'CAM-FUJI-XT5-001',
                'year' => 2022,
                'price_per_day' => 200000,
                'status' => 'available',
                'image' => 'fujifilm-x-t5.jpg',
                'description' => 'Compact APS-C mirrorless camera with excellent image quality and classic controls.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $camera,
                'brand' => 'NIKON',
                'model' => 'Z6 III',
                'unit_number' => 'CAM-NIKON-Z6III-001',
                'year' => 2024,
                'price_per_day' => 350000,
                'status' => 'maintenance',
                'image' => 'nikon-z6-iii.jpg',
                'description' => 'Full-frame mirrorless camera designed for demanding photography and video work.',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Lenses
            [
                'category_id' => $lens,
                'brand' => 'SONY',
                'model' => 'FE 24-70mm F2.8 GM II',
                'unit_number' => 'LEN-SONY-2470GM2-001',
                'year' => 2022,
                'price_per_day' => 200000,
                'status' => 'available',
                'image' => 'sony-24-70-gm-ii.jpg',
                'description' => 'Professional standard zoom lens suitable for portraits, events, and commercial photography.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $lens,
                'brand' => 'CANON',
                'model' => 'RF 50mm F1.2L',
                'unit_number' => 'LEN-CANON-RF50-001',
                'year' => 2018,
                'price_per_day' => 180000,
                'status' => 'available',
                'image' => 'canon-rf-50mm.jpg',
                'description' => 'Fast prime lens with excellent low-light performance and beautiful background blur.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $lens,
                'brand' => 'SIGMA',
                'model' => '35mm F1.4 DG DN',
                'unit_number' => 'LEN-SIGMA-35DGDN-001',
                'year' => 2021,
                'price_per_day' => 150000,
                'status' => 'booked',
                'image' => 'sigma-35mm.jpg',
                'description' => 'Wide-aperture prime lens suitable for portraits, street photography, and video.',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Accessories
            [
                'category_id' => $accessory,
                'brand' => 'DJI',
                'model' => 'RS 3 Pro',
                'unit_number' => 'ACC-DJI-RS3PRO-001',
                'year' => 2022,
                'price_per_day' => 175000,
                'status' => 'available',
                'image' => 'dji-rs-3-pro.jpg',
                'description' => 'Professional camera gimbal designed for smooth and stable video production.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $accessory,
                'brand' => 'RODE',
                'model' => 'Wireless GO II',
                'unit_number' => 'ACC-RODE-WGOII-001',
                'year' => 2021,
                'price_per_day' => 100000,
                'status' => 'available',
                'image' => 'rode-wireless-go-ii.jpg',
                'description' => 'Compact wireless microphone system for interviews, content creation, and video production.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $accessory,
                'brand' => 'GODOX',
                'model' => 'V1 Flash',
                'unit_number' => 'ACC-GODOX-V1-001',
                'year' => 2019,
                'price_per_day' => 75000,
                'status' => 'available',
                'image' => 'godox-v1.jpg',
                'description' => 'Round-head camera flash suitable for portrait and event photography.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
