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
        Schema::create('otherVaccines', function (Blueprint $table) {
            $table->bigIncrements("otherVaccinesId");
            $table->unsignedBigInteger("vaccinationId");
            $table->string('otherType')->nullable();
            $table->datetime('otherDateGiven')->nullable();
            $table->string('otherRemarks')->nullable();
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('vaccinationId')->references('vaccinationId')->on('vaccination');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('otherVaccines');
    }
};


    // php artisan migrate --path=database/migrations/2024_05_05_115159_other_vaccines.php
    // php artisan migrate:rollback --path=database/migrations/2024_05_05_115159_other_vaccines.php