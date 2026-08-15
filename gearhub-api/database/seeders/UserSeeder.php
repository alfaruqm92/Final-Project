<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'user@gearhub.com'],
            [
                'name' => 'GearHub User',
                'password' => Hash::make('password123'),
                'role' => 'customer',
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@gearhub.com'],
            [
                'name' => 'GearHub Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );
    }
}
