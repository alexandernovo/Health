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
        Schema::create('userlog', function (Blueprint $table) {
            $table->bigIncrements("userlog_id");
            $table->unsignedBigInteger("user_id");
            $table->string('logstatus')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('userlog');
    }
};

// php artisan migrate --path=database/migrations/2024_08_15_102139_user_log.php
// php artisan migrate:rollback --path=database/migrations/2024_08_15_102139_user_log.php
