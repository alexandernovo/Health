<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostPartrum extends Model
{
    protected $primaryKey = 'postPartrumId';
    protected $table = 'postpartrum';
    protected $fillable = [
        'newBornId',
        'postPartrumDate',
        'bodyTemperature',
        'postPartrumBP',
        'postPartrumFundus',
        'breast',
        'Lochia',
        'postPartrumRemarks',
    ];
}
