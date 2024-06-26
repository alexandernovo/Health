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
        Schema::create('postpartrum', function (Blueprint $table) {
            $table->bigIncrements("postPartrumId");
            $table->unsignedBigInteger('newBornId');
            $table->datetime('postPartrumDate')->nullable();
            $table->string('bodyTemperature')->nullable();
            $table->string('postPartrumBP')->nullable();
            $table->string('postPartrumFundus')->nullable();
            $table->string('breast')->nullable();
            $table->string('Lochia')->nullable();
            $table->string('postPartrumRemarks')->nullable();
            $table->timestamps();

            $table->foreign('newBornId')->references('newBornId')->on('newborndelivery');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postpartrum');
    }

    // php artisan migrate --path=database/migrations/2024_04_17_124940_postpartrum.php
    // php artisan migrate:rollback --path=database/migrations/2024_04_17_124940_postpartrum.php
};
