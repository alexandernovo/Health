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
        Schema::create('hypertensive', function (Blueprint $table) {
            $table->bigIncrements("hypertensiveId");
            $table->unsignedBigInteger("appointment_id");
            $table->unsignedBigInteger('user_id');
            $table->boolean('amlodipine')->nullable();
            $table->boolean('losartan')->nullable();
            $table->boolean('metroprolol')->nullable();
            $table->boolean('simvastatin')->nullable();
            $table->boolean('gliclazide')->nullable();
            $table->boolean('metformin')->nullable();
            $table->boolean('insulin')->nullable();
            $table->boolean('others')->nullable();
            $table->string('othersDescription')->nullable();
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
        Schema::dropIfExists('hypertensive');
    }
};


    // php artisan migrate --path=database/migrations/2024_05_03_122814_hypertensive.php
    // php artisan migrate:rollback --path=database/migrations/2024_05_03_122814_hypertensive.php
