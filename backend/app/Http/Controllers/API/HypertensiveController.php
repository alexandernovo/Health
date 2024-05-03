<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Hypertensive;
use App\Models\Appointment;
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
        $hypertensive = Hypertensive::where($request->hypertensiveId)->first();
        if ($hypertensive) {
            $hypertensive->update($hypertensive->input());
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

    public function getUserHypertensiveRecord($appointment_id)
    {
        try {
            $hypertensive = Appointment::has('hypertensive')->where('appointment_id', $appointment_id)->orderBy('appointmentDate', 'desc')->get();
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
}
