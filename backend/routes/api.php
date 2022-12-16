<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::group([
    'middleware' => ['api', 'cors'],
], function ($router) {
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::get('refresh', 'refresh');
    Route::post('blockUser', 'blockUser');
    Route::post('unblockUser', 'unblockUser');
    Route::get('me', 'me');
    Route::get('testGet', 'testGet');
    Route::get('getUsers', 'getUsers');
    Route::get('getBlockedUsers', 'getBlockedUsers');
    
    Route::post('editProfile', 'editProfile');
});
});