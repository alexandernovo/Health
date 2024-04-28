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
        Schema::create('familyplanning', function (Blueprint $table) {
            $table->bigIncrements("familyId");
            $table->unsignedBigInteger("appointment_id");
            $table->unsignedBigInteger('user_id');
            $table->string('clientId')->nullable();
            $table->string('philhealth')->nullable();
            $table->boolean('NHTS')->nullable();
            $table->boolean('pantawid4ps')->nullable();
            $table->string('spouseName')->nullable();
            $table->string('spouseDateofBirth')->nullable();
            $table->string('spouseAge')->nullable();
            $table->string('spouseOccupation')->nullable();
            $table->string('noLivingChildren')->nullable();
            $table->boolean('planToHaveMoreChildren')->nullable();
            $table->string('averageIncome')->nullable();
            $table->string('typeOfClient')->nullable();
            $table->string('typeCurrentUser')->nullable();
            $table->string('typeReason')->nullable();
            $table->string('methodUsed')->nullable();
            $table->boolean('medicalHeadache')->nullable();
            $table->boolean('medicalhistoryStroke')->nullable();
            $table->boolean('medicalHematoma')->nullable();
            $table->boolean('medicalBreastCancer')->nullable();
            $table->boolean('medicalsevereChestPain')->nullable();
            $table->boolean('medicalcough14Days')->nullable();
            $table->boolean('medicalJaundice')->nullable();
            $table->boolean('medicalVaginalBleeding')->nullable();
            $table->boolean('medicalVaginalDischarge')->nullable();
            $table->boolean('medicalIntake')->nullable();
            $table->boolean('medicalClientSmoker')->nullable();
            $table->boolean('medicalDisability')->nullable();
            $table->string('disabilitySpecify')->nullable();
            $table->integer('numberPregnanciesG')->nullable();
            $table->integer('numberPregnanciesP')->nullable();
            $table->string('fullItem')->nullable();
            $table->string('premature')->nullable();
            $table->string('abortion')->nullable();
            $table->string('livingChildren')->nullable();
            $table->datetime('dateLastDelivery')->nullable();
            $table->string('typeOfLastDelivery')->nullable();
            $table->datetime('lastMenstrualPeriod')->nullable();
            $table->datetime('previousMenstrualPeriod')->nullable();
            $table->string('menstrualFlow')->nullable();
            $table->boolean('dysmenorrhea')->nullable();
            $table->boolean('hydatidiform')->nullable();
            $table->boolean('historyEctopicPregnancy')->nullable();
            $table->boolean('abnormalDischarge')->nullable();
            $table->string('indicateGenital')->nullable();
            $table->boolean('scoresOrUlcer')->nullable();
            $table->boolean('painOrBurningSensation')->nullable();
            $table->boolean('historySexuallyTransmitted')->nullable();
            $table->boolean('HivAids')->nullable();
            $table->boolean('unPleasantRelationshipPartner')->nullable();
            $table->boolean('partnerDoesNotApprove')->nullable();
            $table->boolean('VAW')->nullable();
            $table->string('referedTo')->nullable();
            $table->string('referedToOther')->nullable();
            $table->string('skin')->nullable();
            $table->string('extremities')->nullable();
            $table->string('conjunctiva')->nullable();
            $table->string('pelvicExamination')->nullable();
            $table->string('cervicalAbnormal')->nullable();
            $table->string('cervicalConsistency')->nullable();
            $table->string('uterinePosition')->nullable();
            $table->string('uterineDepth')->nullable();
            $table->string('neck')->nullable();
            $table->string('breast')->nullable();
            $table->string('abdomen')->nullable();
            $table->boolean('babyLessThan6Months')->nullable();
            $table->boolean('abstain')->nullable();
            $table->boolean('babyLessThan4Weeks')->nullable();
            $table->boolean('menstrualPast7Days')->nullable();
            $table->boolean('abortionPast7Days')->nullable();
            $table->boolean('usingContraceptives')->nullable();
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
        Schema::dropIfExists('familyplanning');
    }
};


    // php artisan migrate --path=database/migrations/2024_04_25_135145_familyplanning.php
    // php artisan migrate:rollback --path=database/migrations/2024_04_25_135145_familyplanning.php
