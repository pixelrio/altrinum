<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Tenant;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Tenant::create([
            'name' => 'Default Tenant',
            'subdomain' => 'utoronto.ca'
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'tenant_id' => 1
        ]);



        Event::factory()->count(50)->create();
    }
}
