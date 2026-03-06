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
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy');
    Route::get('/account-deletion', 'accountDeletion')->name('account-deletion');
    Route::get('/login', 'login')->name('login');
    Route::get('/signup', 'signup')->name('signup');
    Route::get('/forgot-password', 'forgotPassword')->name('forgotpassword');
    Route::get('/profile', 'profile')->name('profile')->middleware('auth');
    Route::post('/profile_update', 'profile_update')->name('profile_update')->middleware('auth');
    Route::get('/profile/plan/{planId}/pdf', 'planPdf')->name('profile.plan.pdf')->middleware('auth');
});

Route::controller(AdminController::class)->middleware(['auth', 'role:admin'])->name('admin.')->prefix('admin')->group(function () {
    Route::get('/dashboard', 'dashboard')->name('dashboard');
    Route::get('/plans', 'plans')->name('plans');
    Route::get('/userdetail/{id}', 'userdetail')->name('userdetail');
    Route::post('/assign-plan/{plan_id}/{user_id}', 'assignPlan')->name('assignplan');
    Route::post('/add-payment/{user_id}', 'addPayment')->name('addpayment');
    Route::get('/expense', 'expense')->name('expense');
    Route::post('/add-expenses', 'addexpense')->name('addexpense');
    Route::get('/transactions', 'transactions')->name('transactions');
    Route::post('/transactions/{payment}/send-message', 'sendMembershipMessage')->name('transactions.sendmessage'); 
    Route::get('/add-member-page', 'addmemberpage')->name('addmemberpage');
    Route::post('/add-member', 'addmember')->name('addmember');


    Route::get('/programs', 'programs')->name('programs');
    Route::get('/users', 'users')->name('users');
    Route::get('/settings', 'settings')->name('settings');
    Route::post('/settings', 'updateSettings')->name('settings.update');
    Route::get('/reports', 'reports')->name('reports');

    // Plan CRUD
    Route::post('/plans', 'storePlan')->name('storeplan');
    Route::put('/plans/{id}', 'updatePlan')->name('updateplan');
    Route::delete('/plans/{id}', 'destroyPlan')->name('destroyplan');

    // User Edit + Password
    Route::put('/user/{id}', 'updateUser')->name('updateuser');
    Route::put('/user/{id}/password', 'updateUserPassword')->name('updateuserpassword');

    // User Plan PDF
    Route::get('/userdetail/{userId}/plan/{planId}/pdf', 'userPlanPdf')->name('userplan.pdf');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login_post', 'login_post')->name('login_post');
    Route::post('/signup_post', 'signup_post')->name('signup_post');
    Route::post('/logout', 'logout')->name('logout');
});