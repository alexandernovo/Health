<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Appointment;
use App\Models\NewBorn;
use App\Models\PostPartrum;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Http\Controllers\Api\SMSController;


class NewBornController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createNewBornRecord(Request $request)
    {
        $vaidation = [
            'appointment_id' => 'required',
            'user_id' => 'required',
            'infantsName' => 'required',
            'dateTimeDelivery' => 'required',
            'infantsSex' => 'required',
            'lengthAtBirth' => 'required',
            'infantWeight' => 'required',
            'newBornScreeningCode' => 'required',
            'dateOfNewBornScreening' => 'required',
            'dateAndTimeOfDischarge' => 'required',
            'APGARScore' => 'required',
            'Presentation' => 'required',
            'uterusPosition' => 'required',
            'size' => 'required',
            'shape' => 'required',
            'adnexae' => 'required',
            'laceration' => 'required',
            'discharge' => 'required',
        ];

        if ($request->discharge == 'Yes') {
            $vaidation['specify'] = 'required';
        }

        $validator = Validator::make($request->all(), $vaidation);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }

        try {
            $newborn_record = NewBorn::create($request->input());
            foreach ($request->postPartrum as $postPartrum) {
                PostPartrum::create([
                    'newBornId' => $newborn_record->newBornId,
                    'postPartrumDate' => $postPartrum['postPartrumDate'],
                    'bodyTemperature' => $postPartrum['bodyTemperature'],
                    'postPartrumBP' => $postPartrum['postPartrumBP'],
                    'postPartrumFundus' => $postPartrum['postPartrumFundus'],
                    'breast' => $postPartrum['breast'],
                    'Lochia' => $postPartrum['Lochia'],
                    'postPartrumRemarks' => $postPartrum['postPartrumRemarks'],
                ]);
            }
            $appointment = Appointment::find($request->appointment_id);

            if ($appointment) {
                $appointment->update(["appointmentStatus" => 4]);
            }
            $sms = new SMSController();
            $sms->settings($request->user_id, 4);
            return response()->json([
                'status' => 'success',
                'message' => 'Create Newborn Delivery Record Successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Create newborn record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getUserNewbornRecord($user_id)
    {
        try {
            $newborn = Appointment::has('newborn')->where('user_id', $user_id)->orderBy('appointmentDate', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch newborn record successfully',
                'newborn' => $newborn,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch newborn record failed: ' . $e->getMessage(),
            ]);
        }
    }

    public function getNewbornOneRecord($appointment_id)
    {
        try {
            $newborn = Newborn::with('postpartrum')->where('appointment_id', $appointment_id)->first();
            return response()->json([
                'status' => 'success',
                'message' => 'Fetch newborn record successfully',
                'newborn' => $newborn,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Fetch newborn record failed: ' . $e->getMessage(),
            ]);
        }
    }
    public function updateNewbornRecord(Request $request)
    {

        $validation = [
            'appointment_id' => 'required',
            'user_id' => 'required',
            'infantsName' => 'required',
            'dateTimeDelivery' => 'required',
            'infantsSex' => 'required',
            'lengthAtBirth' => 'required',
            'infantWeight' => 'required',
            'newBornScreeningCode' => 'required',
            'dateOfNewBornScreening' => 'required',
            'dateAndTimeOfDischarge' => 'required',
            'APGARScore' => 'required',
            'Presentation' => 'required',
            'uterusPosition' => 'required',
            'size' => 'required',
            'shape' => 'required',
            'adnexae' => 'required',
            'laceration' => 'required',
            'discharge' => 'required',
        ];

        if ($request->discharge == 'Yes') {
            $validation['specify'] = 'required';
        }

        $validator = Validator::make($request->all(), $validation);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ]);
        }

        $find_newborn = Newborn::where('newBornId', $request->newBornId)->first();
        $update = $find_newborn->update($request->input());
        if ($update) {
            foreach ($request->postPartrum as $postPartrum) {
                if ($postPartrum['postPartrumId'] != 0) {
                    $find_postPartrum = PostPartrum::where('postPartrumId', $postPartrum['postPartrumId'])->first();
                    if ($find_postPartrum) {
                        $find_postPartrum->update($postPartrum);
                    }
                } else {
                    $postPartrum['newBornId'] = $find_newborn['newBornId'];
                    PostPartrum::create($postPartrum);
                }
            }
            foreach ($request->postPartrumToRemove as $postPartrum) {
                $find_postPartrum = PostPartrum::where('postPartrumId', $postPartrum['postPartrumId'])->first();
                if ($find_postPartrum) {
                    $find_postPartrum->delete();
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Newborn Record Updated Successfully',
        ]);
    }
}
