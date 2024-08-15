<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\UserLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh', 'logout']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('username', 'password');

        $token = Auth::guard('api')->attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Incorrect password or username',
            ]);
        }

        $user = Auth::guard('api')->user();
        UserLog::insert(['user_id' => $user['id'], 'logstatus' => 'login', 'created_at' => date('Y-m-d H:i:s')]);

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6',
            'region' => 'required|string',
            'province' => 'required|string',
            'municipality' => 'required|string',
            'brgy' => 'required|string',
            'civil_status' => 'required',
            'gender' => 'required|string',
            'contact_number' => ['required', 'string', 'regex:/^\+?63\d{10}$/']
        ], [
            'contact_number.regex' => 'The contact number is invalid.'
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }
        $data = $request->input();
        $data['usertype'] = $request->usertype != null ? $request->usertype : 1;
        $data['userstatus'] = 1;
        $data['password'] = Hash::make($request->password);
        $data['address'] = $data['province'] . ' ' . $data['municipality'] . ' ' . $data['brgy'];

        $user = User::create($data);
        // Generate token for the registered user
        $token = Auth::guard('api')->login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
    public function logout()
    {
        $user = Auth::guard('api')->user();
        UserLog::insert(['user_id' => $user['id'], 'logstatus' => 'logout', 'created_at' => date('Y-m-d H:i:s')]);

        Auth::guard('api')->logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::guard('api')->user(),
            'authorization' => [
                'token' => Auth::guard('api')->refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
