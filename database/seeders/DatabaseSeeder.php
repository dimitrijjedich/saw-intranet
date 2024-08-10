<?php

namespace Database\Seeders;

use App\Models\Picture;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(10)->create();

         User::factory()->create([
             'name' => 'Admin',
             'email' => 'admin@admin.com',
             'password' => bcrypt('password'),
         ]);

         Quote::factory(5)->create();

         Picture::factory(5)->create();
    }
}
