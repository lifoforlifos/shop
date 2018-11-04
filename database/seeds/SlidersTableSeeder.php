<?php

use App\Brand;
use App\Slider;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;

class SlidersTableSeeder extends Seeder
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

        Slider::insert([
            ['paragraph' => $faker->sentence, 'category_slug' => str_replace(' ', '-', "Women's Collection"), 'headline' => $faker->sentence, 'file' => 'bg-1.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['paragraph' => $faker->sentence, 'category_slug' => str_replace(' ', '-', "Men's Collection"), 'headline' => $faker->sentence, 'file' => 'bg-2.jpg', 'created_at' => $now, 'updated_at' => $now],
            ['paragraph' => $faker->sentence, 'category_slug' => str_replace(' ', '-', "Kid's Collection"), 'headline' => $faker->sentence, 'file' => 'bg-3.jpg', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
