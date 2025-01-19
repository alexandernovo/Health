<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AppointmentLogs extends Model
{
    protected $primaryKey = 'appointmentlogs_id';
    protected $table = 'appointment_logs';
    protected $fillable = [
        'appointment_id',
        'user_id',
        'status_desc'
    ];
}
