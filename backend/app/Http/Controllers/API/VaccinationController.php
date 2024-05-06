<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Vaccination;
use App\Models\OtherVaccines;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Exception;

class VaccinationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createVaccination(Request $request)
    {
        try {
            $vaccination = Vaccination::create($request->input());

            if ($vaccination) {
                foreach ($request->otherVaccines as $other) {
                    $other['vaccinationId'] = $vaccination->vaccinationId;
                    OtherVaccines::create($other);
                }
            }
            $appointment = Appointment::find($request->appointment_id);

            if ($appointment) {
                $appointment->update(["appointmentStatus" => 4]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Create Vaccination Record Successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Create newborn record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getVaccinationOneRecord($appointment_id)
    {
        try {
            $vaccination = Appointment::has('vaccination')->where('appointment_id', $appointment_id)->orderBy('appointmentDate', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch vaccination record successfully',
                'vaccination' => $vaccination,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch vaccination record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getVaccinationRecord($user_id)
    {
        try {
            $vaccination = Appointment::has('vaccination')->where('user_id', $user_id)->orderBy('appointmentDate', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch vaccination record successfully',
                'vaccination' => $vaccination,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch familyplanning record failed: ' . $e->getMessage(),
            ]);
        }
    }
}
