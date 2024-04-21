<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * php artisan db:seed --class=AdminSeeder
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'firstname' => 'Admin',
                'lastname' => 'Admin',
                'username' => 'admin',
                'password' => Hash::make('Admin'),
                'usertype' => 0,
                'birthdate' => '1990-01-01',
                'education' => 'Bachelor\'s Degree',
                'occupation' => 'Administrator',
                'civil_status' => 'Single',
                'contact_number' => '1234567890',
                'address' => 'Admin Address',
                'gender' => 'Male',
                'religion' => 'Roman Catholic',
                'userstatus' => 1,
            ]
        ]);
    }
}
