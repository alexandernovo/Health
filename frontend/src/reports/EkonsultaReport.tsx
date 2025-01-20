import React, { useRef, useState, useEffect } from 'react'
import ReactToPrint from "react-to-print";
import logoMaternal from '@assets/images/logo-maternal.png'
import logDepartment from '@assets/images/departmenthealth_logo.png'
import { EkonsultaModel, initialEkonsultaModel } from '@/types/enkonsultaType';
import axios from 'axios';
import { DateToString, TimeToString12Hour, calculateAge } from '@/utils/DateFunction';
import { AppointmentModel } from '@/types/appointmentType';

interface EkonsultaReportProps {
    appointment_id?: string
}

export const EkonsultaReport: React.FC<EkonsultaReportProps> = ({ appointment_id }: EkonsultaReportProps) => {
    const contentToPrint = useRef(null);
    const [ekonsulta, setEkonsulta] = useState<EkonsultaModel>(initialEkonsultaModel);
    const token: string | null = localStorage.getItem("token");
    const [appointment, setAppointment] = useState<AppointmentModel>({});

    useEffect(() => {
        fetchAppointmentDetails();
        fetEkonsulta();
    }, []);

    const fetEkonsulta = async () => {
        const response = await axios.get(`/api/ekonsulta/getEkonsultaOne/${appointment_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        if (response.data.status == 'success') {
            setEkonsulta(response.data.ekonsulta);
        }
    }

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
    return (
        <>
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
            <div className='flex justify-center my-3 mb-5'>
                <div className='report-card border-[0.5px] w-[8.5in] bg-white p-5 pt-[30px] px-[40px] rounded-[4px] shadow-sm mb-3' ref={contentToPrint}>
                    <div className='flex justify-center items-center gap-5'>
                        <img src={logoMaternal} className='w-[70px] h-[70px]' />
                        <div className='text-center font-semibold'>
                            <h1>BARBAZA RURAL HEALTH UNIT</h1>
                            <h2>Barbaza, Antique</h2>
                        </div>
                        <img src={logDepartment} className='w-[70px] h-[70px]' />
                    </div>
                    <div className='bg-gray-700 text-center mt-[40px] py-1 text-white'>
                        <h1>EKONSULTA RECORD</h1>
                    </div>
                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] w-full border-black flex items-center'>
                            <div className='w-[50%] p-2'>
                                <p className='text-[13px]'>Date of Consultation: {DateToString(appointment.appointmentDate)}</p>
                            </div>
                            <div className='w-[50%]'>
                                <p className='text-[13px]'>Family Serial Number: {ekonsulta.familySerialNo}</p>
                            </div>
                        </div>
                        <div className='w-full flex items-center'>
                            <div className='w-[50%] p-2'>
                                <p className='text-[13px]'>Time: {TimeToString12Hour(appointment.appointmentTime)}</p>
                            </div>
                            <div className='flex justify-start items-center w-[50%] gap-2'>
                                <label className='text-[13px]'>Patient Type:</label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input checked={ekonsulta.patientType == true} type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                    <span className="label-text text-[13px]">New</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.patientType == false} className="checkbox  checkbox-default checkbox-xs" />
                                    <span className="label-text text-[13px]">Old</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>PERSONAL DETAILS</p>
                        </div>
                        <div className='p-1 pt-5'>
                            <p className='text-[13px] font-semibold'>Patient Name: <span className='underline'>{appointment.lastname}, {appointment.firstname} {appointment.extension || ''}</span></p>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Birthdate: <span className='underline'>{DateToString(appointment.birthdate)}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Age: <span className='underline'>{calculateAge(appointment.birthdate)}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Gender: <span className='underline'>{appointment.gender}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Civil Status: <span className='underline'>{appointment.civil_status}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>If married, Maiden Last Name: <span className='underline'>{ekonsulta.maidenLastname}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Maiden Middle Name: <span className='underline'>{ekonsulta.maidenMiddleName}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Mother's Name: <span className='underline'>{ekonsulta.mothersName}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Mother's Birthday: <span className='underline'>{DateToString(ekonsulta.mothersBirthday)}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Educational Attainment: <span className='underline'>{appointment.education}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Occupation: <span className='underline'>{appointment.occupation}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Religion: <span className='underline'>{appointment.religion}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Ethnicity (IP Group): <span className='underline'>{ekonsulta.ethnicity}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>ADDRESS</p>
                        </div>
                        <div className='p-1'>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Purok: <span className='underline'>{ekonsulta.purok}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Barangay: <span className='underline'>{appointment.brgy}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Municipality: <span className='underline'>{appointment.municipality}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Zip Code: <span className='underline'>{ekonsulta.zipCode}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Contact Number: <span className='underline'>{appointment.contact_number}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>PHILHEALTH</p>
                        </div>
                        <div className='flex w-full gap-4 px-2 items-center'>
                            <div className='flex w-[40%]'>
                                <label className='font-semibold text-[13px]'>NHTS No.: {ekonsulta.NHTSNo}</label>
                            </div>
                            <label className="label cursor-pointer flex gap-2">
                                <input checked={ekonsulta.NHTSClass == true} name='NHTSClass' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                <span className="label-text text-[13px]">Member</span>
                            </label>
                            <label className="label cursor-pointer flex gap-2">
                                <input type="checkbox" checked={ekonsulta.NHTSClass == false} name='NHTSClass' className="checkbox  checkbox-default checkbox-xs" />
                                <span className="label-text text-[13px]">Dependent</span>
                            </label>
                        </div>
                        <div className='flex w-full gap-4 px-2 items-center'>
                            <div className='flex w-[40%]'>
                                <label className='font-semibold text-[13px]'>PHIC No.: {ekonsulta.PHICNo}</label>
                            </div>
                            <label className="label cursor-pointer flex gap-2">
                                <input checked={ekonsulta.PHICClass == true} name='PHICClass' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                <span className="label-text text-[13px]">Member</span>
                            </label>
                            <label className="label cursor-pointer flex gap-2">
                                <input checked={ekonsulta.PHICClass == false} name='PHICClass' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                <span className="label-text text-[13px]">Dependent</span>
                            </label>
                        </div>
                    </div>

                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>ANTHROPOMETRICS</p>
                        </div>
                        <div className='p-1'>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Body Length / Height(cm): <span className='underline'>{ekonsulta.bodyLength}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Weight(kg): <span className='underline'>{ekonsulta.weight}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>BMI: <span className='underline'>{ekonsulta.BMI}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Head Circumference: <span className='underline'>{ekonsulta.headCircumference}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Waist Circumference: <span className='underline'>{ekonsulta.waistCircumference}</span></p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <p className='text-[13px] mt-1 font-semibold'>Skinfold Thickness: <span className='underline'>{ekonsulta.skinfoldThickness}</span></p>
                                <p className='text-[13px] mt-1 font-semibold'>Mid Upper Arm Circumference: <span className='underline'>{ekonsulta.midUpperArmCircumference}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>VITAL SIGNS</p>
                        </div>
                        <div className='flex items-center gap-5 p-1'>
                            <p className='text-[13px] mt-1 font-semibold'>BP: <span className='underline'>{ekonsulta.BP} mmHg</span></p>
                            <p className='text-[13px] mt-1 font-semibold'>RR: <span className='underline'>{ekonsulta.RR}</span> cpm</p>
                            <p className='text-[13px] mt-1 font-semibold'>HR: <span className='underline'>{ekonsulta.HR}</span> bpm</p>
                            <p className='text-[13px] mt-1 font-semibold'>PR: <span className='underline'>{ekonsulta.PR}</span> bpm</p>
                            <p className='text-[13px] mt-1 font-semibold'>Temp: <span className='underline'>{ekonsulta.Temp}</span> °C</p>
                        </div>
                    </div>

                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black  flex items-center'>
                            <p className='text-[13px] w-[50%]  font-semibold border-r-[1px] border-black px-1'>CHIEF COMPLAINTS/HISTORY OF PRESENT ILLNESS</p>
                            <p className='text-[13px] w-[50%]  font-semibold px-1'>PAST MEDICAL HISTORY</p>
                        </div>
                        <div className='flex '>
                            <div className='w-[50%] border-r-[1px] border-black p-1'>
                                <p className='text-[13px]'>
                                    {ekonsulta.chiefComplaints}
                                </p>
                            </div>
                            <div className='w-[50%] p-1'>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.hospitalization} name='hospitalization' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Hospitalization</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.emphysema} name='emphysema' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Emphysema</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.pneumonia} name='pneumonia' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Pneumonia</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.asthma} name='asthma' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Asthma</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.epilepsy} name='epilepsy' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Epilepsy/Seizure Disorder</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.thyroid} name='thyroid' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Thyroid Diseases</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input checked={ekonsulta.cancer} name='cancer' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Cancer, specify organ</span>
                                        </label>
                                        <p className="text-[8px] underline">
                                            {ekonsulta.cancerSpecify}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input checked={ekonsulta.hepatitis} name='hepatitis' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">hepatitis, specify type</span>
                                        </label>
                                        <p className="text-[8px] underline">
                                            {ekonsulta.hepatitisSpecify}
                                        </p>
                                    </div>

                                    <label className="label cursor-pointer flex gap-2 mb-[30px]">
                                        <input checked={ekonsulta.UTI} name='UTI' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Urinary Track Infection</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.cerebrovascular} name='cerebrovascular' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Cerebrovascular Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.hyperlipidemia} name='hyperlipidemia' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Hyperlipidemia</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.TB} name='TB' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">TB, specify organ</span>
                                        <p className="text-[8px] underline">
                                            {ekonsulta.TBSpecify}
                                        </p>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.coronary} name='coronary' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Coronary Artery Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.hypertension} name='hypertension' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Hypertension, highest Bp</span>

                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.ifPTB} name='ifPTB' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">if PTB, what category</span>
                                        <p className="text-[8px] underline">
                                            {ekonsulta.ifPTBSpecify}
                                        </p>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.diabetes} name='diabetes' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Diabetes Mellitus</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.pepticUlcer} name='pepticUlcer' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Peptic Ulcer Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.liverDisease} name='liverDisease' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Liver Diseases</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.minorsurgeries} name='minorsurgeries' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Minor Surgeries</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.COPD} name='COPD' type="checkbox" className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">COPD</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.Others} name='Others' className="checkbox  checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Others</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>PAST SURGICAL HISTORY (Operation and Date)</p>
                        </div>
                        <div className='flex items-center border-b-[1px] border-black'>
                            <p className='text-[13px] px-1 font-semibold w-[50%] border-r-[1px] border-black'>Operation: <span className='underline'>{ekonsulta.operation1}</span></p>
                            <p className='text-[13px] px-1 font-semibold'>Date: <span className='underline'>{DateToString(ekonsulta.operationDate1)}</span></p>
                        </div>
                        <div className='flex items-center'>
                            <p className='text-[13px] px-1 font-semibold w-[50%] border-r-[1px] border-black'>Operation: <span className='underline'>{ekonsulta.operation2}</span></p>
                            <p className='text-[13px] px-1 font-semibold'>Date: <span className='underline'>{DateToString(ekonsulta.operationDate2)}</span></p>
                        </div>
                    </div>

                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>SCREENING</p>
                        </div>
                        <div className='p-1'>
                            <p className='text-[13px] font-semibold'>Visual Acuity: <span className='underline'>{ekonsulta.visualAcuity}</span> <span className='text-[11px]'>(20/20 vision normal value)</span></p>
                            <div className='flex items-center gap-5 mt-3'>
                                <p className='text-[13px] font-semibold'>Basic Hearing Test: <span className='underline'>{ekonsulta.basicHearingTest}</span></p>
                                <p className='text-[13px] font-semibold'>Newborn Hearing Test: <span className='underline'>{ekonsulta.newbornHearingTest}</span></p>
                            </div>
                        </div>
                        <div className='flex gap-2 justify-between px-1'>
                            <div className='flex gap-2 items-center'>
                                <label className='font-semibold text-[13px]'>Prostate Cancer Screening Done:</label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.prostateCancerScreeningDone == true} name='prostateCancerScreeningDone' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[13px]">Yes</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.prostateCancerScreeningDone == false} name='prostateCancerScreeningDone' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[13px]">No</span>
                                </label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <label className='font-semibold text-[13px]'>HIV/AIDS Screening Done:</label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.hivAidsScreeningDone == true} name='hivAidsScreeningDone' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[13px]">Yes</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.hivAidsScreeningDone == false} name='hivAidsScreeningDone' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[13px]">No</span>
                                </label>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center px-1'>
                            <label className='font-semibold text-[13px]'>Prostate Cancer Screening Done:</label>
                            <label className="label cursor-pointer flex gap-2">
                                <input type="checkbox" checked={ekonsulta.prostateCancerScreeningDone == true} name='prostateCancerScreeningDone' className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[13px]">Yes</span>
                            </label>
                            <label className="label cursor-pointer flex gap-2">
                                <input type="checkbox" checked={ekonsulta.prostateCancerScreeningDone == false} name='prostateCancerScreeningDone' className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[13px]">No</span>
                            </label>
                        </div>
                    </div>
                    <div className='border mt-3 border-black min-h-[90px]'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>DEVELOPMENTAL AND MENTAL HEALTH EVALUATION</p>
                        </div>
                        <p className='text-[13px] font-semibold p-1'>{ekonsulta.developmentalAndMentalEvaluation}</p>
                    </div>
                    <div className='border mt-3 border-black min-h-[90px]'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>LABORATORY EXAMINATION</p>
                        </div>
                        <div className='flex'>
                            <div className='w-1/3 border border-r-1'>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.expandedNewbornScreening} name='expandedNewbornScreening' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Expanded Newborn Screening</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.CBC2} name='CBC2' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">CBC</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.bloodType} name='bloodType' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Blood Type</span>
                                    <span className='label-text text-[8px]'>{ekonsulta.bloodTypeSpecify}</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.FBS} name='FBS' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">FBS</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.sputumMicroscopy} name='sputumMicroscopy' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Sputum Microscopy</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.slitSkinSmear} name='slitSkinSmear' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Slit-skin Smear</span>
                                </label>
                            </div>
                            <div className='w-1/3 border border-r-1'>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.totalCholesterol} name='totalCholesterol' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Total Cholesterol</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.hdlCholesterol} name='hdlCholesterol' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">HDL Cholesterol</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.serumandBun} name='serumandBun' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Serum Creatinine and BUN</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.routineUrinalysis} name='routineUrinalysis' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Routine Urinalysis</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.katoKatz} name='katoKatz' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Kato-Katz for Schistosomiasis</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2 justify-start">
                                    <input type="checkbox" checked={ekonsulta.rapidPlasma} name='rapidPlasma' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Rapid Plasma Reagin For Syphilis</span>
                                </label>
                            </div>
                            <div className='w-1/3 border'>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.igmAndIgG} name='igmAndIgG' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Igm and IgG Dengue Test</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.nonStructure} name='nonStructure' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Non-structure protein 1 (NS1)</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.hepaB} name='hepaB' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Hepa B Rapid Test</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.fecalysis} name='fecalysis' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Fecalysis</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.malarialSmear} name='malarialSmear' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Malarial Smear</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.nucleicAndAmplification} name='nucleicAndAmplification' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Nucleic acid amplification test</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>FAMILY HISTORY</p>
                        </div>
                        <div className='flex'>
                            <div className='w-1/5 border-r-[1px] border-black p-1'>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Allergy</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.allergy} name='allergy' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Asthma</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.cancer} name='cancer' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Cancer, specify organ</span>
                                </label>
                                <span className='text-[8px] underline ml-4 mt-0'>{ekonsulta.cancerSpecify}</span>

                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.cerebrovascular} name='cerebrovascular' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Cerebrovascular Diseases</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.coronary} name='coronary' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Coronary Artery Disease</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.diabetes} name='diabetes' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Diabetes Melitus</span>
                                </label>
                            </div>
                            <div className='w-1/5 border-r-[1px] border-black p-1'>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.emphysema} name='emphysema' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Emphysema</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.epilepsy} name='epilepsy' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Epilepsy/Seizure Disorder</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.hepatitis} name='hepatitis' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Hepatitis, specify type</span>
                                </label>
                                {/* <span className='text-[8px] underline ml-4 mt-0'>{ekonsulta.hepatitisSpecify}</span> */}

                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.hyperlipidemia} name='hyperlipidemia' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Hyperlipidemia</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.hypertension} name='hypertension' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Hypertension, highest BP</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.pepticUlcer} name='pepticUlcer' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Peptic Ulcer Disease</span>
                                </label>
                            </div>
                            <div className='w-1/5 border-r-[1px] border-black p-1'>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.pneumonia} name='pneumonia' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Pneumonia</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.thyroid} name='thyroid' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Thyroid Diseases</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.TB} name='TB' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">TB, specify organ</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.ifPTB} name='ifPTB' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">If PTB what category</span>
                                    <span className='text-[8px] underline ml-4 mt-0'>{ekonsulta.ifPTBSpecify}</span>
                                </label>
                                <label className="label cursor-pointer flex justify-start gap-2">
                                    <input type="checkbox" checked={ekonsulta.Others} name='Others' className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[8px]">Others</span>
                                </label>
                            </div>
                            <div className='w-1/5 border-r-[1px] border-black p-1'>
                                <label className="label cursor-pointer flex justify-between gap-2">
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.allergy} name='allergy' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Allergy (Food)</span>
                                    </div>
                                </label>
                                <label className="label cursor-pointer flex justify-between gap-2">
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.DrugBl} name='DrugBl' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Allergy (Drug)</span>
                                    </div>
                                </label>
                                <label className="label cursor-pointer flex justify-between gap-2">
                                    <div className="flex justify-start gap-2">
                                        <input checked={ekonsulta.DisabilityBl} name='DisabilityBl' type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Disability</span>
                                    </div>
                                </label>
                                <label className="label cursor-pointer flex justify-between gap-2">
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.DrugBl} name='DrugBl' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Drug</span>
                                    </div>
                                </label>
                                <label className="label cursor-pointer flex justify-between gap-2">
                                    <div className="flex justify-start gap-2">
                                        <input checked={ekonsulta.HandicapBl} name='HandicapBl' type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Handicap</span>
                                    </div>
                                </label>
                                <label className="label cursor-pointer flex justify-between gap-2">
                                    <div className="flex justify-start gap-2">
                                        <input checked={ekonsulta.ImpairmentBl} name='ImpairmentBl' type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Impairment</span>
                                    </div>
                                </label>
                            </div>
                            <div className='w-1/5 border-r-[1px] border-black p-1'>
                                <span className="label-text text-[8px]">{ekonsulta.allergySpecify}</span>
                                <span className="label-text text-[8px]">{ekonsulta.allergyDrugs}</span>
                                <span className="label-text text-[8px]">{ekonsulta.Disability}</span>
                                <span className="label-text text-[8px]">{ekonsulta.Handicap}</span>
                                <span className="label-text text-[8px]">{ekonsulta.Impairment}</span>
                            </div>
                        </div>
                    </div>
                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>RISKY PRACTICES LEADING TO LIFESTYLE-RELATED DISEASES</p>
                        </div>
                        <div className='flex'>
                            <div className='w-3/4'>
                                <div className='flex border border-b-[1px] border-black'>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1'>Smoking</div>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1 flex justify-between'>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="Yes" checked={ekonsulta.smoking == "Yes"} name='smoking' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Yes</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="No" checked={ekonsulta.smoking == "No"} name='smoking' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">No</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="Quit" checked={ekonsulta.smoking == "Quit"} name='smoking' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Quit</span>
                                        </label>
                                    </div>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1 flex justify-center items-center'>
                                        <span className="label-text text-[13px]">No. of sticks/day: {ekonsulta.number_of_sticks}</span>
                                    </div>
                                </div>
                                <div className='flex border border-b-[1px] border-black'>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1'>Alcohol</div>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1 flex justify-between'>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="Yes" checked={ekonsulta.alcohol == "Yes"} name='alcohol' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Yes</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="No" checked={ekonsulta.alcohol == "No"} name='alcohol' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">No</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="Quit" checked={ekonsulta.alcohol == "Quit"} name='alcohol' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Quit</span>
                                        </label>
                                    </div>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1 flex justify-center items-center'>
                                        <span className="label-text text-[13px]">No. of bottles/day: {ekonsulta.number_of_bottles}</span>
                                    </div>
                                </div>
                                <div className='flex border border-b-[1px] border-black'>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1'>Illicit Drugs</div>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1 flex justify-between'>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="Yes" checked={ekonsulta.illicit_drugs == "Yes"} name='illicit_drugs' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Yes</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="No" checked={ekonsulta.illicit_drugs == "No"} name='illicit_drugs' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">No</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2">
                                            <input type="checkbox" value="Quit" checked={ekonsulta.illicit_drugs == "Quit"} name='illicit_drugs' className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Quit</span>
                                        </label>
                                    </div>
                                    <div className='w-1/3 border-r-[1px] border-black text-[13px] px-1 flex justify-center items-center'>
                                        <span className="label-text text-[13px] text-center">No. of packs/day: {ekonsulta.no_of_packs}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/4 p-1 border border-l-0 border-black'>
                                <p className='m-0 text-[13px]'>
                                    Note: Administering RHU staff should fill up an NCD Risk Assessment Form if the client is 20 years old and above
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>PERTINENT P.E. FINDINGS</p>
                        </div>
                        <div>
                            <div className='flex'>
                                <div className='border p-1 w-[30%] text-[13px]'>Skin</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.skinPallor} name='skinPallor' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Pallor</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.skinRashes} name='skinRashes' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Rashes</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.skinJaundice} name='skinJaundice' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Jaundice</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.skinGoodSkinTurgor} name='skinGoodSkinTurgor' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Good Skin Turgor</span>
                                    </div>
                                </div>

                            </div>
                            <div className='flex'>
                                <div className='border w-[30%] text-[13px] flex items-center px-1'>Heent</div>
                                <div className='border p-1 flex-1 flex flex-wrap justify-between gap-2'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentAnicteric} name='heentAnicteric' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Ancient Sclera</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentIntactTympanic} name='heentIntactTympanic' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Intact Tympanic Membrane</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentExudates} name='heentExudates' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Exudates</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentPupils} name='heentPupils' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Pupils brisky reactive to light</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentTonsil} name='heentTonsil' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Tonsil Pharyngeal Congestion</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentAuralDischarge} name='heentAuralDischarge' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Aural Discharge</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentNasalDischarge} name='heentNasalDischarge' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Nasal Discharge</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentPalpableMass} name='heentPalpableMass' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Palpable Mass</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex '>
                                <div className='border p-1 w-[30%] text-[13px]'>Chest/Lungs</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestSymmetrical} name='chestSymmetrical' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Symmetrical Chest Expansion</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestClearBreath} name='chestClearBreath' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Clear Breath Sounds</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestRetractions} name='chestRetractions' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Retractions</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestCrackles} name='chestCrackles' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Crackles/rales</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestWheeze} name='chestWheeze' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Wheeze</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='border p-1 w-[30%] text-[13px]'>Heart</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heartAdynamic} name='heartAdynamic' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Adymanic Precordium</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heartMurmurs} name='heartMurmurs' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Mumurs</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heartNormalRate} name='heartNormalRate' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Normal Rate Regular Rhythm</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heartHeaves} name='heartHeaves' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">heavey/Thrils</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='border p-1 w-[30%] text-[13px]'>Abdomen</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenFlat} name='abdomenFlat' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Flat</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenGlobular} name='abdomenGlobular' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Globular</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenFlabby} name='abdomenFlabby' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Flabby</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenMuscleGuarding} name='abdomenMuscleGuarding' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Muscle Guarding</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenTenderness} name='abdomenTenderness' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Tenderness</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenPalpableMass} name='abdomenPalpableMass' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Palpable Mass</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='border p-1 w-[30%] text-[13px]'>Extremities</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.extremetiesGrossDeformity} name='extremetiesGrossDeformity' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Gross Deformity</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.extremetiesNormalGait} name='extremetiesNormalGait' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Normal Gait</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.extremetiesFullEqualPulse} name='extremetiesFullEqualPulse' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Full Equal pulses</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='border p-1 w-[30%] text-[13px]'>Neurological</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalNormal} name='neurologicalNormal' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Normal</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalDevelopmental} name='neurologicalDevelopmental' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Development Delay</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalSeizures} name='neurologicalSeizures' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Seizures</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalMotorDeficit} name='neurologicalMotorDeficit' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Motor Deficit</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalSensoryDeficit} name='neurologicalSensoryDeficit' className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[7px]">Sensory Deficit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>DIAGNOSIS</p>
                        </div>
                        <div className='min-h-[60px] p-1'>
                            <p className='text-[13px]'>
                                {ekonsulta.diagnosis}
                            </p>
                        </div>
                    </div>
                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>TREATMENT</p>
                        </div>
                        <div className='min-h-[60px] p-1'>
                            <p className='text-[13px]'>
                                {ekonsulta.treatment}
                            </p>
                        </div>
                    </div>

                    <div className='flex mt-3'>
                        <p className='text-[13px] w-1/2'>Health Care Provider: <span className='underline'>{ekonsulta.healthcareProvider}</span></p>
                        <p className='text-[13px] w-1/2'>Administered By: <span className='underline'>{ekonsulta.administeredBy}</span></p>
                    </div>
                    <div className='border mt-3 border-black'>
                        <div className='border-b-[1px] border-black p-1'>
                            <p className='text-[13px] font-semibold'>PATIENT CONSENT</p>
                        </div>
                        <p className='text-[13px] p-1'>
                            Nagapasugot ako sa pasibilidad nga dya nga iga-encode ang dya nga mga impormasyon sa -clinicsys kag iga padara sa PhilHealth ukon Department of Health
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
