<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
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
            return false;
        }
    }

    public function reminders($message, $number)
    {
        $data_text = [
            'message' => $message,
            'contact_number' => $number
        ];

        $sendSMS = $this->sendSMS($data_text);
        return true;
    }

    public function settings($user_id, $status, $appointment_id)
    {
        // Map status codes to text
        $status_text = $status == 1 ? "Pending" : ($status == 2 ? "Declined" : ($status == 3 ? "Approved" : ($status == 5 ? "Created" : "Mark as Done")));

        // Retrieve the user's details from the database
        $user = User::where('id', $user_id)->first();
        $appointment = Appointment::where('appointment_id', $appointment_id)->first();
        $message = "";
        if ($status != 5) {
            $message =  'Dear ' . $user['firstname'] . ' ' . $user['lastname'] . ",\nYour Appointment on " . date('F d Y', strtotime($appointment->appointmentDate)) . " at " . $appointment->appointmentTime . " has been " .  $status_text;
        } else {
            $message = 'Dear ' . $user['firstname'] . ' ' . $user['lastname'] . ",\nALIGTOS BARANGAY HEALTH STATION created an appointment for you on " . date('F d Y', strtotime($appointment->appointmentDate)) . " at " . $appointment->appointmentTime;
        }
        // Prepare the data to send
        $data_text = [
            'message' => $message,
            'contact_number' => $user['contact_number']
        ];

        // Send the SMS using the prepared data
        $sendSMS = $this->sendSMS($data_text);

        // Return a response or handle accordingly
        return true;
    }
}
