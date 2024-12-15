<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

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

    public function getUserById($id)
    {
        $user = User::where('id', $id)->first();
        return response()->json([
            'status' => 'success',
            'message' => 'Fetch user successfully',
            'user' => $user,
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
            'brgy' => 'required|string',
            'gender' => 'required|string',
            'civil_status' => 'required',
            'contact_number' => ['required', 'string', 'regex:/^\+?63\d{10}$/']
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
            'address' => $request->province . ' ' . $request->municipality . ' ' . $request->brgy,
            'reg_code' => $request->reg_code,
            'region' => $request->region,
            'prov_code' => $request->prov_code,
            'province' => $request->province,
            'mun_code' => $request->mun_code,
            'municipality' => $request->municipality,
            'brgy' => $request->brgy,
            'gender' => $request->gender,
            'birthdate' => $request->birthdate,
            'occupation' => $request->occupation,
            'civil_status' => $request->civil_status,
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

    public function getAvailableStaff()
    {

        $staff = DB::select('
            SELECT users.*, userlog.*
            FROM users
            INNER JOIN userlog ON users.id = userlog.user_id
            WHERE users.usertype = 2
            AND userlog.userlog_id = (
                SELECT ul.userlog_id
                FROM userlog ul
                WHERE ul.user_id = users.id
                ORDER BY ul.userlog_id DESC
                LIMIT 1
            )
            AND userlog.logstatus != "logout"
        ');

        // Loop through each staff and check their log status based on created_at
        foreach ($staff as $key => $user) {
            try {
                // Parse the 'created_at' field from userlog to a Carbon instance
                $logCreatedAt = date('Y-m-d', strtotime($user->created_at));

                // Check if the 'created_at' timestamp is before the start of yesterday
                if ($logCreatedAt < date('Y-m-d')) {
                    // Update logstatus to 'logout' if created_at is before the start of yesterday
                    DB::table('userlog')
                        ->where('user_id', $user->user_id)
                        ->update(['logstatus' => 'logout']);

                    // Exclude this user from the results
                    unset($staff[$key]);
                }
            } catch (\Exception $e) {
                // Ensure we mark them as logged out in case of error
                DB::table('userlog')
                    ->where('user_id', $user->user_id)
                    ->update(['logstatus' => 'logout']);

                // Exclude this user from the results
                unset($staff[$key]);
            }
        }

        // Return the filtered staff data
        return response()->json([
            'status' => 'success',
            'message' => 'Staff fetched successfully',
            'staff' => array_values($staff), // Reindex the array
        ]);
    }
}
