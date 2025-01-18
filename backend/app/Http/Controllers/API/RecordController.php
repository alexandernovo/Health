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
            $userRecords = User::join('appointments', 'appointments.user_id', 'users.id')
                ->join('consultationtype', 'appointments.consultationTypeId', 'consultationtype.consultationTypeId')
                ->where('appointmentStatus', 4)
                ->where('users.id', $id)
                ->orderBy('appointments.appointmentDate', 'DESC')
                ->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Patient records fetched successfully',
                'record' => $userRecords
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch Record Failed: ' . $e->getMessage(),
            ]);
        }
    }
}
