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
        Schema::create('consultationtype', function (Blueprint $table) {
            $table->bigIncrements("consultationTypeId");
            $table->string('consultationTypeName');
            $table->integer('consultationTypeStatus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultationtype');
    }
};


//php artisan migrate --path=database/migrations/2024_03_30_041804_consultation_type.php
// php artisan migrate:rollback --path=database/migrations/2024_03_30_041804_consultation_type.php
