<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ImmunizationResult extends Model
{
    protected $primaryKey = 'immunizationResultId';
    protected $table = 'immunizationResult';
    
    protected $fillable = [
        'immunizationId',
        'ageInMos',
        'weightA',
        'weightN',
    ];
    
}
