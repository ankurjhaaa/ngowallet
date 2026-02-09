<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Spend;
use App\Models\User;
use App\Models\UserPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ApiController extends Controller
{
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:100',
            'mobile' => 'required|digits:10|unique:users,phone',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $validator->errors()->first(),
            ], 422);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'phone' => $request->mobile,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                "status" => true,
                "message" => "Signup success",
                "user" => $user,
                "token" => $token
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ], 500);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|string',
            'password' => 'required|string',
            'expo_push_token' => 'string|required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $validator->errors()->first(),
            ]);
        }
        try {
            $user = User::where('phone', $request->mobile)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'mobile' => ['Invalid mobile or password']
                ]);
            }
            if ($request->has('role') && $user->role !== $request->role) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access for the specified role',
                ], 403);
            }
            $user->tokens()->delete();
            $token = $user->createToken('auth_token')->plainTextToken;
            $user->expo_push_token = $request->expo_push_token;
            $user->save();
            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user,
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ]);
        }

    }
    public function logout(Request $request)
    {
        try {

            $user = $request->user();

            if ($user && $user->currentAccessToken()) {
                $user->currentAccessToken()->delete();
            }
            if ($user && $user->expo_push_token) {
                $user->expo_push_token = null;
                $user->save();
            }

            return response()->json([
                'status' => true,
                'message' => 'Logged out successfully',
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }



    public function profile(Request $request)
    {
        try {
            $user = $request->user();
            return response()->json([
                "status" => true,
                "message" => "user profile fetched successfully",
                "data" => $user,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ]);
        }
    }
    public function editProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:100',
            'email' => 'required|email',
            'password' => 'nullable|min:6',
            'address' => 'nullable|min:6',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'profile_picture' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => $validator->errors()->first(),
            ], 422);
        }
        try {
            $user = $request->user();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->address = $request->address;
            $user->date_of_birth = $request->date_of_birth;
            $user->gender = $request->gender;

            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);

            }
            $user->save();
            return response()->json([
                "status" => true,
                "message" => "profile edit successfully",
                "user" => $user
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ]);

        }
    }

    public function user_plan(Request $request, $user_id)
    {
        try {
            $userPlans = UserPlan::with('plan')
                ->where('user_id', $user_id)
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
        } catch (\Throwable $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ]);
        }
        return response()->json([
            "status" => true,
            "message" => "user plans fetched successfully",
            "data" => $userPlans,
        ]);
    }

    public function stats(Request $request)
    {
        try {
            $fund_raised = Payment::sum('amount');
            $totalSpent = Spend::sum('amount');
            $totalBalance = $fund_raised - $totalSpent;
            $totalDoner = User::whereHas('userPlans.payments', function ($query) {
                $query->where('amount', '>', 0);
            })->count();
            return response()->json([
                "status" => true,
                "message" => "stats fetched successfully",
                "data" => [
                    'fund_raised' => $fund_raised,
                    'totalSpent' => $totalSpent,
                    'totalBalance' => $totalBalance,
                    'totalDoner' => $totalDoner,
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                "status" => false,
                "message" => $e->getMessage()
            ]);
        }
    }

}
