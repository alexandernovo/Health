<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PostPartrum;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NewBorn extends Model
{
    protected $primaryKey = 'newBornId';
    protected $table = 'newborndelivery';
    protected $fillable = [
        'user_id',
        'appointment_id',
        'infantsName',
        'dateTimeDelivery',
        'infantsSex',
        'lengthAtBirth',
        'infantWeight',
        'newBornScreeningCode',
        'Presentation',
        'dateOfNewBornScreening',
        'dateAndTimeOfDischarge',
        'APGARScore',
        'uterusPosition',
        'size',
        'shape',
        'adnexae',
        'laceration',
        'discharge',  
        'specify',
    ];
    public function postpartrum(): HasMany
    {
        return $this->hasMany(PostPartrum::class, 'newBornId');
    }
}
