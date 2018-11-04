<?php

use App\Image;
use Illuminate\Database\Seeder;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Laptops
        for ($i = 1; $i <= 2000; $i++) {
            Image::create([
                'product_id' => $i,
                'file' => '1 - Copy (' . $i . ').jpg',
            ]);
        }

    }
}
