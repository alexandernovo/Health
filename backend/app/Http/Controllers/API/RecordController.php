<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Maternal;
use App\Models\MedicalAssessment;
use App\Models\Appointment;
use Exception;

class RecordController extends Controller
{
    public function getUserWithRecord()
    {
        try {
            $usersWithMaternalRecords = User::has('maternal')->with('maternal')->get();

            if ($usersWithMaternalRecords->isNotEmpty()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Patient records fetched successfully',
                    'records' => $usersWithMaternalRecords
                ]);
            } else {
                return response()->json([
                    'status' => 'norecord',
                    'message' => 'No Records Found',
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch Record Failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getUserRecord($id)
    {
        try {
            $userRecords = Appointment::has('maternal')
                ->with('maternal', 'consultation', 'user')
                ->where('user_id', $id)
                ->get()
                ->groupBy('consultationTypeId');

            if ($userRecords->isNotEmpty()) {

                $mappedRecords = $userRecords->flatMap(function ($appointments) {
                    return $appointments->map(function ($appointment) {
                        return [
                            'firstname' => $appointment->user->firstname,
                            'lastname' => $appointment->user->lastname,
                            'appointment_id' => $appointment->appointment_id,
                            'consultationTypeId' => $appointment->consultationTypeId,
                            'consultationTypeName' => $appointment->consultation->consultationTypeName,
                            'isActive' => $appointment->isActive,
                            'user_id' => $appointment->user_id,
                        ];
                    });
                });

                return response()->json([
                    'status' => 'success',
                    'message' => 'Patient records fetched successfully',
                    'record' => $mappedRecords
                ]);
            } else {
                return response()->json([
                    'status' => 'norecord',
                    'message' => 'No Records Found',
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch Record Failed: ' . $e->getMessage(),
            ]);
        }
    }
}
