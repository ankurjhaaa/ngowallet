<?php

namespace App\Http\Controllers;

use App\Models\User;
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

            $request->user()->currentAccessToken()->delete();
            $request->user()->expo_push_token = null;
            $request->user()->save();
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

}
