<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hypertensive extends Model
{
    protected $primaryKey = 'hypertensiveId';
    protected $table = 'hypertensive';
    protected $fillable = [
        'appointment_id',
        'user_id',
        'amlodipine',
        'losartan',
        'metroprolol',
        'simvastatin',
        'gliclazide',
        'metformin',
        'insulin',
        'others',
        'othersDescription',
    ];
}
