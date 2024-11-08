<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $primaryKey = 'notification_id';
    protected $table = 'notification';
    protected $fillable = [
        'sender',
        'receiver',
        'notif_type',
        'id_redirect',
        'message'
    ];
}
