<?php

use App\Product;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Factory::create();

        $now = Carbon::now()->toDateTimeString();

        for ($j = 1; $j <= 13; $j++) {

            for ($i = 1; $i <= 10; $i++) {
                $Product = Product::create([
                    'name' => $faker->sentence,
                    'slug' => $faker->sentence,
                    'description' => $faker->paragraph(mt_rand(10, 20)),
                    'price' => $faker->numberBetween($min = 100, $max = 1000),
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
                $Product->brands()->attach(rand(1, 5));
                $Product->categories()->attach($j, ['parent_id' => $j]);
            }
        }

    }
}
