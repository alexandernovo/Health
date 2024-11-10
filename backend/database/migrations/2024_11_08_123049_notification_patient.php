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
        Schema::create('notification', function (Blueprint $table) {
            $table->bigIncrements("notification_id");
            $table->integer("sender");
            $table->integer("receiver");
            $table->string("notif_type");
            $table->integer("id_redirect");
            $table->string('message')->nullable();
            $table->timestamps();
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
    // php artisan migrate --path=database/migrations/2024_11_08_123049_notification_patient.php
    // php artisan migrate:rollback --path=database/migrations/2024_11_08_123049_notification_patient.php