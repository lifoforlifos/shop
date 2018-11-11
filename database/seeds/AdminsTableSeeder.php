<?php

use App\Brand;
use App\Category;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now()->toDateTimeString();

        Admin::insert([
            ['name' => "abdel", 'email' => "fouhamtrance@gmail.com", 'password' => bcrypt('djtrancerboy'), 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
