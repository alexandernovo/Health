<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Appointment;
use App\Models\Immunization;
use App\Models\ImmunizationResult;
use App\Http\Controllers\Api\SMSController;
use Exception;

class ImmunizationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createImmunization(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'appointment_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }
        try {
            $immunization = Immunization::create($request->input());

            foreach ($request->immunizationResult as $result) {
                $result['immunizationId'] = $immunization->immunizationId;
                ImmunizationResult::create($result);
            }
            $appointment = Appointment::find($request->appointment_id);

            if ($appointment) {
                $appointment->update(["appointmentStatus" => 4]);
            }

            $sms = new SMSController();
            $sms->settings($request->user_id, 4, $request->appointment_id);

            return response()->json([
                'immunization' => $immunization,
                'status' => 'success',
                'message' => 'Create immunization record successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Create immunization record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function updateImmunization(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'appointment_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }

        $find_immunization = Immunization::where('immunizationId', $request->immunizationId)->first();
        $update = $find_immunization->update($request->input());
        if ($update) {
            foreach ($request->immunizationResult as $result) {
                if ($result['immunizationResultId'] != 0) {
                    $find_result = ImmunizationResult::where('immunizationResultId', $result['immunizationResultId'])->first();
                    if ($find_result) {
                        $find_result->update($result);
                    }
                } else {
                    ImmunizationResult::create($result);
                }
            }
            foreach ($request->removeImmunizationResult as $result) {
                $find_result = ImmunizationResult::where('immunizationResultId', $result['immunizationResultId'])->first();
                if ($find_result) {
                    $find_result->delete();
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Immunization Record Updated Successfully',
        ]);
    }


    public function getUserImmunizationRecord($user_id)
    {
        try {
            $immunization = Appointment::has('immunization')->where('user_id', $user_id)->orderBy('appointmentDate', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch immunization record successfully',
                'immunization' => $immunization,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch immunization record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getImmunizationOneRecord($appointment_id)
    {
        try {
            $immunization = Immunization::with('immunization_result')->where('appointment_id', $appointment_id)->first();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch immunization record successfully',
                'immunization' => $immunization,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch immunization record failed: ' . $e->getMessage(),
            ]);
        }
    }
}
