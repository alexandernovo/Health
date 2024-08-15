<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    protected $primaryKey = 'userlog_id';
    protected $table = 'userlog';
    protected $fillable = [
        'user_id',
        'logstatus',
    ];
}
