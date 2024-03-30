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

    public function createConsultationType(Request $request)
    {
        $validate = [
            'consultationTypeName' => 'required|string|max:255',
        ];

        $validator = Validator::make($request->all(), $validate);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()]);
        }

        $user = ConsultationType::create([
            'firstname' => $request->firstname,
            'consultationTypeStatus' => 1,
        ]);
    }

    public function updateConsultationType(Request $request, $id)
    {
    }

    public function activation($id, $status)
    {
    }
}
