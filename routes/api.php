<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(ApiController::class)->name('.api')->group(function () {
    Route::post('signup', 'signup')->name('signup');
    Route::post('login', 'login')->name('login');
    Route::post('/logout', 'logout')->name('logout');
    
    Route::get('/profile', 'profile')->name('profile');
    Route::post('/editprofile', 'editProfile')->name('editProfile');
    Route::get('/user_plan/{user_id}', 'user_plan')->name('user_plan');
    Route::get('/stats', 'stats')->name('stats');
});