<?php

namespace App\Http\Controllers\API;

use Twilio\Rest\Client;
use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;

class SMSController extends Controller
{
    public function sendSMS($data)
    {
        $sid    = getenv("SMS_Sid");
        $no    = getenv("SMS_No");
        $token  = getenv("SMS_Token");
        $twilio = new Client($sid, $token);

        try {
            $message = $twilio->messages
                ->create(
                    $data['contact_number'],
                    array(
                        "from" => $no,
                        "body" => $data['message']
                    )
                );
        } catch (Exception $e) {
            // Log the exception if needed
            // Log::error('Failed to send SMS: ' . $e->getMessage());
        }

        return true;
    }

    public function settings($user_id, $status)
    {
        $status_text = $status == 1 ? "Pending" : ($status == 2 ? "Declined" : ($status == 3 ? "Approved" : "Mark as Done"));
        $user = User::where('id', $user_id)->first();
        $data_text = [
            'message' => 'Dear ' . $user['firstname'] . ' ' . $user['lastname'] . ",\nYour Appointment has been " .  $status_text,
            'contact_number' => $user['contact_number']
        ];
        $sendSMS = $this->sendSMS($data_text);
        return true;
    }
}
