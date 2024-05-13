<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Appointment;
use App\Models\Maternal;
use App\Models\NewBorn;
use App\Models\FamilyPlanning;
use App\Models\Vaccination;
use App\Models\Hypertensive;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'username',
        'password',
        'usertype',
        'birthdate',
        'education',
        'occupation',
        'religion',
        'civil_status',
        'contact_number',
        'address',
        'region',
        'reg_code',
        'province',
        'prov_code',
        'municipality',
        'mun_code',
        'brgy',
        'gender',
        'userstatus'
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'username' => $this->username,
            'usertype' => $this->usertype,
        ];
    }

    public function maternal(): HasMany
    {
        return $this->hasMany(Maternal::class);
    }
    public function newborn(): HasMany
    {
        return $this->hasMany(NewBorn::class);
    }

    public function family(): HasMany
    {
        return $this->hasMany(FamilyPlanning::class);
    }
    public function appointment(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    public function hypertensive(): HasMany
    {
        return $this->hasMany(Hypertensive::class);
    }

    public function vaccination(): HasMany
    {
        return $this->hasMany(Vaccination::class);
    }

    public function immunization(): HasMany
    {
        return $this->hasMany(Immunization::class);
    }
}
