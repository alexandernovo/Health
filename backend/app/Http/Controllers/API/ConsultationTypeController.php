<?php

namespace App\Http\Controllers\API;

use App\Models\ConsultationType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class ConsultationTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function getConsultationTypes()
    {
        $consultation_type = ConsultationType::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Fetch consultation type successfully',
            'consultation_type' => $consultation_type,
        ]);
    }

    public function getConsultationTypesActive()
    {
        $consultation_type = ConsultationType::where('consultationTypeStatus', 1)->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Fetch consultation type successfully',
            'consultations' => $consultation_type,
        ]);
    }

    public function createConsultationType(Request $request)
    {
        $validate = [
            'consultationTypeName' => 'required|string|max:255|unique:consultationtype',
        ];

        $validator = Validator::make($request->all(), $validate);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()]);
        }

        $consultation = ConsultationType::create([
            'consultationTypeName' => $request->consultationTypeName,
            'consultationTypeStatus' => 1,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Added consultation type successfully',
            'consultation' => $consultation,
        ]);
    }

    public function updateConsultationType(Request $request, $id)
    {
        $consultation = ConsultationType::find($id);

        if ($consultation->consultationTypeName != $request->consultationTypeName) {
            $validate = [
                'consultationTypeName' => 'required|string|max:255|unique:consultationtype',
            ];

            $validator = Validator::make($request->all(), $validate);

            if ($validator->fails()) {
                return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()]);
            }
        }

        $data = [
            'consultationTypeName' => $request->consultationTypeName,
        ];

        $consultation->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Updated consultation type successfully',
            'consultation' => $consultation,
        ]);
    }

    public function activation($id, $status)
    {
        $consultation = ConsultationType::find($id);

        $data = [
            'consultationTypeStatus' => $status == 0 ? 1 : 0
        ];

        $consultation->update($data);

        return response()->json(['status' => 'success', 'message' => 'Consultation Type activation successfully', 'consultation' => $consultation]);
    }
}
