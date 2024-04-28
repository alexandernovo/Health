<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FamilyAssessment extends Model
{
    protected $primaryKey = 'familyAssessmentId';
    protected $table = 'familyAssessment';
    protected $fillable = [
        'familyId',
        'dateOfVisit',
        'methodAccepted',
        'nameAndSignatureSP',
        'dateFollowUp',
        'medicalFindings'
    ];
}
