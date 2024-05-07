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
            $table->boolean('VitK')->default(false);
            $table->boolean('eyeOintment')->default(false);
            $table->boolean('hepaAtBirth')->default(false);
            $table->boolean('BCG')->default(false);
            $table->boolean('Penta1')->default(false);
            $table->boolean('Penta2')->default(false);
            $table->boolean('Penta3')->default(false);
            $table->boolean('opv1')->default(false);
            $table->boolean('opv2')->default(false);
            $table->boolean('opv3')->default(false);
            $table->boolean('ipv')->default(false);
            $table->boolean('pcv1')->default(false);
            $table->boolean('pcv2')->default(false);
            $table->boolean('pcv3')->default(false);
            $table->boolean('mv0')->default(false);
            $table->boolean('mv1')->default(false);
            $table->boolean('mv2')->default(false);
            $table->boolean('fic')->default(false);
            $table->boolean('grade1Td')->default(false);
            $table->boolean('MR')->default(false);
            $table->boolean('grade4Hpv1')->default(false);
            $table->boolean('hpv2')->default(false);
            $table->boolean('grade7Td')->default(false);
            $table->boolean('pneumonia1')->default(false);
            $table->boolean('pneumonia2')->default(false);
            $table->boolean('pneumonia3')->default(false);
            $table->boolean('pneumonia4')->default(false);
            $table->boolean('pneumonia5')->default(false);
            $table->boolean('flu1')->default(false);
            $table->boolean('flu2')->default(false);
            $table->boolean('flu3')->default(false);
            $table->boolean('flu4')->default(false);
            $table->boolean('flu5')->default(false);
            $table->boolean('tt1')->default(false);
            $table->boolean('tt2')->default(false);
            $table->boolean('tt3')->default(false);
            $table->boolean('tt4')->default(false);
            $table->boolean('tt5')->default(false);
            $table->boolean('rabiesImmunization1')->default(false);
            $table->boolean('rabiesImmunization2')->default(false);
            $table->boolean('rabiesImmunization3')->default(false);
            $table->boolean('rabiesImmunization4')->default(false);
            $table->boolean('initiatedBreastFeeding')->default(false);
            $table->boolean('mixedFeeding')->default(false);
            $table->boolean('initiatedComplementaryFeeding')->default(false);
            $table->boolean('vitAat6To11Mos')->default(false);
            $table->boolean('vitAat12To59Mos')->default(false);
            $table->boolean('deworming12To23Mos')->default(false);
            $table->boolean('deworming24To59Mos')->default(false);
            $table->boolean('deworming5To9YO')->default(false);
            $table->boolean('deworming10To19YO')->default(false);
            $table->boolean('ferrousSulfate')->default(false);
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