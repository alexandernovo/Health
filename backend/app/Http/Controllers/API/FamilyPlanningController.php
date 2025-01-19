<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\FamilyPlanning;
use App\Models\FamilyAssessment;
use App\Models\Appointment;
use App\Models\AppointmentLogs;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\SMSController;
use Exception;

class FamilyPlanningController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function createFamilyPlanning(Request $request)
    {
        $validation = [
            'appointment_id' => 'required',
            'user_id' => 'required',
            // 'clientId' => 'required',
            // 'philhealth' => 'required',
            // 'NHTS' => 'required',
            // 'pantawid4ps' => 'required',
            // 'spouseName' => 'required',
            // 'spouseDateofBirth' => 'required',
            // 'spouseAge' => 'required',
            // 'spouseOccupation' => 'required',
            // 'noLivingChildren' => 'required',
            // 'planToHaveMoreChildren' => 'required',
            // 'averageIncome' => 'required',
            // 'typeOfClient' => 'required',
            // 'typeCurrentUser' => 'required',
            // 'typeReason' => 'required',
            // 'methodUsed' => 'required',
            // 'medicalHeadache' => 'required',
            // 'medicalhistoryStroke' => 'required',
            // 'medicalHematoma' => 'required',
            // 'medicalBreastCancer' => 'required',
            // 'medicalsevereChestPain' => 'required',
            // 'medicalcough14Days' => 'required',
            // 'medicalJaundice' => 'required',
            // 'medicalVaginalBleeding' => 'required',
            // 'medicalVaginalDischarge' => 'required',
            // 'medicalIntake' => 'required',
            // 'medicalClientSmoker' => 'required',
            // 'medicalDisability' => 'required',
            // 'disabilitySpecify' => 'required',
            // 'numberPregnanciesG' => 'required',
            // 'numberPregnanciesP' => 'required',
            // 'fullItem' => 'required',
            // 'premature' => 'required',
            // 'abortion' => 'required',
            // 'livingChildren' => 'required',
            // 'dateLastDelivery' => 'required',
            // 'typeOfLastDelivery' => 'required',
            // 'lastMenstrualPeriod' => 'required',
            // 'previousMenstrualPeriod' => 'required',
            // 'menstrualFlow' => 'required',
            // 'dysmenorrhea' => 'required',
            // 'hydatidiform' => 'required',
            // 'historyEctopicPregnancy' => 'required',
            // 'unPleasantRelationshipPartner' => 'required',
            // 'partnerDoesNotApprove' => 'required',
            // 'VAW' => 'required',
            // 'referedTo' => 'required',
            // 'skin' => 'required',
            // 'extremities' => 'required',
            // 'conjunctiva' => 'required',
            // 'pelvicExamination' => 'required',
            // 'neck' => 'required',
            // 'breast' => 'required',
            // 'abdomen' => 'required',
            // 'babyLessThan6Months' => 'required',
            // 'abstain' => 'required',
            // 'babyLessThan4Weeks' => 'required',
            // 'menstrualPast7Days' => 'required',
            // 'abortionPast7Days' => 'required',
            // 'usingContraceptives' => 'required',
        ];

        $validator = Validator::make($request->all(), $validation);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }

        try {
            $familyplanning = FamilyPlanning::create($request->input());

            foreach ($request->familyAssessment as $familyAssessment) {
                $familyAssessment['familyId'] = $familyplanning->familyId;
                FamilyAssessment::create($familyAssessment);
            }
            $appointment = Appointment::find($request->appointment_id);

            if ($appointment) {
                $appointment->update(["appointmentStatus" => 4]);
            }

            $userNow = Auth::guard('api')->user();
            AppointmentLogs::create([
                'appointment_id' => $appointment->appointment_id,
                'user_id' => $userNow['id'],
                'status_desc' => 'Created new Family Planning record and mark the appointment as done.'
            ]);

            $sms = new SMSController();
            $sms->settings($request->user_id, 4, $request->appointment_id);
            return response()->json([
                'status' => 'success',
                'message' => 'Create family planning record Successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Create maternal record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function updateFamilyPlanning(Request $request)
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

        $find_family = FamilyPlanning::where('familyId', $request->familyId)->first();
        $update = $find_family->update($request->input());
        if ($update) {
            foreach ($request->familyAssessment as $assessment) {
                if ($assessment['familyAssessmentId'] != 0) {
                    $find_assessment = FamilyAssessment::where('familyAssessmentId', $assessment['familyAssessmentId'])->first();
                    if ($find_assessment) {
                        $find_assessment->update($assessment);
                    }
                } else {
                    $assessment['familyId'] = $find_family['familyId'];
                    FamilyAssessment::create($assessment);
                }
            }
            foreach ($request->removeFamilyAssessment as $assessment) {
                $find_assessment = FamilyAssessment::where('familyAssessmentId', $assessment['familyAssessmentId'])->first();
                if ($find_assessment) {
                    $find_assessment->delete();
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Maternal Record Updated Successfully',
        ]);
    }

    public function getFamilyPlanningOne($appointment_id)
    {
        try {
            $familyplanning = FamilyPlanning::with('familyassessment')->where('appointment_id', $appointment_id)->first();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch family planning record successfully',
                'familyplanning' => $familyplanning,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch familyplanning record failed: ' . $e->getMessage(),
            ]);
        }
    }
    public function getFamilyPlanningRecord($user_id)
    {
        try {
            $familyplanning = Appointment::has('familyplanning')->where('user_id', $user_id)->orderBy('appointmentDate', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch familyplanning record successfully',
                'familyplanning' => $familyplanning,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch familyplanning record failed: ' . $e->getMessage(),
            ]);
        }
    }
}
