<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Appointment;
use App\Models\Immunization;
use Exception;

class ImmunizationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createImmunization(Request $request)
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

        try 
        {
            $immunization = Immunization::create($request->input());
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Create immunization record failed: ' . $e->getMessage(),
            ]);
        }
    }
}