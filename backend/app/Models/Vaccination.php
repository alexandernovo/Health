<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vaccination extends Model
{
    protected $primaryKey = 'vaccinationId';
    protected $table = 'vaccination';
    protected $fillable = [
        'appointment_id',
        'user_id',
        'seniorCitizen',
        'Diabetes',
        'Hypertension',
        'BloodType',
        'Allergies',
        'nameOfVaccinator60',
        'dateVaccinated60',
        'nameOfVaccinator65',
        'dateVaccinated65',
        'emergencyName',
        'emergencyContact',
    ];

    public function othervaccines(): HasMany
    {
        return $this->hasMany(OtherVaccines::class, 'vaccinationId');
    }
}
