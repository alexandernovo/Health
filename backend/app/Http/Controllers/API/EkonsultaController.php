<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Appointment;
use App\Models\Ekonsulta;
use App\Models\AppointmentLogs;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Api\SMSController;

class EkonsultaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createEkonsulta(Request $request)
    {
        try {
            $ekonsulta = Ekonsulta::create($request->input());

            $appointment = Appointment::find($request->appointment_id);
            if ($appointment) {
                $appointment->update(["appointmentStatus" => 4]);
            }

            $userNow = Auth::guard('api')->user();
            AppointmentLogs::create([
                'appointment_id' => $appointment->appointment_id,
                'user_id' => $userNow['id'],
                'status_desc' => 'Created new Check-up record and mark the appointment as done.'
            ]);
            $sms = new SMSController();
            $sms->settings($request->user_id, 4, $request->appointment_id);

            return response()->json([
                'status' => 'success',
                'message' => 'Added Ekonsulta successfully',
                'ekonsulta' => $ekonsulta,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch ekonsulta record failed: ' . $e->getMessage(),
            ]);
        }
    }
    public function getEkonsultaOne($appointment_id)
    {
        try {
            $ekonsulta = Ekonsulta::where('appointment_id', $appointment_id)->first();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch Ekonsulta record successfully',
                'ekonsulta' => $ekonsulta,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch Ekonsulta record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function updateEkonsulta(Request $request)
    {
        try {
            $ekonsulta = Ekonsulta::where('ekonsultaId', $request->ekonsultaId)->first();
            $ekonsulta->update($request->input());
            return response()->json([
                'status' => 'success',
                'message' => 'Updated Ekonsulta successfully',
                'ekonsulta' => $ekonsulta,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch ekonsulta record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getEkonsultaRecord($user_id)
    {
        try {
            $ekonsulta = Appointment::has('ekonsulta')->where('user_id', $user_id)->orderBy('appointmentDate', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch ekonsulta record successfully',
                'ekonsulta' => $ekonsulta,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch ekonsulta record failed: ' . $e->getMessage(),
            ]);
        }
    }
}
