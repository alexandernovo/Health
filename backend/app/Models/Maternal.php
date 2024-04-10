<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Appointment;

class Maternal extends Model
{
    protected $primaryKey = 'maternal_id';
    protected $table = 'maternal_records';
    protected $fillable = [
        'appointment_id',
        'user_id',
        'husbandName',
        'husbandbirthdate',
        'husbandage',
        'dateofmarriage',
        'dateAdmitted',
        'dateDischarge',
        'pastPTB',
        'pastHeartDisease',
        'pastDiabetes',
        'pastAsthma',
        'pastGoiter',
        'familyHistoryPTB',
        'familyHistoryHeartDisease',
        'familyHistoryDiabetes',
        'familyHistoryHypertension',
        'familyHistoryGoiter',
        'LMP',
        'EDC',
        'GRAVIDA',
        'PARA',
        'OBScore',
        'below18ORabove35',
        'pregnancyMore4',
        'poorObstetrical',
        'Below2YearsBirthInterval',
        'lessThan145cm',
        'moreThan145cm',
        'antePostPartrum',
        'prematureLabor',
        'abnormalPresentation',
        'preEnclampsia',
        'STD',
        'TT1',
        'TT2',
        'TT3',
        'TT4',
        'TT5',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
}
