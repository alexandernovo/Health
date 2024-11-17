<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Appointment;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Api\SMSController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $userNow = Auth::guard('api')->user();
        $user = User::find($request->user_id) ?? null;

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if ($user->id == $userNow['id']) {
            Notification::create([
                "sender" => $request->user_id,
                "receiver" => 0,
                "notif_type" => "appointment",
                "id_redirect" => 0,
                "message" => $user->firstname . ' ' . $user->lastname . ' created an appointment at ' .
                    date("F d, Y", strtotime($request->appointmentDate)) . ' at ' .
                    date('H:i a', strtotime($request->appointmentTime))

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
    public function updateAppointment(Request $request)
    {
        $find = Appointment::where('appointment_id', $request->appointment_id)->first();

        if ($find) {
            $find->update($request->input());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Appointment updated successfully',
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
                    'remarks' => $appointment->appointmentRemarks,
                    'lastname' => $appointment->user->lastname,
                    'contact_number' => $appointment->user->contact_number,
                    'address' => $appointment->user->address,
                    'consultationTypeId' => $appointment->consultationTypeId,
                    'consultationTypeName' => $appointment->consultation->consultationTypeName,
                    'appointmentDate' => $appointment->appointmentDate,
                    'appointmentTime' => $appointment->appointmentTime,
                    'appointmentStatus' => $appointment->appointmentStatus,
                    'isActive' => $appointment->isActive,
                    'user_id' => $appointment->user_id,
                    'brgy' => $appointment->user->brgy,
                    'municipality' => $appointment->user->municipality,
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
        $appointment = Appointment::with("user", "consultation")->where('appointment_id', $id)->first();

        if ($appointment == null) {
            return response()->json([
                'message' => 'Fetch failed',
            ], 404);
        }
        $data = [
            'appointment_id' => $appointment->appointment_id,
            'remarks' => $appointment->appointmentRemarks,
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
            'consultationTypeName' => $appointment->consultation->consultationTypeName,
            'appointmentDate' =>  $appointment->appointmentDate,
            'appointmentTime' =>  $appointment->appointmentTime,
            'appointmentStatus' =>  $appointment->appointmentStatus,
            'isActive' =>  $appointment->isActive,
            'brgy' => $appointment->user->brgy,
            'municipality' => $appointment->user->municipality,
            'gender' => $appointment->user->gender
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
        try {
            if ($appointment) {
                $appointment->update(["appointmentStatus" => $status]);
                $status_text = $status == 1 ? "Pending" : ($status == 2 ? "Declined" : ($status == 3 ? "Approved" : "Mark as Done"));

                $userNow = Auth::guard('api')->user();
                $name = $userNow->firstname == "Admin" ? $userNow->firstname :  $userNow->firstname . ' ' . $userNow->lastname;
                Notification::create([
                    "sender" => $userNow['id'],
                    "receiver" => $appointment->user_id,
                    "notif_type" => "appointment",
                    "id_redirect" => 0,
                    "message" => $name . ' ' . $status_text . ' your appointment at ' .
                        date("F d, Y") . ' at ' .
                        date('H:i a')
                ]);

                $sms = new SMSController();
                $sms->settings($appointment->user_id, $status);

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
        } catch (Exception $e) {
            return response()->json([
                'message' => 'SMS failed',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    public function declineAppointment(Request $request)
    {
        try {
            $appointment = Appointment::find($request->id);
            if ($appointment) {
                $appointment->update(["appointmentStatus" => 2, "appointmentRemarks" => $request->remarks]);
                $userNow = Auth::guard('api')->user();
                $name = $userNow->firstname == "Admin" ? $userNow->firstname :  $userNow->firstname . ' ' . $userNow->lastname;

                Notification::create([
                    "sender" => $userNow['id'],
                    "receiver" => $appointment->user_id,
                    "notif_type" => "appointment",
                    "id_redirect" => 0,
                    "message" => $name . ' Declined your appointment at ' .
                        date("F d, Y") . ' at ' .
                        date('H:i a')
                ]);

                $sms = new SMSController();
                $sms->settings($appointment->user_id, 2);

                return response()->json([
                    'message' => 'Appointment Decline Successfully',
                    'appointment' => $appointment,
                    'status' => 'success',
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => 'SMS failed',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    public function getAppointmentSchedByDate(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->post('appointmentDate')));
        $data = Appointment::where("appointmentDate", $date)
            ->where("appointmentStatus", 3)
            ->get();

        return response()->json([
            'message' => 'Date Fetch Successfully',
            'time' => $data,
            'status' => 'success',
        ], 200);
    }
}
