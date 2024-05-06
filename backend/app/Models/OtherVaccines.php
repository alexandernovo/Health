<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtherVaccines extends Model
{
    protected $primaryKey = 'otherVaccinesId';
    protected $table = 'otherVaccines';
    protected $fillable = [
        'vaccinationId',
        'otherType',
        'otherDateGiven',
        'otherRemarks',
    ];
}
