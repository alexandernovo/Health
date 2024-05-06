<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
