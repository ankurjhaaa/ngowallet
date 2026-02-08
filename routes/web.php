<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::controller(UserController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/programs', 'programs')->name('programs');
    Route::get('/vision', 'vision')->name('vision');
    Route::get('/join', 'join')->name('join');
    Route::get('/login', 'login')->name('login');
    Route::get('/signup', 'signup')->name('signup');
    Route::get('/forgot-password', 'forgotPassword')->name('forgotpassword');
});

Route::controller(AdminController::class)->middleware(['auth','role:admin'])->name('admin.')->prefix('admin')->group(function () {
    Route::get('/dashboard', 'dashboard')->name('dashboard');
    Route::get('/plans', 'plans')->name('plans');
    Route::get('/userdetail/{id}', 'userdetail')->name('userdetail');
    Route::post('/assign-plan/{plan_id}/{user_id}', 'assignPlan')->name('assignplan');
    Route::post('/add-payment/{user_id}', 'addPayment')->name('addpayment');



    Route::get('/programs', 'programs')->name('programs');
    Route::get('/users', 'users')->name('users');
    Route::get('/settings', 'settings')->name('settings');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login_post', 'login_post')->name('login_post');
    Route::post('/signup_post', 'signup_post')->name('signup_post');
    Route::post('/logout', 'logout')->name('logout');
});