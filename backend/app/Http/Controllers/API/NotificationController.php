<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\SMSController;
use Exception;


class NotificationController extends Controller
{
    public function getNotification()
    {
        $user = Auth::guard('api')->user();

        $query = "
            SELECT notification.*,
                CONCAT(u1.firstname, ' ', u1.lastname) AS senderName,
                CONCAT(u2.firstname, ' ', u2.lastname) AS receiverName
            FROM notification 
            LEFT JOIN users AS u1 ON u1.id = notification.sender
            LEFT JOIN users AS u2 ON u2.id = notification.receiver
            WHERE 1=1
        ";

        if ($user && $user['usertype'] == 0 || $user['usertype'] == 2) {
            $query .= " AND notification.receiver = 0";
        } else  {
            if($user)
            {
                $query .= " AND notification.receiver = " . $user['id'];
            }
        }
        $query .= " ORDER BY notification.created_at DESC";
        $data = DB::select($query);

        return response()->json([
            'status' => 'success',
            'notification' => $data,
        ]);
    }

    public function reminders()
    {
        $reminders = DB::table('appointments')
            ->leftJoin('users', 'users.id', 'appointments.user_id')
            ->where('appointments.appointmentStatus', 3)
            ->where('reminded', 0)->get();
        $sms = new SMSController();
        $messageArray = [];

        foreach ($reminders as $reminder) {
            if (date('Y-m-d', strtotime($reminder->appointmentDate)) == date('Y-m-d')) {
                $dateToday = date('F d, Y');
                $formattedTime = date('h:i A', strtotime($reminder->appointmentTime));
                $message = "Dear $reminder->firstname $reminder->lastname,\nYour appointment is today ($dateToday) at $formattedTime.";
                $sms->reminders($message, $reminder->contact_number);
                $messageArray[] = $message;
                Appointment::where('appointment_id', $reminder->appointment_id)->update(['reminded' => 1]);
            }
        }
        return response()->json([
            'status' => 'success',
            'successfullReminder' => $messageArray,
        ]);
    }
}
