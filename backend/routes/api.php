<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;

Route::prefix('users')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/getUsers', [UserController::class, 'getUsers']);
    Route::put('/updateUser/{id}', [UserController::class, 'updateUser']);
    Route::put('/activation/{id}/{status}', [UserController::class, 'activation']);
});    



//remove routes
// php artisan route:list | Where-Object { $_ -notmatch "/api" } 
//add routes
// php artisan route:list --path=api