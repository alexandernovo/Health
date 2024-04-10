<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function getUsers()
    {
        $user = User::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Fetch user successfully',
            'users' => $user,
        ]);
    }

    public function getPatients()
    {
        $user = User::where('usertype', 1)->where('userstatus', 1)->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Fetch user successfully',
            'patients' => $user,
        ]);
    }

    public function UpdateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validate = [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'address' => 'required|string',
            'gender' => 'required|string',
            'contact_number' => ['required', 'string', 'regex:/(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/']
        ];

        // If username is being updated, add unique validation rule
        if ($user->username != $request->username) {
            $validate['username'] = 'required|string|max:255|unique:users';
        }

        $validator = Validator::make($request->all(), $validate, [
            'contact_number.regex' => 'The contact number is invalid.'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()]);
        }

        $data = [
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'username' => $request->username,
            'address' => $request->address,
            'gender' => $request->gender,
            'birthdate' => $request->birthdate,
            'occupation' => $request->occupation,
            'religion' => $request->religion,
            'education' => $request->education,
            'usertype' => $request->usertype,
            'contact_number' => $request->contact_number,
        ];

        // Hash password if provided
        if ($request->password != null) {
            $data['password'] = Hash::make($request->password);
        }

        // Update user data
        $user->update($data);
        return response()->json(['status' => 'success', 'message' => 'User updated successfully', 'user' => $user]);
    }

    public function activation($id, $status)
    {
        $user = User::find($id);
        $data = [
            'userstatus' => $status == 0 ? 1 : 0
        ];

        $user->update($data);

        return response()->json(['status' => 'success', 'message' => 'User activation successfully', 'user' => $user]);
    }
}
