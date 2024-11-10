<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\ConsultationType;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Maternal;
use App\Models\Newborn;
use App\Models\FamilyPlanning;
use App\Models\Hypertensive;
use App\Models\Vaccination;
use App\Models\Immunization;
use App\Models\Ekonsulta;

class Appointment extends Model
{
    protected $primaryKey = 'appointment_id';
    protected $table = 'appointments';
    protected $fillable = [
        'user_id',
        'consultationTypeId',
        'appointmentDate',
        'appointmentTime',
        'appointmentStatus',
        'isActive',
        'appointmentRemarks'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function consultation(): BelongsTo
    {
        return $this->belongsTo(ConsultationType::class, 'consultationTypeId');
    }
    public function maternal(): HasMany
    {
        return $this->hasMany(Maternal::class, 'appointment_id');
    }
    public function newborn(): HasMany
    {
        return $this->hasMany(Newborn::class, 'appointment_id');
    }

    public function family(): HasMany
    {
        return $this->hasMany(FamilyPlanning::class, 'appointment_id');
    }

    public function hypertensive(): HasMany
    {
        return $this->hasMany(Hypertensive::class, 'appointment_id');
    }

    public function vaccination(): HasMany
    {
        return $this->hasMany(Vaccination::class, 'appointment_id');
    }

    public function immunization(): HasMany
    {
        return $this->hasMany(Immunization::class, 'appointment_id');
    }

    public function ekonsulta(): HasMany
    {
        return $this->hasMany(Ekonsulta::class, 'appointment_id');
    }

    public function familyplanning(): HasMany
    {
        return $this->hasMany(FamilyPlanning::class, 'appointment_id');
    }
}
