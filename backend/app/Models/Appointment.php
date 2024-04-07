<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\ConsultationType;

class Appointment extends Model
{
    protected $primaryKey = 'appointmentId';
    protected $table = 'appointments';
    protected $fillable = [
        'user_id',
        'consultationTypeId',
        'appointmentDate',
        'appointmentTime',
        'appointmentStatus',
        'isActive'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function consultation(): BelongsTo
    {
        return $this->belongsTo(ConsultationType::class, 'consultationTypeId');
    }
}
