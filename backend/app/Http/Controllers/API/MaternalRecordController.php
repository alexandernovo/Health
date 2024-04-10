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

class MaternalRecordController extends Controller
{
    public function createMaternalRecord(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'appointment_id' => 'required',
            'user_id' => 'required',
            'dateAdmitted' => 'required',
            'dateDischarge' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }

        try {
            $maternal_record = Maternal::create($request->input());

            foreach ($request->medicalAssessment as $medical) {
                MedicalAssessment::create([
                    'maternal_id' => $maternal_record->maternal_id,
                    'Date' => $medical['Date'],
                    'BP' => $medical['BP'],
                    'HR' => $medical['HR'],
                    'AOG' => $medical['AOG'],
                    'RR' => $medical['RR'],
                    'FH' => $medical['FH'],
                    'WT' => $medical['WT'],
                    'TEMP' => $medical['TEMP'],
                    'FHBPres' => $medical['FHBPres'],
                    'Remarks' => $medical['Remarks'],
                ]);
            }

            $appointment = Appointment::find($request->appointment_id);

            if ($appointment) {
                $appointment->update(["appointmentStatus" => 4]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Create maternal record Successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Create maternal record failed: ' . $e->getMessage(),
            ]);
        }
    }
}
