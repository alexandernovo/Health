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
        Schema::create('immunizationResult', function (Blueprint $table) {
            $table->bigIncrements("immunizationResultId");
            $table->unsignedBigInteger("immunizationId");
            $table->number('ageInMos')->nullable();
            $table->number('weightA')->nullable();
            $table->number('weightN')->nullable();
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('immunizationId')->references('immunizationId')->on('immunization');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('immunizationResult');
    }
};

// php artisan migrate --path=database/migrations/2024_05_07_005825_immunization_result.php
// php artisan migrate:rollback --path=database/migrations/2024_05_07_005825_immunization_result.php