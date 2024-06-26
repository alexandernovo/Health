<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\FamilyAssessment;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FamilyPlanning extends Model
{
    protected $primaryKey = 'familyId';
    protected $table = 'familyplanning';
    protected $fillable = [
        'appointment_id',
        'user_id',
        'clientId',
        'philhealth',
        'NHTS',
        'pantawid4ps',
        'spouseName',
        'spouseDateofBirth',
        'spouseAge',
        'spouseOccupation',
        'noLivingChildren',
        'planToHaveMoreChildren',
        'averageIncome',
        'typeOfClient',
        'typeCurrentUser',
        'typeReason',
        'methodUsed',
        'medicalHeadache',
        'medicalhistoryStroke',
        'medicalHematoma',
        'medicalBreastCancer',
        'medicalsevereChestPain',
        'medicalcough14Days',
        'medicalJaundice',
        'medicalVaginalBleeding',
        'medicalVaginalDischarge',
        'medicalIntake',
        'medicalClientSmoker',
        'medicalDisability',
        'disabilitySpecify',
        'numberPregnanciesG',
        'numberPregnanciesP',
        'fullItem',
        'premature',
        'abortion',
        'livingChildren',
        'dateLastDelivery',
        'typeOfLastDelivery',
        'lastMenstrualPeriod',
        'previousMenstrualPeriod',
        'menstrualFlow',
        'dysmenorrhea',
        'hydatidiform',
        'historyEctopicPregnancy',
        'abnormalDischarge',
        'indicateGenital',
        'scoresOrUlcer',
        'painOrBurningSensation',
        'historySexuallyTransmitted',
        'HivAids',
        'unPleasantRelationshipPartner',
        'partnerDoesNotApprove',
        'VAW',
        'referedTo',
        'referedToOther',
        'skin',
        'extremities',
        'conjunctiva',
        'pelvicExamination',
        'cervicalAbnormal',
        'cervicalConsistency',
        'uterinePosition',
        'uterineDepth',
        'neck',
        'breast',
        'abdomen',
        'babyLessThan6Months',
        'abstain',
        'babyLessThan4Weeks',
        'menstrualPast7Days',
        'abortionPast7Days',
        'usingContraceptives'
    ];

    public function familyassessment(): HasMany
    {
        return $this->hasMany(FamilyAssessment::class, 'familyId');
    }
}
