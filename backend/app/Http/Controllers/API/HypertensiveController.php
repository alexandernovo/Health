<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Hypertensive;
use App\Models\Appointment;
use App\Models\User;
use Exception;

class HypertensiveController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function createHypertensive(Request $request)
    {
        $hypertensive = Hypertensive::create($request->input());
        if ($hypertensive) {
            $appointment = Appointment::find($request->appointment_id);
            if ($appointment) {
                $appointment->update(["appointmentStatus" => 4]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Hypertensive Record Updated Successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Hypertensive Record Failed',
            ]);
        }
    }

    public function updateHypertensive(Request $request)
    {
        $hypertensive = Hypertensive::where('hypertensiveId', $request->hypertensiveId)->first();
        if ($hypertensive) {
            $hypertensive->update($request->input());
            return response()->json([
                'status' => 'success',
                'message' => 'Hypertensive Record Updated Successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Hypertensive Record Failed',
            ]);
        }
    }

    public function getUserHypertensiveRecord($user_id)
    {
        try {
            $hypertensive = Appointment::has('hypertensive')->where('user_id', $user_id)->orderBy('appointmentDate', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch hypertensive record successfully',
                'hypertensive' => $hypertensive,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch hypertensive record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getHypertensiveData($appointment_id)
    {
        try {
            $hypertensive = Hypertensive::where('appointment_id', $appointment_id)->first();
            if ($hypertensive) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Fetch hypertensive record successfully',
                    'hypertensive' => $hypertensive,
                ]);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Fetch hypertensive record failed: No Hypertensive Record with that ID',
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch hypertensive record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getHypertensiveGroup(Request $parameter)
    {
        try {
            $users = User::where('region', $parameter->region)
                ->where('province', $parameter->province)
                ->where('municipality', $parameter->municipality)
                ->where('brgy', $parameter->brgy)
                ->get();

            foreach ($users as $user) {
                $user->hypertensive = $user->hypertensive()->orderBy('created_at')->first();
                $user->appointment = $user->appointment()
                    ->where('consultationTypeId', 4)
                    ->whereBetween('appointmentDate', [$parameter->dateFrom, $parameter->dateTo])
                    ->orderBy('appointmentDate')
                    ->first();
            }


            return response()->json([
                'status' => 'success',
                'message' => 'Fetch hypertensive record successfully',
                'hypertensive' => $users,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch hypertensive records failed: ' . $e->getMessage(),
            ]);
        }
    }
}
