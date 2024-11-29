<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Vonage\Client\Credentials\Basic;
use Vonage\Client;
use Vonage\SMS\Message\SMS;
use Exception;

class SMSController extends Controller
{
    public function sendSMS($data)
    {
        try {
            $key = getenv("SMS_APIKEY");    // Your Vonage API Key
            $secret = getenv("SMS_APISECRET");  // Your Vonage API Secret

            // Create the client using your Vonage credentials
            $basic = new Basic($key, $secret);
            $client = new Client($basic);

            // Create and send the SMS
            $message = new SMS($data['contact_number'], "Aligtos Brgy Health Station", $data['message']);
            $response = $client->sms()->send($message);

            // Check if the message was sent successfully
            $message = $response->current();
            if ($message->getStatus() == 0) {
                return true;
            } else {
                // Return false if SMS was not sent successfully
                return false;
            }
        } catch (Exception $e) {
            // Log or handle the exception appropriately
            \Log::error('SMS sending failed: ' . $e->getMessage());
            return false;
        }
    }

    public function settings($user_id, $status)
    {
        // Map status codes to text
        $status_text = $status == 1 ? "Pending" : ($status == 2 ? "Declined" : ($status == 3 ? "Approved" : "Mark as Done"));
        
        // Retrieve the user's details from the database
        $user = User::where('id', $user_id)->first();

        // Prepare the data to send
        $data_text = [
            'message' => 'Dear ' . $user['firstname'] . ' ' . $user['lastname'] . ",\nYour Appointment has been " .  $status_text,
            'contact_number' => $user['contact_number']
        ];

        // Send the SMS using the prepared data
        $sendSMS = $this->sendSMS($data_text);
        
        // Return a response or handle accordingly
        return true;
    }
}
