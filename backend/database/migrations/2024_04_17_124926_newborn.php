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
        Schema::create('newborndelivery', function (Blueprint $table) {
            $table->bigIncrements("newBornId");
            $table->unsignedBigInteger('user_id');
            $table->string('infantsName')->nullable();
            $table->datetime('dateTimeDelivery')->nullable();
            $table->string('infantsSex')->nullable();
            $table->string('lengthAtBirth')->nullable();
            $table->string('infantWeight')->nullable();
            $table->string('newBornScreeningCode')->nullable();
            $table->date('dateOfNewBornScreening')->nullable();
            $table->datetime('dateAndTimeOfDischarge')->nullable();
            $table->string('APGARScore')->nullable();
            $table->string('Presentation')->nullable();
            $table->string('uterusPosition')->nullable();
            $table->string('size')->nullable();
            $table->string('shape')->nullable();
            $table->string('adnexae')->nullable();
            $table->string('laceration')->nullable();
            $table->string('discharge')->nullable();
            $table->string('specify')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newborndelivery');
    }
};
