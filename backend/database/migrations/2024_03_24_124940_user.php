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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('username')->unique();
            $table->string('password');
            $table->integer('usertype');
            $table->integer('userstatus');
            $table->date('birthdate');
            $table->string('education');
            $table->string('civil_status');
            $table->string('occupation');
            $table->string('contact_number');
            $table->string('address')->nullable();
            $table->string('region')->nullable();
            $table->string('reg_code')->nullable();
            $table->string('province')->nullable();
            $table->string('prov_code')->nullable();
            $table->string('municipality')->nullable();
            $table->string('mun_code')->nullable();
            $table->string('brgy')->nullable();
            $table->string('religion');
            $table->string('gender');
            $table->string('position')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

//reset
//php artisan migrate:rollback
//php artisan migrate --path=database/migrations/2024_03_24_124940_user.php
// php artisan migrate:rollback --path=database/migrations/2024_03_24_124940_user.php
//migrate
//php artisan migrate
//php artisan migrate:reset
