<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AppointmentController extends Controller
{
    public function createAppointment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'appointmentDate' => 'required',
            'consultationTypeId' => 'required',
            'user_id' => 'required',
            'appointmentTime' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }

        $appointment = Appointment::create([
            'user_id' => $request->user_id,
            'consultationTypeId' => $request->consultationTypeId,
            'appointmentDate' => $request->appointmentDate,
            'appointmentTime' => date('H:i:s', strtotime($request->appointmentTime)),
            'appointmentStatus' => $request->appointmentStatus,
            'isActive'  => 1
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Appointment created successfully',
            'appointment' => $appointment,
        ]);
    }

    public function getAppointments($status)
    {
        try {
            $appointments = Appointment::with('user', 'consultation')->where("isActive", $status)->orderBy('appointment_id', 'desc')->get();

            $mappedAppointments = $appointments->map(function ($appointment) {
                return [
                    'appointmentId' => $appointment->appointment_id,
                    'firstname' => $appointment->user->firstname,
                    'lastname' => $appointment->user->lastname,
                    'contact_number' => $appointment->user->contact_number,
                    'address' => $appointment->user->address,
                    'consultationTypeId' => $appointment->consultationTypeId,
                    'consultationTypeName' => $appointment->consultation->consultationTypeName,
                    'appointmentDate' => $appointment->appointmentDate,
                    'appointmentTime' => $appointment->appointmentTime,
                    'appointmentStatus' => $appointment->appointmentStatus,
                    'isActive' => $appointment->isActive,
                    'user_id' => $appointment->user_id
                ];
            });

            return response()->json([
                'status' => 'success',
                'message' => 'Appointment Fetch successfully',
                'appointment' => $mappedAppointments,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Fetch failed',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
