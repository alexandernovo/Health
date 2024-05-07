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
        Schema::create('immunization', function (Blueprint $table) {
            $table->bigIncrements("immunizationId");
            $table->unsignedBigInteger("appointment_id");
            $table->unsignedBigInteger('user_id');
            $table->string('VitK')->nullable();
            $table->string('eyeOintment')->nullable();
            $table->string('hepaAtBirth')->nullable();
            $table->string('BCG')->nullable();
            $table->string('Penta1')->nullable();
            $table->string('Penta2')->nullable();
            $table->string('Penta3')->nullable();
            $table->string('opv1')->nullable();
            $table->string('opv2')->nullable();
            $table->string('opv3')->nullable();
            $table->string('ipv')->nullable();
            $table->string('pcv1')->nullable();
            $table->string('pcv2')->nullable();
            $table->string('pcv3')->nullable();
            $table->string('mv0')->nullable();
            $table->string('mv1')->nullable();
            $table->string('mv2')->nullable();
            $table->string('fic')->nullable();
            $table->string('grade1Td')->nullable();
            $table->string('MR')->nullable();
            $table->string('grade4Hpv1')->nullable();
            $table->string('hpv2')->nullable();
            $table->string('grade7Td')->nullable();
            $table->string('pneumonia1')->nullable();
            $table->string('pneumonia2')->nullable();
            $table->string('pneumonia3')->nullable();
            $table->string('pneumonia4')->nullable();
            $table->string('pneumonia5')->nullable();
            $table->string('flu1')->nullable();
            $table->string('flu2')->nullable();
            $table->string('flu3')->nullable();
            $table->string('flu4')->nullable();
            $table->string('flu5')->nullable();
            $table->string('tt1')->nullable();
            $table->string('tt2')->nullable();
            $table->string('tt3')->nullable();
            $table->string('tt4')->nullable();
            $table->string('tt5')->nullable();
            $table->string('rabiesImmunization1')->nullable();
            $table->string('rabiesImmunization2')->nullable();
            $table->string('rabiesImmunization3')->nullable();
            $table->string('rabiesImmunization4')->nullable();
            $table->string('initiatedBreastFeeding')->nullable();
            $table->string('mixedFeeding')->nullable();
            $table->string('initiatedComplementaryFeeding')->nullable();
            $table->string('vitAat6To11Mos')->nullable();
            $table->string('vitAat12To59Mos')->nullable();
            $table->string('deworming12To23Mos')->nullable();
            $table->string('deworming24To59Mos')->nullable();
            $table->string('deworming5To9YO')->nullable();
            $table->string('deworming10To19YO')->nullable();
            $table->string('ferrousSulfate')->nullable();
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
        Schema::dropIfExists('immunization');
    }
};

// php artisan migrate --path=database/migrations/2024_05_07_003358_immunization.php
// php artisan migrate:rollback --path=database/migrations/2024_05_07_003358_immunization.php