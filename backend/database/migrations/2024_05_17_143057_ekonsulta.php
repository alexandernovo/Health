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
        Schema::create('ekonsulta', function (Blueprint $table) {
            $table->bigIncrements("ekonsultaId");
            $table->unsignedBigInteger("appointment_id");
            $table->unsignedBigInteger('user_id');
            $table->string('NHTSNo')->nullable();
            $table->string('NHTSClass')->nullable();
            $table->string('PHICNo')->nullable();
            $table->string('PHICClass')->nullable();
            $table->string('bodyLength')->nullable();
            $table->string('headCircumference')->nullable();
            $table->string('skinfoldThickness')->nullable();
            $table->string('weight')->nullable();
            $table->string('BMI')->nullable();
            $table->string('waistCircumference')->nullable();
            $table->string('midUpperArmCircumference')->nullable();
            $table->string('BP')->nullable();
            $table->string('RR')->nullable();
            $table->string('HR')->nullable();
            $table->string('PR')->nullable();
            $table->string('Temp')->nullable();
            $table->string('chiefComplaints')->nullable();
            $table->boolean('hospitalization')->default(false);
            $table->boolean('asthma')->default(false);
            $table->boolean('cancer')->default(false);
            $table->string('cancerSpecify')->nullable();
            $table->boolean('cerebrovascular')->default(false);
            $table->boolean('coronary')->default(false);
            $table->boolean('diabetes')->default(false);
            $table->boolean('minorsurgeries')->default(false);
            $table->boolean('emphysema')->default(false);
            $table->boolean('epilepsy')->default(false);
            $table->boolean('hepatitis')->default(false);
            $table->boolean('hyperlipidemia')->default(false);
            $table->boolean('hypertension')->default(false);
            $table->boolean('pepticUlcer')->default(false);
            $table->boolean('COPD')->default(false);
            $table->boolean('pneumonia')->default(false);
            $table->boolean('thyroid')->default(false);
            $table->boolean('UTI')->default(false);
            $table->boolean('TB')->default(false);
            $table->string('TBSpecify')->nullable();
            $table->boolean('ifPTB')->default(false);
            $table->string('ifPTBSpecify')->nullable();
            $table->boolean('Others')->default(false);
            $table->string('operation1')->nullable();
            $table->datetime('operationDate1')->nullable();
            $table->string('operation2')->nullable();
            $table->datetime('operationDate2')->nullable();
            $table->string('operationDate2')->nullable();
            $table->string('visualAcuity')->nullable();
            $table->string('basicHearingTest')->nullable();
            $table->string('cervicalCancerScreeningDone')->nullable();
            $table->string('prostateCancerScreeningDone')->nullable();
            $table->string('hivAidsScreeningDone')->nullable();
            $table->string('developmentalAndMentalEvaluation')->nullable();
            $table->boolean('expandedNewbornScreening')->default(false);
            $table->boolean('CBC2')->default(false);
            $table->boolean('bloodType')->default(false);
            $table->string('bloodTypeSpecify')->nullable();
            $table->boolean('FBS')->default(false);
            $table->boolean('sputumMicroscopy')->default(false);
            $table->boolean('slitSkinSmear')->default(false);
            $table->boolean('totalCholesterol')->default(false);
            $table->boolean('hdlCholesterol')->default(false);
            $table->boolean('serumandBun')->default(false);
            $table->boolean('routineUrinalysis')->default(false);
            $table->boolean('katoKatz')->default(false);
            $table->boolean('rapidPlasma')->default(false);
            $table->boolean('igmAndIgG')->default(false);
            $table->boolean('nonStructure')->default(false);
            $table->boolean('hepaB')->default(false);
            $table->boolean('fecalysis')->default(false);
            $table->boolean('malarialSmear')->default(false);
            $table->boolean('nucleicAndAmplification')->default(false);
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
        //
    }
};
