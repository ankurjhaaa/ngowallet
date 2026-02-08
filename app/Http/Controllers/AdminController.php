<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use App\Models\UserPlan;
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
    public function userdetail($id)
    {
        $user = User::findOrFail($id);
        $userPlan = UserPlan::where('user_id', $id)->first();
        $payingAmount = UserPlan::where('user_id', $id)->sum('yearly_amount');
        $totalPaidLifetime = Payment::where('user_id', $id)->sum('amount');

        return Inertia::render('admin/userdetail', [
            'user' => $user,
            'plan' => $userPlan ? $userPlan->plan : 'null',
            'payments' => [],
            'stats' => [
                'payingAmount' => $payingAmount,
                'lifetimePaid' => $totalPaidLifetime,

            ],
            'ngo_plans' => Plan::all(),
            'due_plan' => UserPlan::with('plan')
                ->where('user_id', $id)
                ->where('status', 'due')
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
                })
        ]);
    }
    public function programs()
    {
        return Inertia::render('admin/programs');
    }
    public function users(Request $request)
    {
        $search = $request->search;
        $role = $request->role;

        $users = User::query()
            ->where('role', '!=', 'admin')

            // 🔍 SEARCH (DB LEVEL)
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($role && $role !== 'all', function ($query) use ($role) {
                $query->where('role', $role);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }
    public function assignPlan(Request $request, $plan_id, $user_id)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $plan = Plan::findOrFail($plan_id);

        // dd($plan_id);

        UserPlan::create([
            'user_id' => $user_id,
            'plan_id' => $plan_id,
            'start_date' => now(),
            'end_date' => now()->addYear(),
            'yearly_amount' => $plan->yearly_amount,
            'status' => 'due',
        ]);


        return redirect()->back()->with('success', 'Plan assigned successfully');
    }

    public function addPayment(Request $request, $user_id)
    {
        // dd($request->all());
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'plan_id' => 'required|exists:user_plans,id',
        ]);
        $payment = Payment::create([
            'user_id' => $user_id,
            'user_plan_id' => $request->plan_id,
            'amount' => $request->amount,
            'payment_date' => now(),
            'payment_mode' => 'cash',
        ]);
        $payingAmount = UserPlan::where('id', $request->plan_id)->value('yearly_amount');
        $totalPaid = Payment::where('user_plan_id', $request->plan_id)->sum('amount');
        if ($totalPaid >= $payingAmount) {
            UserPlan::where('id', $request->plan_id)->update(['status' => 'completed']);
        }

        return redirect()->back()->with('success', 'Payment added successfully');
    }



    public function settings()
    {
        return Inertia::render('admin/settings');
    }
}
