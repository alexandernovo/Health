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
        Schema::create('appointment_logs', function (Blueprint $table) {
            $table->bigIncrements("appointmentlogs_id");
            $table->integer("appointment_id");
            $table->integer("user_id");
            $table->string("status_desc");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_logs');
    }
};
// php artisan migrate --path=database/migrations/2025_01_19_154918_create_appointment_logs.php
