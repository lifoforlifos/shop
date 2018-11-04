<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Factory;
use App\Brand;

class BrandsTableSeeder extends Seeder
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

        Brand::insert([
            ['brand_name' => $faker->sentence, 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['brand_name' => $faker->sentence, 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['brand_name' => $faker->sentence, 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['brand_name' => $faker->sentence, 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
            ['brand_name' => $faker->sentence, 'image' => '1 - Copy', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
