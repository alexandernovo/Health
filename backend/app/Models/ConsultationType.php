<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultationType extends Model
{
    protected $primaryKey = 'consulationTypeId';
    protected $fillable = [
        'consulationTypeName',
        'consultationTypeStatus',
    ];
}
