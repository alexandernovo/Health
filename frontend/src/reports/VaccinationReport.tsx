import React, { useState, useRef, useEffect } from 'react'
import ReactToPrint from "react-to-print";
import logoMaternal from '@assets/images/logo-maternal.png'
import logDepartment from '@assets/images/departmenthealth_logo.png'
import { AppointmentModel } from '@/types/appointmentType';
import { VaccinationModel, VaccinationModelInitialValue } from '@/types/vaccination';
import { OtherVaccinesModel, OtherVaccinesModelInitialValue } from '@/types/otherVaccines';
import { DateToString, calculateAge } from '@/utils/DateFunction';
import axios from 'axios';
import { getMiddleInitial } from '@/utils/CommonFunctions';

interface VaccinationReportProps {
    appointment_id?: string
}

const VaccinationReport: React.FC<VaccinationReportProps> = (props: VaccinationReportProps) => {
    const contentToPrint = useRef(null);
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const [vaccination, setVaccination] = useState<VaccinationModel>(VaccinationModelInitialValue);
    const [otherVaccines, setOtherVaccines] = useState<OtherVaccinesModel[]>([]);
    const token: string | null = localStorage.getItem("token");

    useEffect(() => {
        fetchAppointmentDetails();
        fetchVaccinationRecord();
    }, [])
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

    const fetchVaccinationRecord = async () => {
        const response = await axios.get(`/api/vaccination/getVaccinationOneRecord/${props.appointment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.data.status == 'success') {
            setVaccination(response.data.vaccination);
            console.log(response.data.vaccination.othervaccines);
            setOtherVaccines(response.data.vaccination.othervaccines);
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
            <div className='flex justify-center'>
                <div className='w-[8.5in] flex justify-end'>
                    <div className='flex justify-center'>
                        <div className='report-card border-[0.5px] w-[8.5in] bg-white p-5 pt-[30px] px-[40px] rounded-[4px] shadow-sm mb-5' ref={contentToPrint}>
                            <div className='flex justify-center items-center gap-5'>
                                <img src={logoMaternal} className='w-[70px] h-[70px]' />
                                <div className='text-center font-semibold'>
                                    <h1>BARBAZA RURAL HEALTH UNIT</h1>
                                    <h2>Barbaza, Antique</h2>
                                </div>
                                <img src={logDepartment} className='w-[70px] h-[70px]' />
                            </div>

                            <div className='bg-gray-700 text-center mt-[40px] py-1 text-white'>
                                {
                                    calculateAge(appointment.birthdate) >= 60 ?
                                        (
                                            <h1>BAKUNADO si Lolo at Lola Iwas Pulmonya</h1>
                                        )
                                        :
                                        (
                                            <h1>NATIONAL SCHOOL-BASED IMMUNIZATION PROGRAM</h1>
                                        )
                                }
                            </div>
                            {calculateAge(appointment.birthdate) >= 60 && (
                                <>
                                    <div className='mt-3'>
                                        <div className='w-full'>
                                            <p className='text-[13px] flex w-[100%] gap-1 table'>
                                                <span className='table-cell w-[300px] font-semibold'>Name and Signature of vaccinator (60 taon):</span>
                                                <span className='table-cell border-b-[1px] border-black'>{vaccination.nameOfVaccinator60}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <div className='w-full'>
                                            <p className='text-[13px] flex w-[100%] gap-1 table'>
                                                <span className='table-cell w-[300px] font-semibold'>Name and Signature of vaccinator (65 taon):</span>
                                                <span className='table-cell border-b-[1px] border-black'>{vaccination.nameOfVaccinator65}</span>
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className='mt-3'>
                                <p className='text-[12px] '>Name: <span className='underline font-semibold'>{appointment.firstname} {getMiddleInitial(appointment.middlename || '')} {appointment.lastname} {appointment.extension || ''}</span></p>
                                <p className='text-[12px]  mt-2'>Date of Birth: <span className='underline font-semibold'>{DateToString(appointment.birthdate)}</span></p>
                                <p className='text-[12px]  mt-2'>Address: <span className='underline font-semibold'>{appointment.address}</span></p>
                            </div>

                            {calculateAge(appointment.birthdate) >= 60 && (
                                <>
                                    <div className='mt-4'>
                                        <p className='text-[14px] font-semibold'>Additional Health Information</p>
                                    </div>
                                    <div className='mt-2'>
                                        <div className='flex gap-3'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" checked={vaccination.Diabetes} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[13px] font-semibold">Diabetes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" checked={vaccination.Hypertension} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[13px] font-semibold">Hypertension</span>
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className='mt-4'>
                                <p className='text-[14px] font-semibold'>Other Vaccines</p>
                            </div>
                            <div className='mt-3'>
                                <table className='w-full border text-[12px]'>
                                    <thead>
                                        <tr className='bg-gray-700'>
                                            <th className='border font-semibold text-start p-2 text-white'>
                                                {calculateAge(appointment.birthdate) >= 60 ? (
                                                    <span>Type</span>
                                                ) : (
                                                    <span>Vaccination Type</span>
                                                )
                                                }
                                            </th>
                                            <th className='border font-semibold text-start p-2 text-white'>
                                                {calculateAge(appointment.birthdate) >= 60 ? (
                                                    <span>Date Given</span>
                                                ) : (
                                                    <span>Date</span>
                                                )}
                                            </th>
                                            <th className='border font-semibold text-start p-2 text-white'>Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {otherVaccines.length > 0 && otherVaccines.map((others) => (
                                            <tr key={others.otherVaccinesId}>
                                                <td className='border p-2'>{others.otherType}</td>
                                                <td className='border p-2'>{DateToString(others.otherDateGiven)}</td>
                                                <td className='border p-2'>{others.otherRemarks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-2'>
                                <p className='text-[12px] font-semibold'>In case of emergency please contact:</p>
                                <p className='text-[11px] mt-1 font-semibold'>Name: {vaccination.emergencyName}<span className='underline'></span></p>
                                <p className='text-[11px] mt-1 font-semibold'>Contact No./Address:{vaccination.emergencyContact} <span className='underline'></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VaccinationReport
