<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Maternal;
use App\Models\MedicalAssessment;
use App\Models\Appointment;
use Exception;

class MaternalRecordController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
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

    public function updateMaternalRecords(Request $request)
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

        $find_maternal = Maternal::where('maternal_id', $request->maternal_id)->first();
        $update = $find_maternal->update($request->input());
        if ($update) {
            foreach ($request->medicalAssessment as $medical) {
                if ($medical['medicalAssessmentID'] != 0) {
                    $find_medical = MedicalAssessment::where('medicalAssessmentID', $medical['medicalAssessmentID'])->first();
                    if ($find_medical) {
                        $find_medical->update($medical);
                    }
                } else {
                    MedicalAssessment::create($medical);
                }
            }
            foreach ($request->removeMedicalAssessment as $medical) {
                $find_medical = MedicalAssessment::where('medicalAssessmentID', $medical['medicalAssessmentID'])->first();
                if ($find_medical) {
                    $find_medical->delete();
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Maternal Record Updated Successfully',
        ]);
    }

    public function getAllUserMaternalRecord($user_id)
    {
        try {
            $maternal_record = Appointment::has('maternal')
                ->where('user_id', $user_id)
                ->orderBy('appointmentDate', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Fetch maternal record successfully',
                'maternal_record' => $maternal_record,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Create maternal record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getUserMaternalRecord($user_id)
    {
        try {
            $maternal = Appointment::has('maternal')->where('user_id', $user_id)->orderBy('appointmentDate', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch maternal record successfully',
                'maternal' => $maternal,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch maternal record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getMaternalOneRecord($appointment_id)
    {
        try {
            $maternal = Maternal::whereHas('medical')->with('medical')->where('appointment_id', $appointment_id)->first();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch maternal record successfully',
                'maternal' => $maternal,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch maternal record failed: ' . $e->getMessage(),
            ]);
        }
    }
}
