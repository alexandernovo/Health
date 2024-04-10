<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Maternal;

class MedicalAssessment extends Model
{
    protected $primaryKey = 'medicalAssessmentID';
    protected $table = 'medical_assessment_models';
    protected $fillable = [
        'maternal_id',
        'Date',
        'BP',
        'HR',
        'AOG',
        'RR',
        'FH',
        'WT',
        'TEMP',
        'FHBPres',
        'Remarks',
    ];

    public function maternal(): BelongsTo
    {
        return $this->belongsTo(Maternal::class, 'maternal_id');
    }
}
