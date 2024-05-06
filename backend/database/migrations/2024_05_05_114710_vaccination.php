<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vaccination', function (Blueprint $table) {
            $table->bigIncrements("vaccinationId");
            $table->unsignedBigInteger("appointment_id");
            $table->unsignedBigInteger('user_id');
            $table->boolean('seniorCitizen')->nullable();
            $table->boolean('Diabetes')->nullable();
            $table->boolean('Hypertension')->nullable();
            $table->string('BloodType')->nullable();
            $table->string('Allergies')->nullable();
            $table->string('emergencyName')->nullable();
            $table->string('emergencyContact')->nullable();
            $table->string('nameOfVaccinator60')->nullable();
            $table->string('dateVaccinated60')->nullable();
            $table->string('nameOfVaccinator65')->nullable();
            $table->string('dateVaccinated65')->nullable();
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('appointment_id')->references('appointment_id')->on('appointments');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vaccination');
    }
};


    // php artisan migrate --path=database/migrations/2024_05_05_114710_vaccination.php
    // php artisan migrate:rollback --path=database/migrations/2024_05_05_114710_vaccination.php