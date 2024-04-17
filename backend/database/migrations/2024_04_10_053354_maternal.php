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
        Schema::create('maternal_records', function (Blueprint $table) {
            $table->bigIncrements("maternal_id");
            $table->unsignedBigInteger('appointment_id');
            $table->unsignedBigInteger('user_id');
            $table->string('fNo')->nullable();
            $table->string('philhealth')->nullable();
            $table->string('husbandName')->nullable();
            $table->date('husbandbirthdate')->nullable();
            $table->integer('husbandage')->nullable();
            $table->string('husbandAddress')->nullable();
            $table->string('husbandEducation')->nullable();
            $table->string('husbandOccupation')->nullable();
            $table->date('dateofmarriage')->nullable();
            $table->date('dateAdmitted')->nullable();
            $table->date('dateDischarge')->nullable();
            $table->string('timeAdmitted')->nullable();
            $table->string('timeDischarge')->nullable();
            $table->boolean('pastPTB')->default(false);
            $table->boolean('pastHeartDisease')->default(false);
            $table->boolean('pastDiabetes')->default(false);
            $table->boolean('pastAsthma')->default(false);
            $table->boolean('pastGoiter')->default(false);
            $table->boolean('familyHistoryPTB')->default(false);
            $table->boolean('familyHistoryHeartDisease')->default(false);
            $table->boolean('familyHistoryDiabetes')->default(false);
            $table->boolean('familyHistoryHypertension')->default(false);
            $table->boolean('familyHistoryGoiter')->default(false);
            $table->string('LMP')->nullable();
            $table->string('EDC')->nullable();
            $table->string('GRAVIDA')->nullable();
            $table->string('PARA')->nullable();
            $table->string('OBScore')->nullable();
            $table->boolean('below18ORabove35')->default(false);
            $table->boolean('pregnancyMore4')->default(false);
            $table->boolean('poorObstetrical')->default(false);
            $table->boolean('Below2YearsBirthInterval')->default(false);
            $table->boolean('lessThan145cm')->default(false);
            $table->boolean('moreThan145cm')->default(false);
            $table->boolean('antePostPartrum')->default(false);
            $table->boolean('prematureLabor')->default(false);
            $table->boolean('abnormalPresentation')->default(false);
            $table->boolean('preEnclampsia')->default(false);
            $table->boolean('STD')->default(false);
            $table->boolean('TT1')->default(false);
            $table->boolean('TT2')->default(false);
            $table->boolean('TT3')->default(false);
            $table->boolean('TT4')->default(false);
            $table->boolean('TT5')->default(false);
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
        Schema::dropIfExists('maternal_records');
    }
};

// php artisan migrate --path=database/migrations/2024_04_10_053354_maternal.php
// php artisan migrate:rollback --path=database/migrations/2024_04_10_053354_maternal.php
