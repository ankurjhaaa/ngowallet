<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $name = 'John Doe';
    return Inertia::render('public/home', compact([$name => 'name']));
})->name('home');
Route::get('/programs', function () {
    return Inertia::render('public/programs');
})->name('programs');
Route::get('/vision', function () {
    return Inertia::render('public/vision');
})->name('vision');
Route::get('/join', function () {
    return Inertia::render('public/join');
})->name('join');
Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');
Route::get('/signup', function () {
    return Inertia::render('auth/signup');
})->name('signup');
Route::get('/forgot-password', function () {
    return Inertia::render('auth/forgotpassword');
})->name('forgotpassword');
