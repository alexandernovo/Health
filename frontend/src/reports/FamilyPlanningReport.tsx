import React, { useRef, useState, useEffect } from 'react'
import logoMaternal from '@assets/images/logo-maternal.png'
import logDepartment from '@assets/images/departmenthealth_logo.png'
import { AppointmentModel } from '@/types/appointmentType';
import { FamilyAssessmentModel, FamilyAssessmentModelInitialValue } from '@/types/familyAssessment'
import { FamilyPlanningModel, FamilyPlanningModelInitialValue } from '@/types/familyPlanning'
import axios from 'axios';
import ReactToPrint from "react-to-print";
import { DateToString, calculateAge } from '@/utils/DateFunction';
import { getMiddleInitial } from '@/utils/CommonFunctions';

interface FamilyPlanningReportProps {
    appointment_id?: string
}
const FamilyPlanningReport: React.FC<FamilyPlanningReportProps> = (props: FamilyPlanningReportProps) => {
    const contentToPrint = useRef(null);
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const [familyAssessmentModelList, setFamilyAssessmentModelList] = useState<FamilyAssessmentModel[]>([]);
    const [familyPlanningModel, setFamilyPlanningModel] = useState<FamilyPlanningModel>(FamilyPlanningModelInitialValue);
    const token: string | null = localStorage.getItem("token");

    useEffect(() => {
        fetchAppointmentDetails();
        fetchFamilyPlanning();
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

    const fetchFamilyPlanning = async () => {
        const response = await axios.get(`/api/family/getFamilyPlanningOne/${props.appointment_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        if (response.data.status == 'success') {
            setFamilyPlanningModel(response.data.familyplanning);
            setFamilyAssessmentModelList(response.data.familyplanning.familyassessment);
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
                        <h1>Family Planning Record</h1>
                    </div>

                    <div className='border mt-2 border-black'>
                        <div className='flex bg-[lightgray] border-b-[1px] border-black'>
                            <div className='w-[50%] border-r-[1px] border-black p-1'>
                                <h3 className='font-bold text-[13px]'>FAMILY PLANNING CLIENT ASSESSMENT RECORD</h3>
                                <p className='text-[11px]'>Instructions for Physicians, Nurses and Midwives. <span className='font-semibold'>Make sure that the client is not pregnant by using the question listed in SIDE B.</span> Completely fill out or check the required information. Refer accordingly for any abnormal history/findings for further medical evaluation.</p>
                            </div>
                            <div className='w-[50%] p-2 text-[11px]'>
                                <p className='font-semibold'>CLIENT ID: <span className='underline'>687</span></p>
                                <p className='font-semibold mt-3'>PHILHEALTH NO:: <span className='underline'>687</span></p>

                                <div className='flex items-center gap-1 mt-2 h-[22px]'>
                                    <b>NHTS?:</b>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input readOnly type="checkbox" name='NHTS' value={1} checked={familyPlanningModel.NHTS == 1} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[9px]">YES</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input readOnly type="checkbox" name='NHTS' value={1} checked={familyPlanningModel.NHTS == 0} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[9px]">NO</span>
                                    </label>
                                </div>
                                <div className='flex items-center gap-1 h-[22px]'>
                                    <b>Pantawid Pamilya Pilipino Program(4ps):</b>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input readOnly type="checkbox" name='pantawid4ps' value={1} checked={familyPlanningModel.pantawid4ps == 1} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[9px]">YES</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input readOnly type="checkbox" name='pantawid4ps' value={1} checked={familyPlanningModel.pantawid4ps == 0} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[9px]">NO</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='p-1'>
                            <div className='flex gap-2'>
                                <p className='text-[11px] flex w-[40%] font-semibold gap-1 table'>
                                    <span className='table-cell w-[95px] font-semibold'>NAME OF CLIENT:</span>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.firstname} {getMiddleInitial(appointment.middlename || '')} {appointment.lastname} {appointment.extension || ''} </span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[15%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{DateToString(appointment.birthdate)}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[5%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black text-center'>{calculateAge(appointment.birthdate)}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[20%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.education}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[20%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.occupation}</span>
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <p className='w-[40%]'></p>
                            <p className='w-[15%] text-[10px] text-center'>Date of Birth</p>
                            <p className='w-[5%] text-[10px] text-center'>Age</p>
                            <p className='w-[20%] text-[10px] text-center'>Educ. Attain.</p>
                            <p className='w-[20%] text-[10px] text-center'>Occupation</p>
                        </div>

                        <div className='p-1'>
                            <div className='flex gap-2'>
                                <p className='text-[11px] flex w-[40%] font-semibold gap-1 table'>
                                    <span className='table-cell w-[60px] font-semibold'>ADDRESS:</span>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.address}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[15%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.contact_number}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[20%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.civil_status}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[25%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.religion}</span>
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <p className='w-[40%]'></p>
                            <p className='w-[15%] text-[10px] text-center'>Contact Number</p>
                            <p className='w-[20%] text-[10px] text-center'>Civil Status</p>
                            <p className='w-[25%] text-[10px] text-center'>Religion.</p>
                        </div>
                        <div className='p-1'>
                            <div className='flex gap-2'>
                                <p className='text-[11px] flex w-[40%] font-semibold gap-1 table'>
                                    <span className='table-cell w-[100px] font-semibold'>NAME OF SPOUSE:</span>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{familyPlanningModel.spouseName}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[15%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{familyPlanningModel.spouseDateofBirth}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[10%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{familyPlanningModel.spouseAge}</span>
                                </p>
                                <p className='text-[11px] flex flex-col w-[35%]  font-semibold gap-1 table'>
                                    <span className='table-cell border-b-[1px] font-semibold border-black'>{familyPlanningModel.spouseOccupation}</span>
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <p className='w-[40%]'></p>
                            <p className='w-[15%] text-[10px] text-center'>Date of Birth</p>
                            <p className='w-[10%] text-[10px] text-center'>Age</p>
                            <p className='w-[35%] text-[10px] text-center'>Occupation</p>
                        </div>

                        <div className='flex gap-2 justify-start px-1'>
                            <div className='flex items-center'>
                                <label className='font-semibold text-[10px]'>NO. OF LIVING CHILDREN: </label>
                                <p className="label-text text-[10px] underline ms-1 text-black">{familyPlanningModel.noLivingChildren}</p>
                            </div>

                            <label className="label cursor-pointer flex gap-2">
                                <span className="label-text text-[10px]"><b>PLAN TO HAVE MORE CHILDREN?</b></span>
                                <input readOnly type="checkbox" name='planToHaveMoreChildren' value={1} checked={familyPlanningModel.planToHaveMoreChildren == 1} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[10px]"><b>YES</b></span>
                                <input readOnly type="checkbox" name='planToHaveMoreChildren' value={0} checked={familyPlanningModel.planToHaveMoreChildren == 0} className="checkbox checkbox-default checkbox-xs" />
                                <span className="label-text text-[10px]"><b>NO</b></span>
                            </label>

                            <div className='flex items-center justify-start gap-2'>
                                <label className='text-[10px]'><b>AVERAGE MONTHLY INCOME:</b></label>
                                <p className="label-text text-[10px] underline text-black">{familyPlanningModel.averageIncome}</p>
                            </div>
                        </div>
                        <div className='p-1 border-t-[1px] border-black'>
                            <div>
                                <p className='font-semibold text-[12px]'>Type of Client</p>
                            </div>
                            <div>
                                <div className='flex gap-5'>
                                    <div className='w-[50%]'>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2">
                                                <input readOnly name='typeOfClient' value="New Acceptor" checked={familyPlanningModel.typeOfClient == "New Acceptor"} type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">New Acceptor</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2">
                                                <span className="label-text text-[8px]"><b>| Reason for FP:</b></span>
                                                <input readOnly type="checkbox" checked={familyPlanningModel.typeReason == "spacing"} name='typeReason' value="spacing" className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">spacing</span>
                                                <input readOnly type="checkbox" checked={familyPlanningModel.typeReason == "limiting"} name='typeReason' value="limiting" className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">limiting</span>
                                                <input readOnly type="checkbox" checked={familyPlanningModel.typeReason == "others"} name='typeReason' value="others" className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">others</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly name='typeOfClient' value="Current User" checked={familyPlanningModel.typeOfClient == "Current User"} type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Current User</span>
                                            </label>
                                        </div>
                                        <div className='ml-4'>
                                            <div className="flex items-center">
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly value="Changing Method" name='typeCurrentUser' checked={familyPlanningModel.typeCurrentUser == "Changing Method"} type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">Changing Method</span>
                                                </label>
                                                <span className="label-text text-[8px]"><b>| Reason: </b></span>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly checked={familyPlanningModel.typeReason == "medical condition"} name='typeReason' value="medical condition" type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">medical condition</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly checked={familyPlanningModel.typeReason == "side effects"} name='typeReason' value="side effects" type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">side effects</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly value="Changing Clinic" name='typeCurrentUser' checked={familyPlanningModel.typeCurrentUser == "Changing Clinic"} type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">Changing Clinic</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly value="Dropout Restart" name='typeCurrentUser' checked={familyPlanningModel.typeCurrentUser == "Dropout Restart"} type="checkbox" className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">Dropout Restart</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[50%]'>
                                        <p className="label-text text-[13px] font-semibold">Method currently used (for Changing Method):</p>
                                        <div className='flex gap-1'>
                                            <div className='w-[25%]'>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="COC" checked={familyPlanningModel.methodUsed == "COC"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">COC</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="POP" checked={familyPlanningModel.methodUsed == "POP"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">POP</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="Injectable" checked={familyPlanningModel.methodUsed == "Injectable"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">Injectable</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="Implant" checked={familyPlanningModel.methodUsed == "Implant"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">Implant</span>
                                                </label>
                                            </div>
                                            <div className='w-[25%]'>
                                                <li className='text-[10px] font-semibold'>IUD</li>
                                                <div className='ml-2'>
                                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                                        <input readOnly type="checkbox" name='methodUsed' value="Interval" checked={familyPlanningModel.methodUsed == "Interval"} className="checkbox checkbox-default checkbox-xs" />
                                                        <span className="label-text text-[8px]">Interval</span>
                                                    </label>
                                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                                        <input readOnly type="checkbox" name='methodUsed' value="Post-Partrum" checked={familyPlanningModel.methodUsed == "Post-Partrum"} className="checkbox checkbox-default checkbox-xs" />
                                                        <span className="label-text text-[8px]">Post-Partrum</span>
                                                    </label>
                                                </div>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="Condom" checked={familyPlanningModel.methodUsed == "Condom"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">Condom</span>
                                                </label>
                                            </div>
                                            <div className='w-[25%]'>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="BOM/CMM" checked={familyPlanningModel.methodUsed == "BOM/CMM"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">BOM/CMM</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="BBT" checked={familyPlanningModel.methodUsed == "BBT"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">BBT</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="STM" checked={familyPlanningModel.methodUsed == "STM"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">STM</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="SDM" checked={familyPlanningModel.methodUsed == "SDM"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">SDM</span>
                                                </label>
                                            </div>
                                            <div className='w-[25%]'>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name='methodUsed' value="LAM" checked={familyPlanningModel.methodUsed == "LAM"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[8px]">LAM</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <span className="label-text text-[8px]">others</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-[50%] text-[11px] px-5 border-t-[1px] border-b-[1px] border-r-[1px] border-black  py-2'><b>I. MEDICAL HISTORY</b></div>
                            <div className='w-[50%] text-[11px] px-5  border-t-[1px] border-b-[1px] border-black py-2'><b>IV. RISK FOR VIOLENCE AGAINST WOMEN (VAW)</b></div>
                        </div>

                        <div className='flex justify-between text-[12px]'>
                            <div className='w-[50%] border-black border-r-[1px] border-t-0 py-2'>
                                <div className='px-5'>
                                    <p>Does the client have any of the following?</p>

                                    <div className='flex justify-between items-center mt-2'>
                                        <li className='text-[9px]'>severe headaches / migrane</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalHeadache" value={1} checked={familyPlanningModel.medicalHeadache == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalHeadache" value={0} checked={familyPlanningModel.medicalHeadache == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>history of stroke / heart attack / hypertension</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalhistoryStroke" value={1} checked={familyPlanningModel.medicalhistoryStroke == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalhistoryStroke" value={0} checked={familyPlanningModel.medicalhistoryStroke == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>non-traumatic hematoma / frequent bruising or gum bleeding</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalHematoma" value={1} checked={familyPlanningModel.medicalHematoma == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalHematoma" value={0} checked={familyPlanningModel.medicalHematoma == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>current or history of breast cancer / breast mass</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalBreastCancer" value={1} checked={familyPlanningModel.medicalBreastCancer == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalBreastCancer" value={0} checked={familyPlanningModel.medicalBreastCancer == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>severe chest pain</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalsevereChestPain" value={1} checked={familyPlanningModel.medicalsevereChestPain == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalsevereChestPain" value={0} checked={familyPlanningModel.medicalsevereChestPain == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>cough for more than 14 days</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalcough14Days" value={1} checked={familyPlanningModel.medicalcough14Days == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalcough14Days" value={0} checked={familyPlanningModel.medicalcough14Days == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>jaundice</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalJaundice" value={1} checked={familyPlanningModel.medicalJaundice == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalJaundice" value={0} checked={familyPlanningModel.medicalJaundice == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>unexplained vaginal bleeding</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalVaginalBleeding" value={1} checked={familyPlanningModel.medicalVaginalBleeding == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalVaginalBleeding" value={0} checked={familyPlanningModel.medicalVaginalBleeding == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>abnormal vaginal discharge</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalVaginalDischarge" value={1} checked={familyPlanningModel.medicalVaginalDischarge == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalVaginalDischarge" value={0} checked={familyPlanningModel.medicalVaginalDischarge == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>intake of phenobarbital(anti-seizure) or rifampicin (anti-TB)</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalIntake" value={1} checked={familyPlanningModel.medicalIntake == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalIntake" value={0} checked={familyPlanningModel.medicalIntake == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>is the client a SMOKER?</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalClientSmoker" value={1} checked={familyPlanningModel.medicalClientSmoker == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalClientSmoker" value={0} checked={familyPlanningModel.medicalClientSmoker == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>With Disability?</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalDisability" value={1} checked={familyPlanningModel.medicalDisability == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="medicalDisability" value={0} checked={familyPlanningModel.medicalDisability == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex flex-col ml-3'>
                                        <p className='font-semibold text-[9px]'>If YES please specify: <span className='underline'>{familyPlanningModel.disabilitySpecify}</span></p>
                                    </div>
                                </div>
                                <div className='w-[full] px-5  border border-black border-r-0 border-l-0 mt-3 py-2'><b>II. OBSTETRICAL HISTORY</b></div>
                                <div className='px-5 py-2'>
                                    <div className='flex gap-2 items-center'>
                                        <p className='text-[9px]'>
                                            Number of Pregnancies:
                                        </p>
                                        <span className='text-[9px]'>G: <span className='underline'>{familyPlanningModel.numberPregnanciesG}</span></span>
                                        <span className='text-[9px]'>P: <span className='underline'>{familyPlanningModel.numberPregnanciesP}</span></span>
                                    </div>
                                    <div className='flex gap-2 mt-3'>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-[9px]'>Full Item: <span className='underline'>{familyPlanningModel.fullItem}</span></p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-[9px]'>Premature: <span className='underline'>{familyPlanningModel.premature}</span></p>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 mt-3'>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-[9px]'>Abortion: <span className='underline'>{familyPlanningModel.abortion}</span></p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-[9px]'>Living Children: <span className='underline'>{familyPlanningModel.livingChildren}</span></p>
                                        </div>
                                    </div>
                                    <div className='flex mt-3 gap-2 items-center'>
                                        <p className='text-[9px]'>Date of Last Delivery: <span className='underline'>{DateToString(familyPlanningModel.dateLastDelivery)}</span></p>
                                    </div>

                                    <div className='flex justify-start items-center mt-2'>
                                        <label className='text-[9px]'>Type of last delivery: </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="typeOfLastDelivery" value="Vaginal" checked={familyPlanningModel.typeOfLastDelivery == "Vaginal"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Vaginal</span>
                                        </label>

                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="typeOfLastDelivery" value="Cesarian Section" checked={familyPlanningModel.typeOfLastDelivery == "Cesarian Section"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">Cesarian Section</span>
                                        </label>
                                    </div>

                                    <div className='flex mt-2 gap-2 items-center'>
                                        <p className='text-[9px]'>Last menstrual period: <span className='underline'>{DateToString(familyPlanningModel.lastMenstrualPeriod)}</span></p>
                                    </div>

                                    <div className='flex mt-2 gap-2 items-center'>
                                        <p className='text-[9px]'>Previous menstrual period: <span className='underline'>{DateToString(familyPlanningModel.previousMenstrualPeriod)}</span></p>
                                    </div>

                                    <p className='mt-3 text-[9px]'>Menstrual flow:</p>

                                    <div className='ml-4'>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="menstrualFlow" value="scanty (1-2 pads per day)" checked={familyPlanningModel.menstrualFlow == "scanty (1-2 pads per day)"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">scanty (1-2 pads per day)</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="menstrualFlow" value="moderate (3-5 pads per day)" checked={familyPlanningModel.menstrualFlow == "moderate (3-5 pads per day)"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">moderate (3-5 pads per day)</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="menstrualFlow" value="(>5 pads per day)" checked={familyPlanningModel.menstrualFlow == "(>5 pads per day)"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[8px]">heavy {"(>5 pads per day)"}</span>
                                        </label>
                                    </div>

                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input readOnly type="checkbox" name="dysmenorrhea" checked={familyPlanningModel.dysmenorrhea == 1} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Dysmenorrhea</span>
                                    </label>

                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input readOnly type="checkbox" name="hydatidiform" checked={familyPlanningModel.hydatidiform == 1} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">Hydatidiform mole(within the last 12 months)</span>
                                    </label>

                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input readOnly type="checkbox" name="historyEctopicPregnancy" checked={familyPlanningModel.historyEctopicPregnancy == 1} className="checkbox checkbox-default checkbox-xs" />
                                        <span className="label-text text-[8px]">History of ectopic pregnancy</span>
                                    </label>
                                </div>
                                <div className='w-[full] px-5 border border-black border-l-0  border-r-0 mt-3 py-2'><b>III. RISK FOR SEXUALLY TRANSMITTED INFECTIONS</b></div>
                                <div className='px-5 py-2'>
                                    <p className='text-[9px]'>Does the client or the client's partner have any of the following?</p>

                                    <li className='flex justify-between items-center'>
                                        <span className='text-[9px]'>abnormal discharge from the genital area</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="abnormalDischarge" value={1} checked={familyPlanningModel.abnormalDischarge == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="abnormalDischarge" value={0} checked={familyPlanningModel.abnormalDischarge == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </li>

                                    <div className='ml-5 flex items-center'>
                                        <span className='text-[9px]'>if "YES" please indicate if from: </span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="indicateGenital" value="Vagina" checked={familyPlanningModel.indicateGenital == "Vagina"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Vagina</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="indicateGenital" value="Penis" checked={familyPlanningModel.indicateGenital == "Penis"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Penis</span>
                                            </label>
                                        </div>
                                    </div>

                                    <li className='flex justify-between items-center'>
                                        <span className='text-[9px]'>scores or ulcers in the genital area</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="scoresOrUlcer" value={1} checked={familyPlanningModel.scoresOrUlcer == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="scoresOrUlcer" value={0} checked={familyPlanningModel.scoresOrUlcer == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </li>

                                    <li className='flex justify-between items-center'>
                                        <span className='text-[9px]'>pain or burning sensation in the genital area</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="painOrBurningSensation" value={1} checked={familyPlanningModel.painOrBurningSensation == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="painOrBurningSensation" value={0} checked={familyPlanningModel.painOrBurningSensation == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </li>

                                    <li className='flex justify-between items-center'>
                                        <span className='text-[9px]'>history of treatment for sexually transmitted infections</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="historySexuallyTransmitted" value={1} checked={familyPlanningModel.historySexuallyTransmitted == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="historySexuallyTransmitted" value={0} checked={familyPlanningModel.historySexuallyTransmitted == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </li>

                                    <li className='flex justify-between items-center'>
                                        <span className='text-[9px]'>HIV / AIDS / Pelvic inflammatory disease</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="HivAids" value={1} checked={familyPlanningModel.HivAids == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="HivAids" value={0} checked={familyPlanningModel.HivAids == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[8px]">No</span>
                                            </label>
                                        </div>
                                    </li>
                                </div>
                                <hr className='border border-black border-t-0' />
                                <p className='px-5 py-2 text-[9px]'>Implant = Progestine subdermal implant; IUD = Infraterine device; BTL = Bilateral tubal ligation; NSV = No-scalpel vasectomy; COC = Combine oral contraceptives; POP = Progestin only pills; LAM = Lactational amenorrhea method; SDM = Standard days method; BBT = Basal body temperature; BOM = Billings ovulation method; CMM = Cervical mucus method; STM = Symptothermal method</p>
                            </div>
                            <div className='w-[50%]  border-black py-2 border-t-0'>
                                <div className='px-5'>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>unpleasant relationship with partner</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="unPleasantRelationshipPartner" value={1} checked={familyPlanningModel.unPleasantRelationshipPartner == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="unPleasantRelationshipPartner" value={0} checked={familyPlanningModel.unPleasantRelationshipPartner == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>partner does not approve of the visit to the FP clinic</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="partnerDoesNotApprove" value={1} checked={familyPlanningModel.partnerDoesNotApprove == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="partnerDoesNotApprove" value={0} checked={familyPlanningModel.partnerDoesNotApprove == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li className='text-[9px]'>history of domestic violence or VAW</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="VAW" value={1} checked={familyPlanningModel.VAW == 1} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="VAW" value={0} checked={familyPlanningModel.VAW == 0} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className='ml-5 w-full'>
                                        <div className="flex justify-start gap-2 w-full">
                                            <span className='mt-2 text-[9px]'>Referred to: </span>
                                            <div>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name="referedTo" value="DSDWD" checked={familyPlanningModel.referedTo == "DSDWD"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[9px]">DSDWD</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name="referedTo" value="WCPU" checked={familyPlanningModel.referedTo == "WCPU"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[9px]">WCPU</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name="referedTo" value="NGOs" checked={familyPlanningModel.referedTo == "NGOs"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[9px]">NGOs</span>
                                                </label>
                                                <div className='flex items-center w-full'>
                                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                                        <input readOnly type="checkbox" name="referedTo" value="Others Specify:" checked={familyPlanningModel.referedTo == "Others Specify:"} className="checkbox checkbox-default checkbox-xs" />
                                                        <span className="label-text text-[9px]">Others Specify: {familyPlanningModel.referedToOther}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[full] px-5  border border-black border-r-0 border-l-0 mt-2 py-2'><b>V. PHYSICAL EXAMINATION</b></div>
                                <div className='px-5 py-2'>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <label className='text-[9px]'>Weight: <span className='underline'>{familyPlanningModel.weight}</span></label>
                                        </div>
                                        <div className='flex items-center gap-2 w-[50%]'>
                                            <label className='text-[9px]'>Blood Pressure: <span className='underline'> {familyPlanningModel.bp}</span></label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div className='flex items-center gap-2'>
                                            <label className='text-[9px]'>Height: <span className='underline'>{familyPlanningModel.height}</span></label>
                                        </div>
                                        <div className='flex items-center gap-2 w-[50%]'>
                                            <label className='text-[9px]'>Pulse rate: <span className='underline'>{familyPlanningModel.pulseRate}</span></label>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex px-5'>
                                    <div className='w-[50%]'>
                                        <p className='font-semibold'>SKIN:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="skin" value="normal" checked={familyPlanningModel.skin == "normal"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="skin" value="pale" checked={familyPlanningModel.skin == "pale"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">pale</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="skin" value="yellowish" checked={familyPlanningModel.skin == "yellowish"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">yellowish</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="skin" value="hematoma" checked={familyPlanningModel.skin == "hematoma"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">hematoma</span>
                                        </label>

                                        <p className='font-semibold mt-2'>CONJUNCTIVA:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="conjunctiva" value="normal" checked={familyPlanningModel.conjunctiva == "normal"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="conjunctiva" value="pale" checked={familyPlanningModel.conjunctiva == "pale"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">pale</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="conjunctiva" value="yellowish" checked={familyPlanningModel.conjunctiva == "yellowish"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">yellowish</span>
                                        </label>

                                        <p className='font-semibold mt-2'>NECK:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="neck" value="normal" checked={familyPlanningModel.neck == "normal"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="neck" value="neck mass" checked={familyPlanningModel.neck == "neck mass"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">neck mass</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="neck" value="enlarge lymph nodes" checked={familyPlanningModel.neck == "enlarge lymph nodes"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">enlarge lymph nodes</span>
                                        </label>

                                        <p className='font-semibold mt-2'>BREAST:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="breast" value="normal" checked={familyPlanningModel.breast == "normal"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="breast" value="mass" checked={familyPlanningModel.breast == "mass"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">mass</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="breast" value="nipple discharge" checked={familyPlanningModel.breast == "nipple discharge"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">nipple discharge</span>
                                        </label>

                                        <p className='font-semibold mt-2'>ABDOMEN:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="abdomen" value="normal" checked={familyPlanningModel.abdomen == "normal"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="abdomen" value="abdominal mass" checked={familyPlanningModel.abdomen == "abdominal mass"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">abdominal mass</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="abdomen" value="varicosities" checked={familyPlanningModel.abdomen == "varicosities"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">varicosities</span>
                                        </label>
                                    </div>
                                    <div className='w-[50%]'>
                                        <p className='font-semibold mt-2'>EXTREMITIES:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="extremities" value="normal" checked={familyPlanningModel.extremities == "normal"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="extremities" value="edema" checked={familyPlanningModel.extremities == "edema"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">edema</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="extremities" value="varicosities" checked={familyPlanningModel.extremities == "varicosities"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">varicosities</span>
                                        </label>

                                        <p className='font-semibold mt-2'>PELVIC EXAMINATION:</p>
                                        <p className='italic'>(For IUD Acceptors)</p>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="normal" checked={familyPlanningModel.pelvicExamination == "normal"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">normal</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="mass" checked={familyPlanningModel.pelvicExamination == "mass"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">mass</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="abnormal discharge" checked={familyPlanningModel.pelvicExamination == "abnormal discharge"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">abnormal discharge</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="cervical abnormalities" checked={familyPlanningModel.pelvicExamination == "cervical abnormalities"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">cervical abnormalities</span>
                                        </label>

                                        <div className='ml-5'>
                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="cervicalAbnormal" value="warts" checked={familyPlanningModel.cervicalAbnormal == "warts"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">warts</span>
                                            </label>

                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="cervicalAbnormal" value="polyp or cyst" checked={familyPlanningModel.cervicalAbnormal == "polyp or cyst"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">polyp or cyst</span>
                                            </label>

                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="cervicalAbnormal" value="inflammation or erosion" checked={familyPlanningModel.cervicalAbnormal == "inflammation or erosion"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">inflammation or erosion</span>
                                            </label>

                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="cervicalAbnormal" value="bloody discharge" checked={familyPlanningModel.cervicalAbnormal == "bloody discharge"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">bloody discharge</span>
                                            </label>
                                        </div>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="cervical consistency" checked={familyPlanningModel.pelvicExamination == "cervical consistency"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">cervical consistency</span>
                                        </label>

                                        <div className='ml-5'>
                                            <div className='flex'>
                                                <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name="cervicalConsistency" value="firm" checked={familyPlanningModel.cervicalConsistency == "firm"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[9px]">firm</span>
                                                </label>
                                                <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                    <input readOnly type="checkbox" name="cervicalConsistency" value="soft" checked={familyPlanningModel.cervicalConsistency == "soft"} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[9px]">soft</span>
                                                </label>
                                            </div>
                                        </div>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="cervical tenderness" checked={familyPlanningModel.pelvicExamination == "cervical tenderness"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">cervical tenderness</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="adnexal mass/tenderness" checked={familyPlanningModel.pelvicExamination == "adnexal mass/tenderness"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">adnexal mass/tenderness</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="uterine position" checked={familyPlanningModel.pelvicExamination == "uterine position"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">uterine position</span>
                                        </label>

                                        <div className='ml-5'>
                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="uterinePosition" value="mid" checked={familyPlanningModel.uterinePosition == "mid"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">mid</span>
                                            </label>
                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="uterinePosition" value="anteflexed" checked={familyPlanningModel.uterinePosition == "anteflexed"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">anteflexed</span>
                                            </label>
                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input readOnly type="checkbox" name="uterinePosition" value="retroflexed" checked={familyPlanningModel.uterinePosition == "retroflexed"} className="checkbox checkbox-default checkbox-xs" />
                                                <span className="label-text text-[9px]">retroflexed</span>
                                            </label>
                                        </div>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input readOnly type="checkbox" name="pelvicExamination" value="uterine depth:" checked={familyPlanningModel.pelvicExamination == "uterine depth:"} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[9px]">uterine depth: {familyPlanningModel.uterineDepth}</span>
                                        </label>

                                    </div>
                                </div>
                                <hr className='border border-black border-t-0 mt-3'></hr>
                                <div className='px-5 py-2'>
                                    <p className='font-bold'>ACKNOWLEDGEMENT:</p>
                                    <p className='mt-2'>This is to certify that the Physician/Nurse/Midwife of the clinic has fully explained to me the different methods available in family planning and I freely choose the <span>{ }</span> method.</p>
                                    <div className='flex justify-center gap-5 mt-[30px]'>
                                        <div className='w-[40%] text-center'>
                                            <hr className='border border-black border-t-0'></hr>
                                            <p>Client Signature</p>
                                        </div>
                                        <div className='w-[40%] text-center'>
                                            <hr className='border border-black border-t-0'></hr>
                                            <p>Date</p>
                                        </div>
                                    </div>
                                    <p className='mt-2'>For WRA below 18 yrs. Old:</p>
                                    <p className=''>I hereby consent <span>{ }</span> to accept the Family Planning method.</p>

                                    <div className='flex justify-center gap-5 mt-[30px]'>
                                        <div className='w-[40%] text-center'>
                                            <hr className='border border-black border-t-0'></hr>
                                            <p>Parent/Guardian Signature</p>
                                        </div>
                                        <div className='w-[40%] text-center'>
                                            <hr className='border border-black border-t-0'></hr>
                                            <p>Date</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-2 print-adjust-margin'>
                        <div className='flex justify-between'>
                            <p className='font-semibold text-[11px]'>SIDE B</p>
                            <p className='font-semibold text-[11px] text-right'>FP FORM 1</p>
                        </div>
                        <table className='border-black mb-1 text-black text-[9px] text-center'>
                            <thead>
                                <tr className='border-black'>
                                    <th colSpan={5} className='border border-r-1 border-black text-center font-semibold text-black'>
                                        FAMILY PLANNING CLIENT ASSESSMENT RECORD
                                    </th>
                                </tr>
                                <tr className='border-black'>
                                    <th className='border border-r-1 border-black w-[15%] text-black font-semibold'>DATE OF VISIT</th>
                                    <th className='border border-r-1 border-black text-black w-[25%] text-center'>
                                        <p className='font-semibold mb-0 pb-0'>MEDICAL FINDINGS</p>
                                        <span>
                                            (Medical observation, complaints/complication, service rendered/ procedures, laboratory examination,<br /> treatment and referrals)
                                        </span>
                                    </th>
                                    <th className='border border-r-1 border-black text-black w-[20%] font-semibold'>
                                        METHOD ACCEPTED
                                    </th>
                                    <th className='border border-r-1 border-black text-black w-[20%] text-center font-semibold'>
                                        NAME AND <br /> SIGNATURE OF <br /> SERVICE PROVIDER
                                    </th>
                                    <th className='border border-r-1 border-black text-black w-[20%] text-center font-semibold'>
                                        DATE OF <br /> FOLLOW-UP<br />VISIT <br /> (MM/DD/YYYY)
                                    </th>
                                    <th ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {familyAssessmentModelList.map(assessment => (
                                    <tr key={assessment.keyId} className='border-b-1 border-black'>
                                        <td className='border border-r-1 border-black text-black p-1'>{DateToString(assessment.dateOfVisit)}</td>
                                        <td className='border border-r-1 border-black text-black p-1 w-[30%]'>{assessment.medicalFindings}</td>
                                        <td className='border border-r-1 border-black text-black p-1'>{assessment.methodAccepted}</td>
                                        <td className='border border-r-1 border-black text-black p-1'>{assessment.nameAndSignatureSP}</td>
                                        <td className='border border-r-1 border-black text-black p-1'>{DateToString(assessment.dateFollowUp)}</td>
                                    </tr>
                                ))}
                                {familyAssessmentModelList.length == 0 && (
                                    <tr>
                                        <td colSpan={5} className='border  border-black'>
                                            <p className='text-[12px] text-gray-400 text-center'>No Data</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className='px-5'>
                        <p className='font-semibold text-[10px]'>How to Reasonably Sure a Client is Not Pregnant</p>
                        <div className='flex justify-between'>
                            <label className='text-[9px]'>
                                1. Did you have a baby less than (6) months ago, are you fully or nearly-fully breastfeeding, and have  you had no menstrual period since then?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="babyLessThan6Months" value={1} checked={familyPlanningModel.babyLessThan6Months == 1} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="babyLessThan6Months" value={0} checked={familyPlanningModel.babyLessThan6Months == 0} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[9px]'>
                                2. Have you abstained from sexual intercourse since your last menstrual period or delivery?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="abstain" value={1} checked={familyPlanningModel.abstain == 1} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="abstain" value={0} checked={familyPlanningModel.abstain == 0} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[9px]'>
                                3. Have you had a baby in the last four (4) weeks?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="babyLessThan4Weeks" value={1} checked={familyPlanningModel.babyLessThan4Weeks == 1} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="babyLessThan4Weeks" value={0} checked={familyPlanningModel.babyLessThan4Weeks == 0} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[9px]'>
                                4. Did your last menstrual period start within the past seven (7) days?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="menstrualPast7Days" value={1} checked={familyPlanningModel.menstrualPast7Days == 1} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="menstrualPast7Days" value={0} checked={familyPlanningModel.menstrualPast7Days == 0} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[9px]'>
                                5. Have you jad a miscarriage or abortion in the last seven (7) days?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="abortionPast7Days" value={1} checked={familyPlanningModel.abortionPast7Days == 1} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="abortionPast7Days" value={0} checked={familyPlanningModel.abortionPast7Days == 0} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[9px]'>
                                6. Have you been using a reliable contraceptive method consistently and correctly?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="usingContraceptives" value={1} checked={familyPlanningModel.usingContraceptives == 1} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="usingContraceptives" value={0} checked={familyPlanningModel.usingContraceptives == 0} className="checkbox checkbox-default checkbox-xs" />
                                    <span className="label-text text-[9px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <li className='font-semibold text-[9px]'>
                            If the client answered YES to at least one of the questions and she is free of signs or symptoms of pregnancy, provide client with desired method.
                        </li>
                        <li className='font-semibold text-[9px]'>
                            If the client answered NO to all the questions, pregnancy cannot be ruled out. The client should await menses or use a pregnancy test.
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FamilyPlanningReport
