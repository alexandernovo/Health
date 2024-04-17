<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ConsultationTypeController;
use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\API\MaternalRecordController;
use App\Http\Controllers\API\RecordController;

Route::prefix('users')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/getUsers', [UserController::class, 'getUsers']);
    Route::get('/getPatients', [UserController::class, 'getPatients']);
    Route::get('/getUserById/{id}', [UserController::class, 'getUserById']);
    Route::put('/updateUser/{id}', [UserController::class, 'updateUser']);
    Route::put('/activation/{id}/{status}', [UserController::class, 'activation']);
});

Route::prefix('consultation')->group(function () {
    Route::post('/addconsultation', [ConsultationTypeController::class, 'createConsultationType']);
    Route::get('/getconsultation', [ConsultationTypeController::class, 'getConsultationTypes']);
    Route::get('/getConsultationsActive', [ConsultationTypeController::class, 'getConsultationTypesActive']);
    Route::put('/updateconsultation/{id}', [ConsultationTypeController::class, 'updateConsultationType']);
    Route::put('/activation/{id}/{status}', [ConsultationTypeController::class, 'activation']);
});

Route::prefix('appointment')->group(function () {
    Route::post('/createappointment', [AppointmentController::class, 'createAppointment']);
    Route::get('/getAppointments/{status}', [AppointmentController::class, 'getAppointments']);
    Route::get('/getAppointmentById/{id}', [AppointmentController::class, 'getAppointmentById']);
    Route::post('/changeAppointmentStatus/{id}/{status}', [AppointmentController::class, 'changeAppointmentStatus']);
});

Route::prefix('maternal')->group(function () {
    Route::post('/createMaternalRecord', [MaternalRecordController::class, 'createMaternalRecord']);
    Route::get('/getUserMaternalRecord/{user_id}', [MaternalRecordController::class, 'getUserMaternalRecord']);
    Route::get('/getMaternalOneRecord/{appointment_id}', [MaternalRecordController::class, 'getMaternalOneRecord']);
    Route::put('/updateMaternalRecords', [MaternalRecordController::class, 'updateMaternalRecords']);
});

Route::prefix('record')->group(function () {
    Route::get('/getUserWithRecord', [RecordController::class, 'getUserWithRecord']);
    Route::get('/getUserRecord/{id}', [RecordController::class, 'getUserRecord']);
});




//  remove routes
//  php artisan route:list | Where-Object { $_ -notmatch "/api" } 
//  add routes
//  after you add routes add this command
//  php artisan route:list --path=api