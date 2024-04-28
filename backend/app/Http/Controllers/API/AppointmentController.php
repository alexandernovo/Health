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
    public function __construct()
    {
        $this->middleware('auth:api');
    }
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
                    'appointment_id' => $appointment->appointment_id,
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

    public function getAppointmentById($id)
    {
        $appointment = Appointment::with("user")->where('appointment_id', $id)->first();

        if ($appointment == null) {
            return response()->json([
                'message' => 'Fetch failed',
            ], 404);
        }
        $data = [
            'appointment_id' => $appointment->appointment_id,
            'firstname' => $appointment->user->firstname,
            'lastname' => $appointment->user->lastname,
            'birthdate' => $appointment->user->birthdate,
            'contact_number' => $appointment->user->contact_number,
            'occupation' => $appointment->user->occupation,
            'education' => $appointment->user->education,
            'civil_status' => $appointment->user->civil_status,
            'address' => $appointment->user->address,
            'religion' => $appointment->user->religion,
            'user_id' =>  $appointment->user->id,
            'consultationTypeId' =>  $appointment->consultationTypeId,
            'appointmentDate' =>  $appointment->appointmentDate,
            'appointmentTime' =>  $appointment->appointmentTime,
            'appointmentStatus' =>  $appointment->appointmentStatus,
            'isActive' =>  $appointment->isActive,
        ];

        return response()->json([
            'message' => 'Fetch Appointment Successfully',
            'status' => 'success',
            'appointment' => $data,
        ], 200);
    }
    public function changeAppointmentStatus($id, $status)
    {
        $appointment = Appointment::find($id);

        if ($appointment) {
            $appointment->update(["appointmentStatus" => $status]);
            return response()->json([
                'message' => 'Status Change Successfully',
                'appointment' => $appointment,
                'status' => 'success',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Cannot find appointment',
            ], 404);
        }
    }
}
