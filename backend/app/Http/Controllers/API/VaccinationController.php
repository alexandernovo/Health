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
use Illuminate\Support\Facades\Validator;


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
    public function updateVaccination(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'appointment_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }

        $find_vaccination = Vaccination::where('vaccinationId', $request->vaccinationId)->first();
        $update = $find_vaccination->update($request->input());
        if ($update) {
            foreach ($request->otherVaccines as $othersVaccine) {
                if ($othersVaccine['otherVaccinesId'] != 0) {
                    $find_assessment = OtherVaccines::where('otherVaccinesId', $othersVaccine['otherVaccinesId'])->first();
                    if ($find_assessment) {
                        $find_assessment->update($othersVaccine);
                    }
                } else {
                    $othersVaccine['vaccinationId'] = $find_vaccination['vaccinationId'];
                    OtherVaccines::create($othersVaccine);
                }
            }
            foreach ($request->removeotherVaccines as $others) {
                $find_otherVaccines = OtherVaccines::where('otherVaccinesId', $others['otherVaccinesId'])->first();
                if ($find_otherVaccines) {
                    $find_otherVaccines->delete();
                }
            }
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Vaccination Record Updated Successfully',
        ]);
    }
    public function getVaccinationOneRecord($appointment_id)
    {
        try {
            $vaccination = Vaccination::whereHas('othervaccines')->with('othervaccines')->where('appointment_id', $appointment_id)->first();
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
