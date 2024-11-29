<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConsultationTypeSeeder extends Seeder
{
    /**
     * php artisan db:seed --class=ConsultationTypeSeeder
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('consultationtype')->insert([
            [
                'consultationTypeName' => 'Check-up',
                'consultationTypeStatus' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'consultationTypeName' => 'Immunization',
                'consultationTypeStatus' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'consultationTypeName' => 'Vaccination',
                'consultationTypeStatus' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'consultationTypeName' => 'Hypertensive/Diabetic',
                'consultationTypeStatus' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'consultationTypeName' => 'Family Planning',
                'consultationTypeStatus' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'consultationTypeName' => 'Newborn Delivery Record',
                'consultationTypeStatus' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'consultationTypeName' => 'Maternal Health Records',
                'consultationTypeStatus' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
