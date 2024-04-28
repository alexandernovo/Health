<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\FamilyPlanning;
use App\Models\FamilyAssessment;
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
}
