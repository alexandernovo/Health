<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultationType extends Model
{
    protected $primaryKey = 'consultationTypeId';
    protected $table = 'consultationtype';
    protected $fillable = [
        'consultationTypeName',
        'consultationTypeStatus',
    ];
}
