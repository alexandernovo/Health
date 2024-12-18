<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
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

        if ($user['usertype'] == 0 || $user['usertype'] == 2) {
            $query .= " AND notification.receiver = 0";
        } else {
            $query .= " AND notification.receiver = " . $user['id'];
        }
        $query .= " ORDER BY notification.created_at DESC";
        $data = DB::select($query);

        return response()->json([
            'status' => 'success',
            'notification' => $data,
        ]);
    }
}
