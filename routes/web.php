<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $name = 'John Doe';
    return Inertia::render('home', compact([$name => 'name']));
})->name('home');
Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');
