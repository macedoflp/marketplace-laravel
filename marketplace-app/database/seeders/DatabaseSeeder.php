<?php

namespace Database\Seeders;

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

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        \App\Models\User::factory()->create([
                'name' => 'Vendedor Teste',
                'email' => 'admin@admin.com',
            ]);

            $categories = ['Eletrônicos', 'Roupas', 'Livros', 'Casa', 'Esportes'];
            foreach ($categories as $cat) {
                \App\Models\Category::create([
                    'name' => $cat,
                    'slug' => \Illuminate\Support\Str::slug($cat)
                ]);
            }

            \App\Models\Product::factory(50)->create();

    }
}