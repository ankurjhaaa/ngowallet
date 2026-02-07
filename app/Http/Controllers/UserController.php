<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function home()
    {
        return Inertia::render('public/home');
    }
    public function programs()
    {
        return Inertia::render('public/programs');
    }
    public function vision()
    {
        return Inertia::render('public/vision');
    }
    public function join()
    {
        return Inertia::render('public/join');
    }
    public function login()
    {
        return Inertia::render('auth/login');
    }
    public function signup()
    {
        return Inertia::render('auth/signup');
    }
    public function forgotPassword()
    {
        return Inertia::render('auth/forgotpassword');
    }
}
