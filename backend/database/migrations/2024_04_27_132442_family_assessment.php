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
        Schema::create('familyAssessment', function (Blueprint $table) {
            $table->bigIncrements("familyAssessmentId");
            $table->unsignedBigInteger('familyId');
            $table->datetime('dateOfVisit')->nullable();
            $table->string('methodAccepted')->nullable();
            $table->string('nameAndSignatureSP')->nullable();
            $table->string('dateFollowUp')->nullable();
            $table->string('medicalFindings')->nullable();
            $table->timestamps();

            $table->foreign('familyId')->references('familyId')->on('familyplanning');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('familyAssessment');
    }

    // php artisan migrate --path=database/migrations/2024_04_27_132442_family_assessment.php
    // php artisan migrate:rollback --path=database/migrations/2024_04_27_132442_family_assessment.php
};
