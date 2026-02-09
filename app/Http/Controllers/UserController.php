<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Spend;
use App\Models\User;
use App\Models\UserPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function home()
    {
        $fund_raised = Payment::sum('amount');
        $totalSpent = Spend::sum('amount');
        $totalBalance = $fund_raised - $totalSpent;
        $totalDoner = User::whereHas('userPlans.payments', function ($query) {
            $query->where('amount', '>', 0);
        })->count();
        return Inertia::render('public/home', [
            'fund_raised' => $fund_raised,
            'totalSpent' => $totalSpent,
            'totalBalance' => $totalBalance,
            'totalDoner' => $totalDoner,
        ]);
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
    public function profile_update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'gender' => 'nullable|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string|max:500',
        ]);

        $user = Auth::user();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'gender' => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'address' => $request->address,
        ]);

        return redirect()->back()->with('success', 'Profile updated successfully');
    }
}
