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
        Schema::create('newborndelivery', function (Blueprint $table) {
            $table->bigIncrements("newBornId");
            $table->unsignedBigInteger("appointment_id");
            $table->unsignedBigInteger('user_id');
            $table->string('infantsName')->nullable();
            $table->datetime('dateTimeDelivery')->nullable();
            $table->string('infantsSex')->nullable();
            $table->string('lengthAtBirth')->nullable();
            $table->string('infantWeight')->nullable();
            $table->string('newBornScreeningCode')->nullable();
            $table->date('dateOfNewBornScreening')->nullable();
            $table->datetime('dateAndTimeOfDischarge')->nullable();
            $table->string('APGARScore')->nullable();
            $table->string('Presentation')->nullable();
            $table->string('uterusPosition')->nullable();
            $table->string('size')->nullable();
            $table->string('shape')->nullable();
            $table->string('adnexae')->nullable();
            $table->string('laceration')->nullable();
            $table->string('discharge')->nullable();
            $table->string('specify')->nullable();
            $table->timestamps();

            $table->foreign('appointment_id')->references('appointment_id')->on('appointments');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newborndelivery');
    }
};

// php artisan migrate --path=database/migrations/2024_04_17_124926_newborn.php
// php artisan migrate:rollback --path=database/migrations/2024_04_17_124926_newborn.php