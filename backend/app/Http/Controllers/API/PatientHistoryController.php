<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Maternal;
use App\Models\MedicalAssessment;
use App\Models\Appointment;
use Exception;
use Illuminate\Support\Facades\Auth;


class PatientHistoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getHistory($user_id)
    {
        try {
            $userNow = Auth::guard('api')->user();

            $userHistory = Appointment::whereHas('maternal')
                ->orWhereHas('newborn')
                ->orWhereHas('family')
                ->orWhereHas('hypertensive')
                ->orWhereHas('vaccination')
                ->orWhereHas('immunization')
                ->orWhereHas('ekonsulta')
                ->with('consultation', 'user')
                ->where('user_id', $userNow['id'])
                ->get();

            if ($userHistory->isNotEmpty()) {
                $mappedRecords = $userHistory->map(function ($appointment) {
                    return [
                        'firstname' => $appointment->user->firstname,
                        'lastname' => $appointment->user->lastname,
                        'appointment_id' => $appointment->appointment_id,
                        'consultationTypeId' => $appointment->consultationTypeId,
                        'appointmentDate' => $appointment->appointmentDate,
                        'consultationTypeName' => $appointment->consultation->consultationTypeName,
                        'isActive' => $appointment->isActive,
                        'user_id' => $appointment->user_id,
                    ];
                });
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Fetch History Record Successfully',
                'history' => $mappedRecords,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch History Record Failed: ' . $e->getMessage(),
            ]);
        }
    }
}
