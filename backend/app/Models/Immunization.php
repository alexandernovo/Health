<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Immunization extends Model
{
    protected $primaryKey = 'immunizationId';
    protected $table = 'immunization';
    protected $fillable = [
        'appointment_id',
        'user_id',
        'VitK',
        'eyeOintment',
        'hepaAtBirth',
        'BCG',
        'Penta1',
        'Penta2',
        'Penta3',
        'opv1',
        'opv2',
        'opv3',
        'ipv',
        'pcv1',
        'pcv2',
        'pcv3',
        'mv0',
        'mv1',
        'mv2',
        'fic',
        'grade1Td',
        'MR',
        'grade4Hpv1',
        'hpv2',
        'grade7Td',
        'pneumonia1',
        'pneumonia2',
        'pneumonia3',
        'pneumonia4',
        'pneumonia5',
        'flu1',
        'flu2',
        'flu3',
        'flu4',
        'flu5',
        'tt1',
        'tt2',
        'tt3',
        'tt4',
        'tt5',
        'rabiesImmunization1',
        'rabiesImmunization2',
        'rabiesImmunization3',
        'rabiesImmunization4',
        'initiatedBreastFeeding',
        'mixedFeeding',
        'initiatedComplementaryFeeding',
        'vitAat6To11Mos',
        'vitAat12To59Mos',
        'deworming12To23Mos',
        'deworming24To59Mos',
        'deworming5To9YO',
        'deworming10To19YO',
        'ferrousSulfate'
    ];
    
}
