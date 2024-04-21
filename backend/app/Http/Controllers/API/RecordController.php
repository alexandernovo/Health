<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Support\Facades\DB;
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
            $userRecords = Appointment::whereHas('maternal')
                ->orWhereHas('newborn')
                ->with('consultation', 'user')
                ->whereIn('appointment_id', function ($query) use ($id) {
                    $query->select(DB::raw('MAX(appointment_id)'))
                        ->from('appointments')
                        ->where('user_id', $id)
                        ->groupBy('consultationTypeId');
                })
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
