import React, { useState, useEffect, useRef } from 'react'
import logoMaternal from '@assets/images/logo-maternal.png'
import logDepartment from '@assets/images/departmenthealth_logo.png'
import { AppointmentModel } from '@/types/appointmentType';
import { MaternalModel } from '@/types/MaternalType';
import { MedicalAssessmentModel } from '@/types/MedicalAssessment';
import axios from 'axios';
import { DateToString, TimeToString12Hour, calculateAge, StringToDate } from '@/utils/DateFunction';
import ReactToPrint from "react-to-print";
import { getMiddleInitial } from '@/utils/CommonFunctions';

interface MaternalReportProps {
    appointment_id?: string
}

const MaternalReport: React.FC<MaternalReportProps> = (props: MaternalReportProps) => {
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const [medical, setMedical] = useState<MedicalAssessmentModel[]>([]);
    const [maternal, setMaternal] = useState<MaternalModel>();
    const token: string | null = localStorage.getItem("token");
    const appointment_id = props.appointment_id;
    const contentToPrint = useRef(null);

    useEffect(() => {
        fetchMaternalDetails();
        fetchAppointmentDetails();
    }, []);

    const fetchAppointmentDetails = async () => {
        const response = await axios.get(`/api/appointment/getAppointmentById/${appointment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.status == "success") {
            setAppointment(response.data.appointment);
            console.log(response.data.appointment)
        }
    }

    const fetchMaternalDetails = async () => {
        const response = await axios.get(`/api/maternal/getMaternalOneRecord/${appointment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status == "success") {
            setMaternal(response.data.maternal);
            if (response.data.maternal.medical.length > 0) {
                setMedical(response.data.maternal.medical);
            }
        }
    }


    return (
        <div >
            <div className='flex justify-center my-3'>
                <div className='w-[8.5in] flex justify-end'>
                    <ReactToPrint
                        trigger={() =>
                            <button className='btn btn-primary btn-sm text-white px-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
                                </svg>
                                Print
                            </button>
                        }
                        content={() => contentToPrint.current}
                    />
                </div>
            </div>
            <div className='flex justify-center my-3'>
                <div className='report-card border-[0.5px] w-[8.5in] bg-white p-5 pt-[30px] px-[40px] rounded-[4px] shadow-sm' ref={contentToPrint}>
                    <div className='flex justify-center items-center gap-5'>
                        <img src={logoMaternal} className='w-[70px] h-[70px]' />
                        <div className='text-center font-semibold'>
                            <h1>BARBAZA RURAL HEALTH UNIT</h1>
                            <h2>Barbaza, Antique</h2>
                        </div>
                        <img src={logDepartment} className='w-[70px] h-[70px]' />
                    </div>
                    <div className='bg-gray-700 text-center mt-[40px] py-1 text-white'>
                        <h1>MATERNAL HEALTH RECORD</h1>
                    </div>

                    <div className='flex justify-end mt-5'>
                        <div>
                            <p className='text-[13px]'>
                                F.No. <span className='underline'>{maternal?.fNo ? maternal.fNo : '______________'}</span>
                            </p>
                            <p className='text-[13px] mt-2'>
                                Philhealth No: <span className='underline'>{maternal?.philhealth ? maternal.philhealth : '______________'}</span>
                            </p>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold text-[14px]'>1. GENERAL DATA</p>
                        <div className='ml-[30px] mt-3'>
                            <div className='flex gap-1'>
                                <div className='w-[50%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[50px]'>Name:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{appointment.firstname} {getMiddleInitial(appointment.middlename || '')} {appointment.lastname} {appointment.extension || ''}</span>
                                    </p>
                                </div>
                                <div className='w-[40%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[90px]'>Date of Birth:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{DateToString(appointment.birthdate)}</span>
                                    </p>
                                </div>
                                <div className='w-[10%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[33px]'>Age:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{calculateAge(appointment.birthdate)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='ml-[30px] mt-3'>
                            <div className='flex gap-1'>
                                <div className='w-[100%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[60px]'>Address:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{appointment.address}</span>
                                    </p>
                                </div>
                                <div className='w-[100%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[70px]'>Education:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{appointment.education}</span>
                                    </p>
                                </div>
                                <div className='w-[100%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[85px]'>Occupation:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{appointment.occupation}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='flex gap-1 mt-3'>
                                <div className='w-[50%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[110px]'>Husband Name:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.husbandName}</span>
                                    </p>
                                </div>
                                <div className='w-[40%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[90px]'>Date of Birth:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{DateToString(maternal?.husbandbirthdate)}</span>
                                    </p>
                                </div>
                                <div className='w-[10%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[33px]'>Age:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.husbandage}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='flex gap-1 mt-3'>
                                <div className='w-[100%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[60px]'>Address:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.husbandAddress}</span>
                                    </p>
                                </div>
                                <div className='w-[100%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[70px]'>Education:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.husbandEducation}</span>
                                    </p>
                                </div>
                                <div className='w-[100%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[85px]'>Occupation:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.husbandOccupation}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='flex gap-1 mt-3'>
                                <div className='w-[50%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[120px]'>Date of Marriage:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{DateToString(maternal?.dateofmarriage)}</span>
                                    </p>
                                </div>
                                <div className='w-[50%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[60px]'>Religion:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{appointment?.religion}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='flex gap-1 mt-3'>
                                <div className='w-[50%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[105px]'>Date Admitted:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{DateToString(maternal?.dateAdmitted)}</span>
                                    </p>
                                </div>
                                <div className='w-[50%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[110px]'>Date Discharge:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{DateToString(maternal?.dateDischarge)}</span>
                                    </p>
                                </div>
                            </div>

                            <div className='flex gap-1 mt-3'>
                                <div className='w-[50%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[105px]'>Time Admitted:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{TimeToString12Hour(maternal?.timeAdmitted)}</span>
                                    </p>
                                </div>
                                <div className='w-[50%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[110px]'>Time Discharge:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{TimeToString12Hour(maternal?.timeDischarge)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className='font-semibold text-[14px] mt-5'>2. MEDICAL HISTORY</p>

                        <div className='ml-[30px] mt-3'>
                            <p className='font-semibold text-[13px]'>1. Past History (Please Check)</p>
                            <div className='flex w-[80%] justify-between'>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <span className="label-text text-[13px]">PTB</span>
                                        <input type="checkbox" name="familyHistoryPTB" checked={maternal?.familyHistoryPTB} className="checkbox checkbox-default checkbox-xs" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryHeartDisease" checked={maternal?.familyHistoryHeartDisease} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">Heart Disease</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryDiabetes" checked={maternal?.familyHistoryDiabetes} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryHypertension" checked={maternal?.familyHistoryHypertension} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">Hypertension</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryGoiter" checked={maternal?.familyHistoryGoiter} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">Goiter</span>
                                    </label>
                                </div>
                            </div>
                            <p className='font-semibold text-[13px] mt-3'>2. Family History (Please Check)</p>
                            <div className='flex w-[80%] justify-between'>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <span className="label-text text-[13px]">PTB</span>
                                        <input type="checkbox" name="familyHistoryPTB" checked={maternal?.familyHistoryPTB} className="checkbox checkbox-default checkbox-xs" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryHeartDisease" checked={maternal?.familyHistoryHeartDisease} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">Heart Disease</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryDiabetes" checked={maternal?.familyHistoryDiabetes} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryHypertension" checked={maternal?.familyHistoryHypertension} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">Hypertension</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryGoiter" checked={maternal?.familyHistoryGoiter} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">Goiter</span>
                                    </label>
                                </div>
                            </div>
                            <p className='font-semibold text-[13px] mt-3'>3. Menstrual History</p>
                            <div className='flex gap-1 mt-3 w-full'>
                                <div className='w-[25%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[35px]'>LMP:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.LMP}</span>
                                    </p>
                                </div>
                                <div className='w-[25%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[35px]'>EDC:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.EDC}</span>
                                    </p>
                                </div>
                                <div className='w-[35%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[65px]'>GRAVIDA:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.GRAVIDA}</span>
                                    </p>
                                </div>
                                <div className='w-[15%]'>
                                    <p className='text-[13px] flex w-[100%] gap-1 table'>
                                        <span className='table-cell w-[40px]'>PARA:</span>
                                        <span className='table-cell border-b-[1px] border-black'>{maternal?.PARA}</span>
                                    </p>
                                </div>
                            </div>

                            <p className='font-semibold text-[13px] mt-3'>OB GYNE HISTORY</p>

                            <div className='flex w-[40%] justify-between items-center'>
                                <label className='text-[12px]'>OB SCORE</label>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="OBScore" value="F" checked={maternal?.OBScore == 'F'} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">F</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="OBScore" value="P" checked={maternal?.OBScore == 'P'} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">P</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="OBScore" value="A" checked={maternal?.OBScore == 'A'} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">A</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="OBScore" value="L" checked={maternal?.OBScore == 'L'} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[13px]">L</span>
                                    </label>
                                </div>
                            </div>

                            <p className='font-semibold text-[13px] mt-3'>RISK FACTOR (Please Check)</p>
                            <div className='flex gap-[130px]'>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="below18ORabove35" checked={maternal?.below18ORabove35} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Below 18 - above 35 yrs.</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="pregnancyMore4" checked={maternal?.pregnancyMore4} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Pregnancy more than 4</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="poorObstetrical" checked={maternal?.poorObstetrical} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Poor Obstetrical Condition</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="Below2YearsBirthInterval" checked={maternal?.Below2YearsBirthInterval} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Below 2 yrs. Birth Interval</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="lessThan145cm" checked={maternal?.lessThan145cm} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Less Than 145 cm. Height</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="moreThan145cm" checked={maternal?.moreThan145cm} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">More than 145 cm. Height</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='flex '>
                                <h2 className='font-semibold text-[13px] mt-3 w-1/2'>Present S/s</h2>
                                <h2 className='font-semibold text-[14px] mt-3 w-1/2'>TETANUS TOXOID IMMUNIZATION</h2>
                            </div>
                            <div className='flex'>
                                <div className='w-1/2'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="antePostPartrum" checked={maternal?.antePostPartrum} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Ante and post partrum hemmorrhage.</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="prematureLabor" checked={maternal?.prematureLabor} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Premature labor</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="abnormalPresentation" checked={maternal?.abnormalPresentation} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Abnormal Presentation</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="preEnclampsia" checked={maternal?.preEnclampsia} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">Pre Enclampsia</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="STD" checked={maternal?.STD} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">STD</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='w-1/2'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="TT1" checked={maternal?.TT1} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">TT1</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="TT2" checked={maternal?.TT2} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">TT2</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="TT3" checked={maternal?.TT3} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">TT3</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="TT3" checked={maternal?.TT4} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">TT4</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="TT5" checked={maternal?.TT5} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">TT5</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="text-[13px] border mt-4">
                            <thead>
                                <tr>
                                    <th className="px-2 border font-semibold text-black">Date</th>
                                    <th className="px-2 border font-semibold text-black">B/P</th>
                                    <th className="px-2 border font-semibold text-black">WT.</th>
                                    <th className="px-2 border font-semibold text-black">HR</th>
                                    <th className="px-2 border font-semibold text-black">RR</th>
                                    <th className="px-2 border font-semibold text-black">TEMP</th>
                                    <th className="px-2 border font-semibold text-black">AOG</th>
                                    <th className="px-2 border font-semibold text-black">FH</th>
                                    <th className="px-2 border font-semibold text-center text-black">FHB Pres.</th>
                                    <th className="px-2 border font-semibold text-black">REMARKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medical
                                    .sort((a, b) => {
                                        const dateA = StringToDate(a.Date) || new Date(0);
                                        const dateB = StringToDate(b.Date) || new Date(0);
                                        return dateA.getTime() - dateB.getTime();
                                    })
                                    .map(md => (
                                        <tr key={md.keyId}>
                                            <td className='px-2 border-r-[1px] py-0'>{DateToString(md.Date)}</td>
                                            <td className='px-2 border-r-[1px] py-0'>{md.BP}</td>
                                            <td className='px-2 border-r-[1px] py-0'>{md.WT}</td>
                                            <td className='px-2 border-r-[1px] py-0 w-[5%]'>{md.HR}</td>
                                            <td className='px-2 border-r-[1px] py-0'>{md.RR}</td>
                                            <td className='px-2 border-r-[1px] py-0'>{md.TEMP}</td>
                                            <td className='px-2 border-r-[1px] py-0'>{md.AOG}</td>
                                            <td className='px-2 border-r-[1px] py-0'>{md.FH}</td>
                                            <td className='px-2 border-r-[1px] py-0'>
                                                <div className='flex justify-center items-center'>
                                                    {md.FHBPres ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </td>
                                            <td className='px-2 border-r-[1px] py-0'>{md.Remarks}</td>
                                        </tr>
                                    ))}

                                {medical.length == 0 && (
                                    <tr>
                                        <td colSpan={11}>
                                            <p className='text-[12px] text-gray-400 text-center'>No Data</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className='flex justify-end mt-[40px]'>
                            <div className='w-[1/3]'>
                                <p className='underline'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                <p className='font-semibold text-[13px] text-center'>Signature Over Printed Name</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MaternalReport
