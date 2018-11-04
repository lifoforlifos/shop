<?php

use App\Brand;
use App\Category;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now()->toDateTimeString();
        $faker = Factory::create();

        Category::insert([
            ['name' => "Women 's Collection", 'slug' => str_replace(' ', '-', "Women's Collection"), 'category_id' => null, 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Dresses", 'slug' => str_replace(' ', '-', "Dresses"), 'category_id' => "1", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Blouses", 'slug' => str_replace(' ', '-', "Blouses"), 'category_id' => "1", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "T-shirts", 'slug' => str_replace(' ', '-', "T-shirts"), 'category_id' => "1", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Rompers", 'slug' => str_replace(' ', '-', "Rompers"), 'category_id' => "1", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Bras", 'slug' => str_replace(' ', '-', "Bras"), 'category_id' => "1", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Men's Collection", 'slug' => str_replace(' ', '-', "Men's Collection"), 'category_id' => null, 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "T-Shirts", 'slug' => str_replace(' ', '-', "T-Shirts"), 'category_id' => "7", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Polo", 'slug' => str_replace(' ', '-', "Polo"), 'category_id' => "7", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Shirts", 'slug' => str_replace(' ', '-', "Shirts"), 'category_id' => "7", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Jackets", 'slug' => str_replace(' ', '-', "Jackets"), 'category_id' => "7", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Trench", 'slug' => str_replace(' ', '-', "Trench"), 'category_id' => "7", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Kid's Collection", 'slug' => str_replace(' ', '-', "Kid's Collection"), 'category_id' => null, 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Dresses", 'slug' => str_replace(' ', '-', "Dresses"), 'category_id' => "13", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Shirts", 'slug' => str_replace(' ', '-', "Shirts"), 'category_id' => "13", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "T-shirts", 'slug' => str_replace(' ', '-', "T-shirts"), 'category_id' => "13", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Jackets", 'slug' => str_replace(' ', '-', "Jackets"), 'category_id' => "13", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['name' => "Trench", 'slug' => str_replace(' ', '-', "Trench"), 'category_id' => "13", 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
