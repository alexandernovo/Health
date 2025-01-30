import React, { useRef, useState, useEffect } from 'react'
import ReactToPrint from "react-to-print";
import logoMaternal from '@assets/images/logo-maternal.png'
import logDepartment from '@assets/images/departmenthealth_logo.png'
import { HypertensiveModel, HypertensiveModelInitialValue } from '@/types/hypertensive';
import { AppointmentModel } from '@/types/appointmentType';
import axios from 'axios';
import { DateToString, calculateAge } from '@/utils/DateFunction';
import { getMiddleInitial } from '@/utils/CommonFunctions';

interface HypertensiveReportProps {
    appointment_id?: string
}
const HypertensiveReport: React.FC<HypertensiveReportProps> = (props: HypertensiveReportProps) => {
    const contentToPrint = useRef(null);
    const [hypertensivemodel, setHypertensiveModel] = useState<HypertensiveModel>(HypertensiveModelInitialValue);
    const token: string | null = localStorage.getItem("token");
    const [appointment, setAppointment] = useState<AppointmentModel>({});

    useEffect(() => {
        getHypertensiveData();
        fetchAppointmentDetails();
    }, []);

    const getHypertensiveData = async () => {
        const response = await axios.get(`/api/hypertensive/getHypertensiveData/${props.appointment_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response.data.status == "success") {
            console.log(response.data.hypertensive);
            setHypertensiveModel(response.data.hypertensive);
        }
    }

    const fetchAppointmentDetails = async () => {
        const response = await axios.get(`/api/appointment/getAppointmentById/${props.appointment_id}`, {
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
        <div>
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
                        <h1>HYPERTENSIVE / DIABETIC RECORD</h1>
                    </div>
                    <div className='mt-5 flex gap-2'>
                        <p className='text-[11px] flex flex-col w-[25%]  font-semibold gap-1 table'>
                            <span className='table-cell w-[40px]'>Name:</span>
                            <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.firstname} {getMiddleInitial(appointment.middlename || '')} {appointment.lastname} {appointment.extension || ''} </span>
                        </p>

                        <p className='text-[11px] flex flex-col w-[25%]  font-semibold gap-1 table'>
                            <span className='table-cell w-[74px]'>Date of Birth:</span>
                            <span className='table-cell border-b-[1px] font-semibold border-black'>{DateToString(appointment.birthdate)}</span>
                        </p>

                        <p className='text-[11px] flex flex-col w-[10%]  font-semibold gap-1 table'>
                            <span className='table-cell w-[28px]'>Age:</span>
                            <span className='table-cell border-b-[1px] font-semibold border-black'>{calculateAge(appointment.birthdate)}</span>
                        </p>

                        <p className='text-[11px] flex flex-col w-[10%]  font-semibold gap-1 table'>
                            <span className='table-cell w-[28px]'>Sex:</span>
                            <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.gender == "Male" ? 'M' : 'F'}</span>
                        </p>

                        <p className='text-[11px] flex flex-col w-[30%]  font-semibold gap-1 table'>
                            <span className='table-cell w-[52px]'>Address:</span>
                            <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.address}</span>
                        </p>
                    </div>

                    <p className='mt-3 font-semibold text-[11px]'>MEDICATION TAKEN</p>
                    <div className='flex items-center justify-between '>
                        <div className="form-control">
                            <label className="label cursor-pointer flex gap-2">
                                <input readOnly type="checkbox" name="amlodipine" checked={hypertensivemodel.amlodipine} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[8px]">AMLODIPINE</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer flex gap-2">
                                <input readOnly type="checkbox" name="losartan" checked={hypertensivemodel.losartan} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[8px]">LOSARTAN</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer flex gap-2">
                                <input readOnly type="checkbox" name="metroprolol" checked={hypertensivemodel.metroprolol} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[8px]">METROPROLOL</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer flex gap-2">
                                <input readOnly type="checkbox" name="simvastatin" checked={hypertensivemodel.simvastatin} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[8px]">SIMVASTIN</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer flex gap-2">
                                <input readOnly type="checkbox" name="gliclazide" checked={hypertensivemodel.gliclazide} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[8px]">GLICLAZIDE</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer flex gap-2">
                                <input readOnly type="checkbox" name="metformin" checked={hypertensivemodel.metformin} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[8px]">METFORMIN</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer flex gap-2">
                                <input readOnly type="checkbox" name="insulin" checked={hypertensivemodel.insulin} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[8px]">INSULIN</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer flex gap-2">
                                <input readOnly type="checkbox" name="others" checked={hypertensivemodel.others} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[8px]">OTHERS: </span>
                            </label>
                        </div>

                        <p className='text-[8px] flex flex-col w-[25%]  font-semibold gap-1 table'>
                            <span className='table-cell border-b-[1px] font-semibold border-black'>{hypertensivemodel.othersDescription}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HypertensiveReport
