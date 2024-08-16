<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Support\Facades\DB;
use Exception;

class RecordController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function getUserWithRecord()
    {
        try {
            $usersRecord = User::whereHas('maternal')
                ->orWhereHas('newborn')
                ->orWhereHas('family')
                ->orWhereHas('vaccination')
                ->orWhereHas('immunization')
                ->orWhereHas('ekonsulta')
                ->orWhereHas('hypertensive')->get();

            if ($usersRecord->isNotEmpty()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Patient records fetched successfully',
                    'records' => $usersRecord
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
            $userRecords = Appointment::where('user_id', $id)
                ->where(function ($query) {
                    $query->whereHas('maternal')
                        ->orWhereHas('newborn')
                        ->orWhereHas('family')
                        ->orWhereHas('hypertensive')
                        ->orWhereHas('vaccination')
                        ->orWhereHas('immunization')
                        ->orWhereHas('ekonsulta');
                })
                ->whereIn('appointment_id', function ($subQuery) use ($id) {
                    $subQuery->select(DB::raw('MAX(appointment_id)'))
                        ->from('appointments')
                        ->where('user_id', $id)
                        ->groupBy('consultationTypeId');
                })
                ->with('consultation', 'user')
                ->get();

            // Remove duplicates based on consultationTypeId
            $userRecords = $userRecords->unique('consultationTypeId');

            if ($userRecords->isNotEmpty()) {
                $mappedRecords = $userRecords->map(function ($appointment) {
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
