<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('blockUser', 'blockUser');
    Route::post('unblockUser', 'unblockUser');
    Route::get('me', 'me');
    Route::get('getUsers', 'getUsers');
    Route::get('getBlockedUsers', 'getBlockedUsers');
    
    Route::post('editProfile', 'editProfile');
});