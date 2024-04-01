<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ConsultationTypeController;

Route::prefix('users')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/getUsers', [UserController::class, 'getUsers']);
    Route::put('/updateUser/{id}', [UserController::class, 'updateUser']);
    Route::put('/activation/{id}/{status}', [UserController::class, 'activation']);
});

Route::prefix('consultation')->group(function () {
    Route::post('/addconsultation', [ConsultationTypeController::class, 'createConsultationType']);
    Route::get('/getconsultation', [ConsultationTypeController::class, 'getConsultationTypes']);
    Route::put('/updateconsultation/{id}', [ConsultationTypeController::class, 'updateConsultationType']);
    Route::put('/activation/{id}/{status}', [ConsultationTypeController::class, 'activation']);
});



//remove routes
// php artisan route:list | Where-Object { $_ -notmatch "/api" } 
//add routes
// php artisan route:list --path=api