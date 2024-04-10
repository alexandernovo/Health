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
        Schema::create('medical_assessment_models', function (Blueprint $table) {
            $table->bigIncrements("medicalAssessmentID");
            $table->unsignedBigInteger('maternal_id');
            $table->date('Date')->nullable();
            $table->string('BP')->nullable();
            $table->string('HR')->nullable();
            $table->integer('AOG')->nullable();
            $table->string('RR')->nullable();
            $table->integer('FH')->nullable();
            $table->integer('WT')->nullable();
            $table->integer('TEMP')->nullable();
            $table->boolean('FHBPres')->default(false);
            $table->string('Remarks')->nullable();
            $table->timestamps();

            $table->foreign('maternal_id')->references('maternal_id')->on('maternal_records');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_assessment_models');
    }
};


// php artisan migrate --path=database/migrations/2024_04_10_053407_medicalassessment.php
// php artisan migrate:rollback --path=database/migrations/2024_04_10_053407_medicalassessment.php