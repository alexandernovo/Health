<?php

namespace App\Http\Controllers;

use HTTP_Request2;

class SMSController extends Controller
{
    public function sendSMS()
    {
        $request = new HTTP_Request2();
        $request->setUrl('https://8g6yl9.api.infobip.com/sms/2/text/advanced');
        $request->setMethod(HTTP_Request2::METHOD_POST);
        $request->setConfig(array(
            'follow_redirects' => TRUE
        ));
        $request->setHeader(array(
            'Authorization' => 'App 2a9ba51b0e97763d1f9ea4cd51ef4fe0-ba71f7e3-c16d-43e4-ada4-f2dc85fc3b9e',
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ));
        $request->setBody('{"messages":[{"destinations":[{"to":"639935895528"}],"from":"ServiceSMS","text":"Congratulations on sending your first message.\\nGo ahead and check the delivery report in the next step."}]}');

        try {
            $response = $request->send();
            if ($response->getStatus() == 200) {
                echo $response->getBody();
            } else {
                echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
                $response->getReasonPhrase();
            }
        } catch (HTTP_Request2_Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }
}
