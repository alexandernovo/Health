<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getDashboardData()
    {
        $igpalge = [];
        $capoyuan = [];
        $palma = [];
        $overall = [];

        $igpalge['vaccination'] = $this->getDashboardDetails("Igpalge", "Vaccination");
        $igpalge['checkup'] = $this->getDashboardDetails("Igpalge", "Check-up");
        $igpalge['immunization'] = $this->getDashboardDetails("Igpalge", "Immunization");
        $igpalge['hypertensive'] = $this->getDashboardDetails("Igpalge", "Hypertensive/Diabetic");
        $igpalge['familyplanning'] = $this->getDashboardDetails("Igpalge", "Family Planning");
        $igpalge['newborn'] = $this->getDashboardDetails("Igpalge", "Newborn Delivery Record");
        $igpalge['maternal'] = $this->getDashboardDetails("Igpalge", "Maternal Health Records");

        $capoyuan['vaccination'] = $this->getDashboardDetails("Capoyuan", "Vaccination");
        $capoyuan['checkup'] = $this->getDashboardDetails("Capoyuan", "Check-up");
        $capoyuan['immunization'] = $this->getDashboardDetails("Capoyuan", "Immunization");
        $capoyuan['hypertensive'] = $this->getDashboardDetails("Capoyuan", "Hypertensive/Diabetic");
        $capoyuan['familyplanning'] = $this->getDashboardDetails("Capoyuan", "Family Planning");
        $capoyuan['newborn'] = $this->getDashboardDetails("Capoyuan", "Newborn Delivery Record");
        $capoyuan['maternal'] = $this->getDashboardDetails("Capoyuan", "Maternal Health Records");

        $palma['vaccination'] = $this->getDashboardDetails("Palma", "Vaccination");
        $palma['checkup'] = $this->getDashboardDetails("Palma", "Check-up");
        $palma['immunization'] = $this->getDashboardDetails("Palma", "Immunization");
        $palma['hypertensive'] = $this->getDashboardDetails("Palma", "Hypertensive/Diabetic");
        $palma['familyplanning'] = $this->getDashboardDetails("Palma", "Family Planning");
        $palma['newborn'] = $this->getDashboardDetails("Palma", "Newborn Delivery Record");
        $palma['maternal'] = $this->getDashboardDetails("Palma", "Maternal Health Records");

        $overall['vaccination'] = $this->getDashboardDetails('', "Vaccination");
        $overall['checkup'] = $this->getDashboardDetails('', "Check-up");
        $overall['immunization'] = $this->getDashboardDetails('', "Immunization");
        $overall['hypertensive'] = $this->getDashboardDetails('', "Hypertensive/Diabetic");
        $overall['familyplanning'] = $this->getDashboardDetails('', "Family Planning");
        $overall['newborn'] = $this->getDashboardDetails('', "Newborn Delivery Record");
        $overall['maternal'] = $this->getDashboardDetails('', "Maternal Health Records");
        $total = array_sum($overall);
        $overall['overall'] = $total;
        
        $data = [
            "Igpalge" =>  $igpalge,
            "Capoyuan" =>  $capoyuan,
            "Palma" =>  $palma,
            'overall' => $overall
        ];

        return response()->json([
            'status' => 'success',
            'message' => 'Fetch dashboard data successfully',
            'data' => $data,
        ]);
    }

    private function getDashboardDetails($brgy, $table)
    {
        $data = DB::table("appointments")
            ->join('consultationtype', 'consultationtype.consultationTypeId', 'appointments.consultationTypeId')
            ->join('users', 'users.id', 'appointments.user_id');

        if ($table == "Check-up") {
            $data->join('ekonsulta', 'ekonsulta.appointment_id', 'appointments.appointment_id');
        } elseif ($table == "Immunization") {
            $data->join('immunization', 'immunization.appointment_id', 'appointments.appointment_id');
        } elseif ($table == "Vaccination") {
            $data->join('vaccination', 'vaccination.appointment_id', 'appointments.appointment_id');
        } elseif ($table == "Hypertensive/Diabetic") {
            $data->join('hypertensive', 'hypertensive.appointment_id', 'appointments.appointment_id');
        } elseif ($table == "Family Planning") {
            $data->join('familyplanning', 'familyplanning.appointment_id', 'appointments.appointment_id');
        } elseif ($table == "Newborn Delivery Record") {
            $data->join('newborndelivery', 'newborndelivery.appointment_id', 'appointments.appointment_id');
        } elseif ($table == "Maternal Health Records") {
            $data->join('maternal_records', 'maternal_records.appointment_id', 'appointments.appointment_id');
        }

        if ($brgy != '') {
            $dataCount = $data->where('users.brgy', $brgy)->count();
        } else {
            $dataCount = $data->count();
        }

        return $dataCount;
    }
}
