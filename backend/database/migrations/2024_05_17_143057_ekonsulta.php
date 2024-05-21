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
            $table->string('allergy')->nullable();
            $table->string('disability')->nullable();
            $table->string('drug')->nullable();
            $table->string('handicap')->nullable();
            $table->string('impairment')->nullable();
            $table->string('smoking')->nullable();
            $table->integer('number_of_sticks')->nullable();
            $table->string('alcohol')->nullable();
            $table->integer('number_of_bottles')->nullable();
            $table->string('illicit_drugs')->nullable();
            $table->string('no_of_packs')->nullable();
            $table->boolean('skinPallor')->default("false");
            $table->boolean('skinRashes')->default("false");
            $table->boolean('skinJaundice')->default("false");
            $table->boolean('skinGoodSkinTurgor')->default("false");
            $table->boolean('heentAnicteric')->default("false");
            $table->boolean('heentIntactTympanic')->default("false");
            $table->boolean('heentExudates')->default("false");
            $table->boolean('heentPupils')->default("false");
            $table->boolean('heentTonsil')->default("false");
            $table->boolean('heentAuralDischarge')->default("false");
            $table->boolean('heentNasalDischarge')->default("false");
            $table->boolean('heentPalpableMass')->default("false");
            $table->boolean('chestSymmetrical')->default("false");
            $table->boolean('chestClearBreath')->default("false");
            $table->boolean('chestRetractions')->default("false");
            $table->boolean('chestCrackles')->default("false");
            $table->boolean('chestWheeze')->default("false");
            $table->boolean('heartAdynamic')->default("false");
            $table->boolean('heartMurmurs')->default("false");
            $table->boolean('heartNormalRate')->default("false");
            $table->boolean('heartHeaves')->default("false");
            $table->boolean('abdomenFlat')->default("false");
            $table->boolean('abdomenGlobular')->default("false");
            $table->boolean('abdomenFlabby')->default("false");
            $table->boolean('abdomenMuscleGuarding')->default("false");
            $table->boolean('abdomenTenderness')->default("false");
            $table->boolean('abdomenPalpableMass')->default("false");
            $table->boolean('extremetiesGrossDeformity')->default("false");
            $table->boolean('extremetiesNormalGait')->default("false");
            $table->boolean('extremetiesFullEqualPulse')->default("false");
            $table->boolean('neurologicalNormal')->default("false");
            $table->boolean('neurologicalDevelopmental')->default("false");
            $table->boolean('neurologicalSeizures')->default("false");
            $table->boolean('neurologicalMotorDeficit')->default("false");
            $table->boolean('neurologicalSensoryDeficit')->default("false");
            $table->string('diagnosis')->nullable();
            $table->string('treatment')->nullable();
            $table->string('healthcareProvider')->nullable();
            $table->string('administeredBy')->nullable();
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
