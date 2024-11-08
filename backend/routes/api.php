<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ConsultationTypeController;
use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\API\MaternalRecordController;
use App\Http\Controllers\API\RecordController;
use App\Http\Controllers\API\NewBornController;
use App\Http\Controllers\API\FamilyPlanningController;
use App\Http\Controllers\API\HypertensiveController;
use App\Http\Controllers\API\VaccinationController;
use App\Http\Controllers\API\ImmunizationController;
use App\Http\Controllers\API\PatientHistoryController;
use App\Http\Controllers\API\EkonsultaController;
use App\Http\Controllers\API\NotificationController;

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
    Route::get('/getAvailableStaff', [UserController::class, 'getAvailableStaff']);
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
    Route::put('/updateAppointment', [AppointmentController::class, 'updateAppointment']);
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


Route::prefix('newborn')->group(function () {
    Route::post('/createNewBornRecord', [NewBornController::class, 'createNewBornRecord']);
    Route::get('/getUserNewbornRecord/{user_id}', [NewBornController::class, 'getUserNewbornRecord']);
    Route::get('/getNewbornOneRecord/{appointment_id}', [NewBornController::class, 'getNewbornOneRecord']);
    Route::put('/updateNewbornRecord', [NewBornController::class, 'updateNewbornRecord']);
});


Route::prefix('family')->group(function () {
    Route::post('/createFamilyPlanning', [FamilyPlanningController::class, 'createFamilyPlanning']);
    Route::put('/updateFamilyPlanning', [FamilyPlanningController::class, 'updateFamilyPlanning']);
    Route::get('/getFamilyPlanningOne/{appointment_id}', [FamilyPlanningController::class, 'getFamilyPlanningOne']);
    Route::get('/getFamilyPlanningRecord/{user_id}', [FamilyPlanningController::class, 'getFamilyPlanningRecord']);
});

Route::prefix('hypertensive')->group(function () {
    Route::post('/createHypertensive', [HypertensiveController::class, 'createHypertensive']);
    Route::put('/updateHypertensive', [HypertensiveController::class, 'updateHypertensive']);
    Route::get('/getUserHypertensiveRecord/{user_id}', [HypertensiveController::class, 'getUserHypertensiveRecord']);
    Route::get('/getHypertensiveData/{appointment_id}', [HypertensiveController::class, 'getHypertensiveData']);
    Route::post('/getHypertensiveGroup', [HypertensiveController::class, 'getHypertensiveGroup']);
});

Route::prefix('vaccination')->group(function () {
    Route::post('/createVaccination', [VaccinationController::class, 'createVaccination']);
    Route::get('/getVaccinationOneRecord/{appointment_id}', [VaccinationController::class, 'getVaccinationOneRecord']);
    Route::get('/getVaccinationRecord/{user_id}', [VaccinationController::class, 'getVaccinationRecord']);
    Route::put('/updateVaccination', [VaccinationController::class, 'updateVaccination']);
});

Route::prefix('immunization')->group(function () {
    Route::post('/createImmunization', [ImmunizationController::class, 'createImmunization']);
    Route::put('/updateImmunization', [ImmunizationController::class, 'updateImmunization']);
    Route::get('/getImmunizationOneRecord/{appointment_id}', [ImmunizationController::class, 'getImmunizationOneRecord']);
    Route::get('/getUserImmunizationRecord/{user_id}', [ImmunizationController::class, 'getUserImmunizationRecord']);
});

Route::prefix('patient')->group(function () {
    Route::get('/getHistory/{user_id}', [PatientHistoryController::class, 'getHistory']);
});

Route::prefix('ekonsulta')->group(function () {
    Route::post('/createEkonsulta', [EkonsultaController::class, 'createEkonsulta']);
    Route::put('/updateEkonsulta', [EkonsultaController::class, 'updateEkonsulta']);
    Route::get('/getEkonsultaRecord/{user_id}', [EkonsultaController::class, 'getEkonsultaRecord']);
    Route::get('/getEkonsultaOne/{appointment_id}', [EkonsultaController::class, 'getEkonsultaOne']);
});

Route::prefix('notification')->group(function () {
    Route::get('/getNotification', [NotificationController::class, 'getNotification']);
});

//  remove routes
//  php artisan route:list | Where-Object { $_ -notmatch "/api" } 
//  add routes
//  after you add routes add this command
//  php artisan route:list --path=api
