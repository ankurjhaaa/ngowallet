<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('admin/dashboard');
    }
    public function plans()
    {
        return Inertia::render('admin/plans');
    }
    public function userdetail()
    {
        return Inertia::render('admin/userdetail');
    }
    public function programs()
    {
        return Inertia::render('admin/programs');
    }
    public function users()
    {
        return Inertia::render('admin/users');
    }
    public function settings()
    {
        return Inertia::render('admin/settings');
    }
}
