<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Spend;
use App\Models\User;
use App\Models\UserPlan;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
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
    public function privacyPolicy()
    {
        return Inertia::render('public/privacy-policy');
    }
    public function accountDeletion()
    {
        return Inertia::render('public/account-deletion');
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
                    'pending_amount' => max(0,$up->dueAmount()),
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

    public function planPdf($planId)
    {
        $userPlan = UserPlan::with(['plan', 'payments', 'user'])
            ->where('user_id', auth()->id())
            ->where('id', $planId)
            ->firstOrFail();

        $payments = $userPlan->payments
            ->sortByDesc('payment_date')
            ->map(function ($payment) {
                return [
                    'amount' => $payment->amount,
                    'payment_date' => $payment->payment_date ? Carbon::parse($payment->payment_date)->format('d M Y') : '-',
                    'payment_mode' => $payment->payment_mode ?? '-',
                ];
            })
            ->values()
            ->toArray();

        $data = [
            'org_name' => 'Bazm-e-Haidri',
            'org_address' => 'NGO Address, City, State, India',
            'org_phone' => '+91 90000 00000',
            'org_email' => 'info@bazm-e-haidri.org',
            'receipt_no' => 'BH-PLAN-' . $userPlan->id,
            'user' => $userPlan->user,
            'plan_name' => $userPlan->plan?->name ?? 'Plan',
            'yearly_amount' => $userPlan->yearly_amount ?? 0,
            'total_paid' => $userPlan->totalPaid(),
            'due_amount' => max(0, $userPlan->dueAmount()),
            'start_date' => $userPlan->start_date ? Carbon::parse($userPlan->start_date)->format('d M Y') : '-',
            'end_date' => $userPlan->end_date ? Carbon::parse($userPlan->end_date)->format('d M Y') : '-',
            'issued_date' => now()->format('d M Y'),
            'payments' => $payments,
        ];

        $pdf = Pdf::loadView('pdf.plan-receipt', $data)->setPaper('a4');
        $filename = 'plan-' . $userPlan->id . '-statement.pdf';

        return $pdf->download($filename);
    }
}
