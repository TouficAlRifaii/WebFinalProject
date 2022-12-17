<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ArticlesController;
use Illuminate\Support\Facades\Route;

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
    Route::controller(CategoryController::class)->group(function () {
        Route::get("getCategories" , "getCategories");
        Route::post("createCategory" , "createCategory");
        Route::post("updateCategory" , "updateCategory");
        Route::post("deleteCategory", "deleteCategory");
    });
    Route::controller(ArticlesController::class)->group(function (){
        Route::post("createArticle" , "createArticle");
        Route::post("updateArticle" , "updateArticle");
        Route::get("getArticles/{id?}" , "getArticles");
    });
});
