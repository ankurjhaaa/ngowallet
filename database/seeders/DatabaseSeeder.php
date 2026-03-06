<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'nickname' => 'Admin',
                'phone' => '7763972896',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Normal User',
                'nickname' => 'Normal',
                'phone' => '2222222222',
                'password' => Hash::make('password'),
                'role' => 'user',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Member User',
                'nickname' => 'Member',
                'phone' => '3333333333',
                'password' => Hash::make('password'),
                'role' => 'member',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('plans')->insert([
            ['name' => 'Basic', 'yearly_amount' => 3000, 'duration_years' => 1],
            ['name' => 'Standard', 'yearly_amount' => 4000, 'duration_years' => 1],
            ['name' => 'Premium', 'yearly_amount' => 5000, 'duration_years' => 1],
        ]);

        DB::table('settings')->insert([
            ['key' => 'ngo_name', 'value' => 'Bazm-e-Haidri', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'ngo_email', 'value' => 'info@bazm-e-haidri.org', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'ngo_phone', 'value' => '+91 90000 00000', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'ngo_address', 'value' => 'NGO Address, City, State, India', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
