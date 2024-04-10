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
        Schema::create('appointments', function (Blueprint $table) {
            $table->bigIncrements("appointment_id");
            $table->unsignedBigInteger('consultationTypeId');
            $table->unsignedBigInteger('user_id');
            $table->date('appointmentDate');
            $table->time('appointmentTime');
            $table->integer('appointmentStatus');
            $table->integer('isActive');
            $table->timestamps();

            $table->foreign('consultationTypeId')->references('consultationTypeId')->on('consultationtype');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};

//php artisan migrate --path=database/migrations/2024_04_02_135001_appointments.php
// php artisan migrate:rollback --path=database/migrations/2024_04_02_135001_appointments.php

