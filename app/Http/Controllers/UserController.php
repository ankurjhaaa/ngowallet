<?php

namespace App\Http\Controllers;

use App\Models\UserPlan;
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
    public function profile()
    {
        $user = auth()->user();
        $userPlans = UserPlan::with('plan')
            ->where('user_id', auth()->id())
            ->latest()
            ->get()
            ->map(function ($up) {
                return [
                    'id' => $up->id,
                    'name' => $up->plan?->name,
                    'yearly_amount' => $up->yearly_amount,
                    'due_amount' => $up->dueAmount(),
                    'start_date' => $up->start_date,
                    'end_date' => $up->end_date,
                    'percentage_paid' => $up->yearly_amount > 0 ? round((($up->yearly_amount - $up->dueAmount()) / $up->yearly_amount) * 100) : 0,
                    'payments' => $up->payments()->latest()->get()->
                        map(function ($payment) {
                            return [
                                'amount' => $payment->amount,
                                'payment_date' => $payment->payment_date,
                                'payment_mode' => $payment->payment_mode,
                            ];
                        }),
                ];
            });
            // dd($userPlans);
        return Inertia::render('public/profile', [
            'user' => $user,
            'userPlans' => $userPlans,
        ]);
    }
}
