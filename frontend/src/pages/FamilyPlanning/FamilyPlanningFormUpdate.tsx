import React, { useState, useEffect } from 'react'
import { FamilyAssessmentModel, FamilyAssessmentModelInitialValue } from '@/types/familyAssessment'
import { FamilyPlanningModel, FamilyPlanningModelInitialValue } from '@/types/familyPlanning'
import { AppointmentModel } from '@/types/appointmentType';
import { calculateAge, DateToString } from '@/utils/DateFunction';
import { generateRandomId, getMiddleInitial } from '@/utils/CommonFunctions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';
import { useNavigate, useParams, Link } from 'react-router-dom';

const FamilyPlanningFormUpdate: React.FC = () => {

    const [familyAssessmentModel, setFamilyAssessmentModel] = useState<FamilyAssessmentModel>(FamilyAssessmentModelInitialValue);
    const [familyAssessmentModelList, setFamilyAssessmentModelList] = useState<FamilyAssessmentModel[]>([]);
    const [removeFamilyAssessmentModelList, setRemoveFamilyAssessmentModelList] = useState<FamilyAssessmentModel[]>([]);
    const [familyPlanningModel, setFamilyPlanningModel] = useState<FamilyPlanningModel>(FamilyPlanningModelInitialValue);
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const { appointment_id } = useParams<{ appointment_id: string }>();

    const token: string | null = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointmentDetails();
        fetchFamilyPlanning();
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

    const fetchFamilyPlanning = async () => {
        const response = await axios.get(`/api/family/getFamilyPlanningOne/${appointment_id}`,
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
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFamilyPlanningModel(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name == 'typeOfClient') {
            if (value == "New Acceptor") {
                setFamilyPlanningModel(prevState => ({
                    ...prevState,
                    typeCurrentUser: "",
                    typeReason: ""
                }));
            }
        }

        if (name == 'typeCurrentUser') {
            if (value != "Changing Method") {
                setFamilyPlanningModel(prevState => ({
                    ...prevState,
                    methodUsed: "",
                    typeReason: ""
                }));
            }
        }

        if (name == 'dysmenorrhea') {
            var valueOfCheck = familyPlanningModel.dysmenorrhea == 1 ? 0 : 1;
            setFamilyPlanningModel(prevState => ({
                ...prevState,
                dysmenorrhea: valueOfCheck,
            }));
        }

        if (name == 'hydatidiform') {
            var valueOfCheck = familyPlanningModel.hydatidiform == 1 ? 0 : 1;
            setFamilyPlanningModel(prevState => ({
                ...prevState,
                hydatidiform: valueOfCheck,
            }));
        }

        if (name == 'historyEctopicPregnancy') {
            var valueOfCheck = familyPlanningModel.historyEctopicPregnancy == 1 ? 0 : 1;
            setFamilyPlanningModel(prevState => ({
                ...prevState,
                historyEctopicPregnancy: valueOfCheck,
            }));
        }


        if (name == 'pelvicExamination') {
            if (value != "cervical abnormalities") {
                setFamilyPlanningModel(prevState => ({
                    ...prevState,
                    cervicalAbnormal: "",
                }));
            }
        }

        if (name == 'pelvicExamination') {
            if (value != "cervical consistency") {
                setFamilyPlanningModel(prevState => ({
                    ...prevState,
                    cervicalConsistency: "",
                }));
            }
        }

        if (name == 'pelvicExamination') {
            if (value != "uterine position") {
                setFamilyPlanningModel(prevState => ({
                    ...prevState,
                    uterinePosition: "",
                }));
            }
        }

        if (name == 'pelvicExamination') {
            if (value != "uterine depth:") {
                setFamilyPlanningModel(prevState => ({
                    ...prevState,
                    uterineDepth: "",
                }));
            }
        }

        if (name == 'methodUsed') {
            if (value != "Interval" || value != "Post-Partrum") {
                setFamilyPlanningModel(prevState => ({
                    ...prevState,
                    pelvicExamination: "",
                }));
            }
        }
    };

    const removeAssessment = (keyIdToRemove?: string) => {
        const indexToRemove = familyAssessmentModelList.findIndex((item) => item.keyId == keyIdToRemove);
        if (indexToRemove !== -1) {
            const familyAssementToRemove = familyAssessmentModelList[indexToRemove];
            if (familyAssementToRemove.familyAssessmentId != 0) {
                setRemoveFamilyAssessmentModelList((prev) => [...prev, familyAssementToRemove]);
            }
            setRemoveFamilyAssessmentModelList
            const updatedAssessment = [...familyAssessmentModelList];
            updatedAssessment.splice(indexToRemove, 1);
            setFamilyAssessmentModelList(updatedAssessment);
        }
    };

    const handleInputChangeAssessment = (e: any) => {
        const { name, value } = e.target;

        setFamilyAssessmentModel(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const addForm = () => {
        familyAssessmentModel.keyId = generateRandomId();
        setFamilyAssessmentModelList(prevState => {
            return [...prevState, familyAssessmentModel];
        });
        setFamilyAssessmentModel(FamilyAssessmentModelInitialValue);
    }

    const calcAge = (event: any) => {
        const spouseBirthdate = event.target.value; // Assuming the event target value is the husband's birthdate
        const spouseAge = calculateAge(spouseBirthdate);

        setFamilyPlanningModel(prevState => ({
            ...prevState,
            spouseDateofBirth: spouseBirthdate,
            spouseAge: spouseAge
        }));
    };


    const updatePlanning = async () => {
        if (appointment_id != null) {
            familyPlanningModel.appointment_id = appointment_id;
        }
        familyPlanningModel.user_id = appointment.user_id;
        familyPlanningModel.familyAssessment = familyAssessmentModelList;
        familyPlanningModel.removeFamilyAssessment = removeFamilyAssessmentModelList;

        try {
            const response = await axios.put("/api/family/updateFamilyPlanning", familyPlanningModel,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.status == "success") {
                dispatch(setToastState({ toast: true, toastMessage: "Family Planning Record Updated Successfully", toastSuccess: true }));
                navigate(`/familyPlanning_record/${appointment.user_id}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='m-3'>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <Link to="/managerecords">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            Manage Records
                        </Link>
                    </li>
                    <li>
                        <Link to={`/patientRecords/${appointment.user_id}`} className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            {appointment?.firstname} {getMiddleInitial(appointment.middlename || '')} {appointment?.lastname} {appointment.extension || ''} Records
                        </Link>
                    </li>
                    <li>
                        <Link to={`/familyPlanning_record/${appointment.user_id}`} className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            {appointment?.firstname} {getMiddleInitial(appointment.middlename || '')} {appointment?.lastname} {appointment.extension || ''} Family Planning Records
                        </Link>
                    </li>
                    <li>
                        <span className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>
                            Update {appointment?.firstname} {getMiddleInitial(appointment.middlename || '')} {appointment?.lastname} {appointment.extension || ''} Family Planning Record
                        </span>
                    </li>
                </ul>
            </div>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0 pb-3">
                    <div className='flex justify-between p-4 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                            </svg>
                            Family Planning Client Assessment Record
                        </h1>
                    </div>
                    <p className='font-semibold px-5'>SIDE A</p>
                    <div className='flex mx-4 text-[13px] px-1'>
                        <div className=' w-full p-2 text-[16px] rounded bg-gray-700 text-white'>
                            <p>Instructions for Physicians, Nurses and Midwives. <b>Make sure that the client is not pregnant by using the question listed in SIDE B.</b> Completely fill out or check the required information. Refer accordingly for any abnormal history/findings for further medical evaluation.</p>
                        </div>
                    </div>

                    <div className='w-full p-2 px-5'>
                        <div className='flex items-center gap-1'>
                            <label className='font-semibold text-[13px]'>CLIENT ID:</label>
                            <input type="text" placeholder="CLIENT ID" name='clientId' value={familyPlanningModel.clientId} onChange={handleInputChange} className="input input-bordered input-sm w-full max-w-xs" />
                        </div>
                        <div className='flex items-center gap-1 mt-2'>
                            <label className='font-semibold text-[13px]'>PHILHEALTH NO:</label>
                            <input type="text" placeholder="PHILHEALTH NO" name='philhealth' value={familyPlanningModel.philhealth} onChange={handleInputChange} className="input input-bordered input-sm w-full max-w-xs" />
                        </div>

                        <div className='flex items-center gap-2 mt-2'>
                            <div className='flex items-center gap-1'>
                                <b>NHTS?:</b>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name='NHTS' value={1} checked={familyPlanningModel.NHTS == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name='NHTS' value={0} checked={familyPlanningModel.NHTS == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                            <div className='flex items-center gap-1'>
                                <b>Pantawid Pamilya Pilipino Program(4ps):</b>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name='pantawid4ps' value={1} checked={familyPlanningModel.pantawid4ps == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name='pantawid4ps' value={0} checked={familyPlanningModel.pantawid4ps == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2 px-5 mt-2'>
                        <div className='flex flex-col w-[20%]'>
                            <label className='font-semibold text-[13px]'>Client Name</label>
                            <input type="text" readOnly value={`${appointment?.firstname} ${getMiddleInitial(appointment.middlename || '')} ${appointment?.lastname} ${appointment.extension || ''}`} placeholder="Client Name" className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[20%]'>
                            <label className='font-semibold text-[13px]'>Date of Birth</label>
                            <input type="date" readOnly value={appointment.birthdate} placeholder='Date of Birth' className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[20%]'>
                            <label className='font-semibold text-[13px]'>Age</label>
                            <input type="text" readOnly value={calculateAge(appointment.birthdate)} placeholder="Age" className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[20%]'>
                            <label className='font-semibold text-[13px]'>Educ. Attain.</label>
                            <input type="text" readOnly value={appointment.education} placeholder="Educ. Attain" className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[20%]'>
                            <label className='font-semibold text-[13px]'>Occupation</label>
                            <input type="text" readOnly value={appointment.occupation} placeholder="Occupation" className="input input-bordered input-primary w-full" />
                        </div>
                    </div>

                    <div className='flex gap-2 px-5 mt-1'>
                        <div className='flex flex-col w-[25%]'>
                            <label className='font-semibold text-[13px]'>Adress</label>
                            <input type="text" readOnly value={appointment.address} placeholder="Adress" className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[25%]'>
                            <label className='font-semibold text-[13px]'>Contact Number</label>
                            <input type="number" readOnly value={appointment.contact_number} placeholder="Contact Number" className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[25%]'>
                            <label className='font-semibold text-[13px]'>Civil Status</label>
                            <input type="text" placeholder="Civil Status" readOnly value={appointment.civil_status} className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[25%]'>
                            <label className='font-semibold text-[13px]'>Religion</label>
                            <input type="text" placeholder="Educ. Attain" readOnly value={appointment.religion} className="input input-bordered input-primary w-full" />
                        </div>
                    </div>

                    <div className='flex gap-2 px-5 mt-3'>
                        <div className='flex flex-col w-[25%]'>
                            <label className='font-semibold text-[13px]'>Name of Spouse</label>
                            <input type="text" placeholder="Client Name" name='spouseName' value={familyPlanningModel.spouseName} onChange={handleInputChange} className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[25%]'>
                            <label className='font-semibold text-[13px]'>Date of Birth</label>
                            <input type="date" placeholder='Date of Birth' name='spouseDateofBirth' value={familyPlanningModel.spouseDateofBirth} onChange={calcAge} className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[25%]'>
                            <label className='font-semibold text-[13px]'>Age</label>
                            <input type="text" placeholder="Age" readOnly value={familyPlanningModel.spouseAge} className="input input-bordered input-primary w-full" />
                        </div>
                        <div className='flex flex-col w-[25%]'>
                            <label className='font-semibold text-[13px]'>Occupation</label>
                            <input type="text" placeholder="Occupation" name='spouseOccupation' value={familyPlanningModel.spouseOccupation} onChange={handleInputChange} className="input input-bordered input-primary w-full" />
                        </div>
                    </div>

                    <div className='px-5 flex gap-2 justify-between mt-2'>
                        <div className='flex w-[30%] items-center'>
                            <label className='font-semibold text-[13px]'>NO. OF LIVING CHILDREN</label>
                            <input type="number" placeholder="0" name='noLivingChildren' value={familyPlanningModel.noLivingChildren} onChange={handleInputChange} className="input input-bordered input-primary w-full" />
                        </div>

                        <label className="label cursor-pointer flex gap-2">
                            <span className="label-text text-[13px]"><b>PLAN TO HAVE MORE CHILDREN?</b></span>
                            <input type="checkbox" name='planToHaveMoreChildren' value={1} checked={familyPlanningModel.planToHaveMoreChildren == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                            <span className="label-text text-[13px]"><b>YES</b></span>
                            <input type="checkbox" name='planToHaveMoreChildren' value={0} checked={familyPlanningModel.planToHaveMoreChildren == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                            <span className="label-text text-[13px]"><b>NO</b></span>
                        </label>

                        <div className='flex items-center justify-start gap-2'>
                            <label className='text-[13px]'><b>AVERAGE MONTHLY INCOME</b></label>
                            <input type="number" placeholder="0" name='averageIncome' value={familyPlanningModel.averageIncome} onChange={handleInputChange} className="input input-bordered input-primary w-full w-[32%]" />
                        </div>
                    </div>

                    <div className='px-5 my-2'>
                        <hr className='border border-gray-500' />
                    </div>

                    <div className='px-5'>
                        <p className='font-semibold text-[14px]'>Type of Client</p>
                    </div>
                    <div className='px-5'>
                        <div className='flex gap-5'>
                            <div className='w-[50%]'>
                                <div className='flex'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input name='typeOfClient' value="New Acceptor" checked={familyPlanningModel.typeOfClient == "New Acceptor"} onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[11px]">New Acceptor</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <span className="label-text text-[11px]"><b>| Reason for FP:</b></span>
                                        <input type="checkbox" disabled={familyPlanningModel.typeOfClient != "New Acceptor"} checked={familyPlanningModel.typeReason == "spacing"} name='typeReason' onChange={handleInputChange} value="spacing" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[11px]">spacing</span>
                                        <input type="checkbox" disabled={familyPlanningModel.typeOfClient != "New Acceptor"} checked={familyPlanningModel.typeReason == "limiting"} name='typeReason' onChange={handleInputChange} value="limiting" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[11px]">limiting</span>
                                        <input type="checkbox" disabled={familyPlanningModel.typeOfClient != "New Acceptor"} checked={familyPlanningModel.typeReason == "others"} name='typeReason' onChange={handleInputChange} value="others" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[11px]">others</span>
                                        <input type="text" disabled={familyPlanningModel.typeReason != "others"} placeholder="others" className="input input-bordered input-primary input-xs" />
                                    </label>
                                </div>
                                <div>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input name='typeOfClient' value="Current User" checked={familyPlanningModel.typeOfClient == "Current User"} onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[11px]">Current User</span>
                                    </label>
                                </div>
                                <div className='ml-4'>
                                    <div className="flex items-center">
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input disabled={familyPlanningModel.typeOfClient != "Current User"} value="Changing Method" name='typeCurrentUser' checked={familyPlanningModel.typeCurrentUser == "Changing Method"} onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">Changing Method</span>
                                        </label>
                                        <span className="label-text text-[11px]"><b>| Reason: </b></span>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input disabled={familyPlanningModel.typeCurrentUser != "Changing Method" || familyPlanningModel.typeOfClient != "Current User"} checked={familyPlanningModel.typeReason == "medical condition"} name='typeReason' onChange={handleInputChange} value="medical condition" type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">medical condition</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input disabled={familyPlanningModel.typeCurrentUser != "Changing Method" || familyPlanningModel.typeOfClient != "Current User"} checked={familyPlanningModel.typeReason == "side effects"} name='typeReason' onChange={handleInputChange} value="side effects" type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">side effects</span>
                                        </label>
                                        <input disabled={familyPlanningModel.typeReason != "side effects" || familyPlanningModel.typeOfClient != "Current User"} type="text" placeholder="others" className="input input-bordered input-primary input-xs" />
                                    </div>
                                    <div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input disabled={familyPlanningModel.typeOfClient != "Current User"} value="Changing Clinic" name='typeCurrentUser' checked={familyPlanningModel.typeCurrentUser == "Changing Clinic"} onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">Changing Clinic</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input disabled={familyPlanningModel.typeOfClient != "Current User"} value="Dropout Restart" name='typeCurrentUser' checked={familyPlanningModel.typeCurrentUser == "Dropout Restart"} onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">Dropout Restart</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[50%]'>
                                <p className="label-text text-[13px] font-semibold">Method currently used (for Changing Method):</p>
                                <div className='flex gap-1'>
                                    <div className='w-[25%]'>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="COC" checked={familyPlanningModel.methodUsed == "COC"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">COC</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="POP" checked={familyPlanningModel.methodUsed == "POP"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">POP</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="Injectable" checked={familyPlanningModel.methodUsed == "Injectable"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">Injectable</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="Implant" checked={familyPlanningModel.methodUsed == "Implant"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">Implant</span>
                                        </label>
                                    </div>
                                    <div className='w-[25%]'>
                                        <li>IUD</li>
                                        <div className='ml-2'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="Interval" checked={familyPlanningModel.methodUsed == "Interval"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Interval</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="Post-Partrum" checked={familyPlanningModel.methodUsed == "Post-Partrum"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Post-Partrum</span>
                                            </label>
                                        </div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="Condom" checked={familyPlanningModel.methodUsed == "Condom"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">Condom</span>
                                        </label>
                                    </div>
                                    <div className='w-[25%]'>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="BOM/CMM" checked={familyPlanningModel.methodUsed == "BOM/CMM"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">BOM/CMM</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="BBT" checked={familyPlanningModel.methodUsed == "BBT"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">BBT</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="STM" checked={familyPlanningModel.methodUsed == "STM"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">STM</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="SDM" checked={familyPlanningModel.methodUsed == "SDM"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">SDM</span>
                                        </label>
                                    </div>
                                    <div className='w-[25%]'>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="LAM" checked={familyPlanningModel.methodUsed == "LAM"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">LAM</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name='methodUsed' disabled={familyPlanningModel.typeCurrentUser != "Changing Method"} value="others" checked={familyPlanningModel.methodUsed == "others"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">others</span>
                                        </label>
                                        <input type="text" placeholder="others" value={familyPlanningModel.methodOthers} name='methodOthers' onChange={handleInputChange} disabled={familyPlanningModel.methodUsed != "others"} className="w-[80%] ml-3 input input-bordered input-primary input-xs" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[50%] text-[13px] px-5 border border-black border-r-0 py-2'><b>I. MEDICAL HISTORY</b></div>
                            <div className='w-[50%] text-[13px] px-5 border border-black py-2'><b>IV. RISK FOR VIOLENCE AGAINST WOMEN (VAW)</b></div>
                        </div>

                        <div className='flex justify-between text-[13px]'>
                            <div className='w-[50%] border border-black border-r-0 border-t-0 py-2'>
                                <div className='px-5'>
                                    <p>Does the client have any of the following?</p>

                                    <div className='flex justify-between items-center mt-2'>
                                        <li>severe headaches / migrane</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalHeadache" value={1} checked={familyPlanningModel.medicalHeadache == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalHeadache" value={0} checked={familyPlanningModel.medicalHeadache == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>history of stroke / heart attack / hypertension</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalhistoryStroke" value={1} checked={familyPlanningModel.medicalhistoryStroke == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalhistoryStroke" value={0} checked={familyPlanningModel.medicalhistoryStroke == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>non-traumatic hematoma / frequent bruising or gum bleeding</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalHematoma" value={1} checked={familyPlanningModel.medicalHematoma == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalHematoma" value={0} checked={familyPlanningModel.medicalHematoma == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>current or history of breast cancer / breast mass</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalBreastCancer" value={1} checked={familyPlanningModel.medicalBreastCancer == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalBreastCancer" value={0} checked={familyPlanningModel.medicalBreastCancer == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>severe chest pain</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalsevereChestPain" value={1} checked={familyPlanningModel.medicalsevereChestPain == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalsevereChestPain" value={0} checked={familyPlanningModel.medicalsevereChestPain == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>cough for more than 14 days</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalcough14Days" value={1} checked={familyPlanningModel.medicalcough14Days == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalcough14Days" value={0} checked={familyPlanningModel.medicalcough14Days == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>jaundice</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalJaundice" value={1} checked={familyPlanningModel.medicalJaundice == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalJaundice" value={0} checked={familyPlanningModel.medicalJaundice == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>unexplained vaginal bleeding</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalVaginalBleeding" value={1} checked={familyPlanningModel.medicalVaginalBleeding == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalVaginalBleeding" value={0} checked={familyPlanningModel.medicalVaginalBleeding == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>abnormal vaginal discharge</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalVaginalDischarge" value={1} checked={familyPlanningModel.medicalVaginalDischarge == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalVaginalDischarge" value={0} checked={familyPlanningModel.medicalVaginalDischarge == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>intake of phenobarbital(anti-seizure) or rifampicin (anti-TB)</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalIntake" value={1} checked={familyPlanningModel.medicalIntake == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalIntake" value={0} checked={familyPlanningModel.medicalIntake == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>is the client a SMOKER?</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalClientSmoker" value={1} checked={familyPlanningModel.medicalClientSmoker == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalClientSmoker" value={0} checked={familyPlanningModel.medicalClientSmoker == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>With Disability?</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalDisability" value={1} checked={familyPlanningModel.medicalDisability == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="medicalDisability" value={0} checked={familyPlanningModel.medicalDisability == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex flex-col ml-3'>
                                        <p className='font-semibold'>If YES please specify:</p>
                                        <input type="text" placeholder="Specify" name='disabilitySpecify' value={familyPlanningModel.disabilitySpecify} onChange={handleInputChange} disabled={familyPlanningModel.medicalDisability == 0} className="w-[80%] input input-bordered input-primary input-xs" />
                                    </div>
                                </div>
                                <div className='w-[full] px-5  border border-black border-r-0 border-l-0 mt-3 py-2'><b>II. OBSTETRICAL HISTORY</b></div>
                                <div className='px-5 py-2'>
                                    <div className='flex gap-2 items-center'>
                                        Number of Pregnancies:
                                        <span>G</span>
                                        <input type="text" name="numberPregnanciesG" value={familyPlanningModel.numberPregnanciesG} onChange={handleInputChange} placeholder="G" className="input input-bordered input-primary input-xs" />
                                        <span>P</span>
                                        <input type="text" name="numberPregnanciesP" value={familyPlanningModel.numberPregnanciesP} onChange={handleInputChange} placeholder="P" className="input input-bordered input-primary input-xs" />
                                    </div>
                                    <div className='flex gap-2 mt-2'>
                                        <div className='flex items-center gap-2'>
                                            <span>Full Item:</span>
                                            <input type="text" name="fullItem" value={familyPlanningModel.fullItem} onChange={handleInputChange} placeholder="Full Item" className="input input-bordered input-primary input-xs" />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span>Premature:</span>
                                            <input type="text" name="premature" value={familyPlanningModel.premature} onChange={handleInputChange} placeholder="Premature" className="input input-bordered input-primary input-xs" />
                                        </div>
                                    </div>
                                    <div className='flex gap-2 mt-2'>
                                        <div className='flex items-center gap-2'>
                                            <span>Abortion:</span>
                                            <input type="text" placeholder="Abortion" name="abortion" value={familyPlanningModel.abortion} onChange={handleInputChange} className="input input-bordered input-primary input-xs" />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span>Living Children:</span>
                                            <input type="number" placeholder="Living Children" name="livingChildren" value={familyPlanningModel.livingChildren} onChange={handleInputChange} className="input input-bordered input-primary input-xs" />
                                        </div>
                                    </div>
                                    <div className='flex mt-2 gap-2 items-center'>
                                        <span>Date of Last Delivery:</span>
                                        <input type="date" name="dateLastDelivery" value={familyPlanningModel.dateLastDelivery} onChange={handleInputChange} className="input input-bordered input-primary input-xs" />
                                    </div>

                                    <div className='flex justify-start items-center mt-2'>
                                        <label>Type of last delivery: </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name="typeOfLastDelivery" value="Vaginal" checked={familyPlanningModel.typeOfLastDelivery == "Vaginal"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">Vaginal</span>
                                        </label>

                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name="typeOfLastDelivery" value="Cesarian Section" checked={familyPlanningModel.typeOfLastDelivery == "Cesarian Section"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">Cesarian Section</span>
                                        </label>
                                    </div>

                                    <div className='flex mt-2 gap-2 items-center'>
                                        <span>Last menstrual period:</span>
                                        <input type="date" name="lastMenstrualPeriod" value={familyPlanningModel.lastMenstrualPeriod} onChange={handleInputChange} className="input input-bordered input-primary input-xs" />
                                    </div>

                                    <div className='flex mt-2 gap-2 items-center'>
                                        <span>Previous menstrual period:</span>
                                        <input type="date" name="previousMenstrualPeriod" value={familyPlanningModel.previousMenstrualPeriod} className="input input-bordered input-primary input-xs" />
                                    </div>

                                    <p className='mt-3'>Menstrual flow:</p>

                                    <div className='ml-4'>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name="menstrualFlow" value="scanty (1-2 pads per day)" checked={familyPlanningModel.menstrualFlow == "scanty (1-2 pads per day)"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">scanty (1-2 pads per day)</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name="menstrualFlow" value="moderate (3-5 pads per day)" checked={familyPlanningModel.menstrualFlow == "moderate (3-5 pads per day)"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">moderate (3-5 pads per day)</span>
                                        </label>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" name="menstrualFlow" value="(>5 pads per day)" checked={familyPlanningModel.menstrualFlow == "(>5 pads per day)"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">heavy {"(>5 pads per day)"}</span>
                                        </label>
                                    </div>

                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" name="dysmenorrhea" checked={familyPlanningModel.dysmenorrhea == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[11px]">Dysmenorrhea</span>
                                    </label>

                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" name="hydatidiform" checked={familyPlanningModel.hydatidiform == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[11px]">Hydatidiform mole(within the last 12 months)</span>
                                    </label>

                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" name="historyEctopicPregnancy" checked={familyPlanningModel.historyEctopicPregnancy == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[11px]">History of ectopic pregnancy</span>
                                    </label>
                                </div>
                                <div className='w-[full] px-5  border border-black border-r-0 border-l-0 mt-3 py-2'><b>III. RISK FOR SEXUALLY TRANSMITTED INFECTIONS</b></div>
                                <div className='px-5 py-2'>
                                    <p>Does the client or the client's partner have any of the following?</p>

                                    <li className='flex justify-between items-center'>
                                        <span>abnormal discharge from the genital area</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="abnormalDischarge" value={1} checked={familyPlanningModel.abnormalDischarge == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="abnormalDischarge" value={0} checked={familyPlanningModel.abnormalDischarge == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </li>

                                    <div className='ml-5 flex items-center'>
                                        <span>if "YES" please indicate if from: </span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="indicateGenital" value="Vagina" checked={familyPlanningModel.indicateGenital == "Vagina"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Vagina</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="indicateGenital" value="Penis" checked={familyPlanningModel.indicateGenital == "Penis"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Penis</span>
                                            </label>
                                        </div>
                                    </div>

                                    <li className='flex justify-between items-center'>
                                        <span>scores or ulcers in the genital area</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="scoresOrUlcer" value={1} checked={familyPlanningModel.scoresOrUlcer == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="scoresOrUlcer" value={0} checked={familyPlanningModel.scoresOrUlcer == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </li>

                                    <li className='flex justify-between items-center'>
                                        <span>pain or burning sensation in the genital area</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="painOrBurningSensation" value={1} checked={familyPlanningModel.painOrBurningSensation == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="painOrBurningSensation" value={0} checked={familyPlanningModel.painOrBurningSensation == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </li>

                                    <li className='flex justify-between items-center'>
                                        <span>history of treatment for sexually transmitted infections</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="historySexuallyTransmitted" value={1} checked={familyPlanningModel.historySexuallyTransmitted == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="historySexuallyTransmitted" value={0} checked={familyPlanningModel.historySexuallyTransmitted == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </li>

                                    <li className='flex justify-between items-center'>
                                        <span>HIV / AIDS / Pelvic inflammatory disease</span>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="HivAids" value={1} checked={familyPlanningModel.HivAids == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="HivAids" value={0} checked={familyPlanningModel.HivAids == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </li>
                                </div>
                                <hr className='border border-black border-t-0' />
                                <p className='px-5 py-2'>Implant = Progestine subdermal implant; IUD = Infraterine device; BTL = Bilateral tubal ligation; NSV = No-scalpel vasectomy; COC = Combine oral contraceptives; POP = Progestin only pills; LAM = Lactational amenorrhea method; SDM = Standard days method; BBT = Basal body temperature; BOM = Billings ovulation method; CMM = Cervical mucus method; STM = Symptothermal method</p>
                            </div>
                            <div className='w-[50%] border border-black py-2 border-t-0'>
                                <div className='px-5'>
                                    <div className='flex justify-between items-center'>
                                        <li>unpleasant relationship with partner</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="unPleasantRelationshipPartner" value={1} checked={familyPlanningModel.unPleasantRelationshipPartner == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="unPleasantRelationshipPartner" value={0} checked={familyPlanningModel.unPleasantRelationshipPartner == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>partner does not approve of the visit to the FP clinic</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="partnerDoesNotApprove" value={1} checked={familyPlanningModel.partnerDoesNotApprove == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="partnerDoesNotApprove" value={0} checked={familyPlanningModel.partnerDoesNotApprove == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <li>history of domestic violence or VAW</li>
                                        <div className='flex'>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="VAW" value={1} checked={familyPlanningModel.VAW == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">Yes</span>
                                            </label>
                                            <label className="label cursor-pointer flex gap-2 justify-start">
                                                <input type="checkbox" name="VAW" value={0} checked={familyPlanningModel.VAW == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className='ml-5 w-full'>
                                        <div className="flex justify-start gap-2 w-full">
                                            <span className='mt-2'>Referred to: </span>
                                            <div>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input disabled={familyPlanningModel.VAW != 1} type="checkbox" name="referedTo" value="DSDWD" checked={familyPlanningModel.referedTo == "DSDWD"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                    <span className="label-text text-[11px]">DSDWD</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input type="checkbox" disabled={familyPlanningModel.VAW != 1} name="referedTo" value="WCPU" checked={familyPlanningModel.referedTo == "WCPU"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                    <span className="label-text text-[11px]">WCPU</span>
                                                </label>
                                                <label className="label cursor-pointer flex gap-2 justify-start">
                                                    <input type="checkbox" disabled={familyPlanningModel.VAW != 1} name="referedTo" value="NGOs" checked={familyPlanningModel.referedTo == "NGOs"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                    <span className="label-text text-[11px]">NGOs</span>
                                                </label>
                                                <div className='flex items-center w-full'>
                                                    <label className="label cursor-pointer flex gap-2 justify-start w-[50%]">
                                                        <input type="checkbox" disabled={familyPlanningModel.VAW != 1} name="referedTo" value="Others Specify:" checked={familyPlanningModel.referedTo == "Others Specify:"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                        <span className="label-text text-[11px]">Others Specify:</span>
                                                    </label>
                                                    <input type="text" placeholder="Specify" disabled={familyPlanningModel.referedTo != "Others Specify:" || familyPlanningModel.VAW != 1} value={familyPlanningModel.referedToOther} name="referedToOther" onChange={handleInputChange} className="w-[60%] input input-bordered input-primary input-xs" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[full] px-5  border border-black border-r-0 border-l-0 mt-2 py-2'><b>V. PHYSICAL EXAMINATION</b></div>
                                <div className='px-5 py-2'>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <label>Weight:</label>
                                            <input type="text" placeholder="kg" name='weight' value={familyPlanningModel.weight} onChange={handleInputChange} className="w-[60%] input input-bordered input-primary input-xs" />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <label>Blood Pressure:</label>
                                            <input type="text" placeholder="mmHg" name='bp' value={familyPlanningModel.bp} onChange={handleInputChange} className="w-[60%] input input-bordered input-primary input-xs" />
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <div className='flex items-center gap-2'>
                                            <label>Height:</label>
                                            <input type="text" placeholder="m" name='height' value={familyPlanningModel.height} onChange={handleInputChange} className="w-[60%] input input-bordered input-primary input-xs" />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <label>Pulse rate:</label>
                                            <input type="text" placeholder="/min" name='pulseRate' value={familyPlanningModel.pulseRate} onChange={handleInputChange} className="w-[60%] input input-bordered input-primary input-xs" />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex px-5'>
                                    <div className='w-[50%]'>
                                        <p className='font-semibold'>SKIN:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="skin" value="normal" checked={familyPlanningModel.skin == "normal"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="skin" value="pale" checked={familyPlanningModel.skin == "pale"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">pale</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="skin" value="yellowish" checked={familyPlanningModel.skin == "yellowish"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">yellowish</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="skin" value="hematoma" checked={familyPlanningModel.skin == "hematoma"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">hematoma</span>
                                        </label>

                                        <p className='font-semibold mt-2'>CONJUNCTIVA:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="conjunctiva" value="normal" checked={familyPlanningModel.conjunctiva == "normal"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="conjunctiva" value="pale" checked={familyPlanningModel.conjunctiva == "pale"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">pale</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="conjunctiva" value="yellowish" checked={familyPlanningModel.conjunctiva == "yellowish"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">yellowish</span>
                                        </label>

                                        <p className='font-semibold mt-2'>NECK:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="neck" value="normal" checked={familyPlanningModel.neck == "normal"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="neck" value="neck mass" checked={familyPlanningModel.neck == "neck mass"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">neck mass</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="neck" value="enlarge lymph nodes" checked={familyPlanningModel.neck == "enlarge lymph nodes"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">enlarge lymph nodes</span>
                                        </label>

                                        <p className='font-semibold mt-2'>BREAST:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="breast" value="normal" checked={familyPlanningModel.breast == "normal"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="breast" value="mass" checked={familyPlanningModel.breast == "mass"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">mass</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="breast" value="nipple discharge" checked={familyPlanningModel.breast == "nipple discharge"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">nipple discharge</span>
                                        </label>

                                        <p className='font-semibold mt-2'>ABDOMEN:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="abdomen" value="normal" checked={familyPlanningModel.abdomen == "normal"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="abdomen" value="abdominal mass" checked={familyPlanningModel.abdomen == "abdominal mass"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">abdominal mass</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="abdomen" value="varicosities" checked={familyPlanningModel.abdomen == "varicosities"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">varicosities</span>
                                        </label>
                                    </div>
                                    <div className='w-[50%]'>
                                        <p className='font-semibold mt-2'>EXTREMITIES:</p>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="extremities" value="normal" checked={familyPlanningModel.extremities == "normal"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">normal</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="extremities" value="edema" checked={familyPlanningModel.extremities == "edema"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">edema</span>
                                        </label>
                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" name="extremities" value="varicosities" checked={familyPlanningModel.extremities == "varicosities"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">varicosities</span>
                                        </label>

                                        <p className='font-semibold mt-2'>PELVIC EXAMINATION:</p>
                                        <p className='italic'>(For IUD Acceptors)</p>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="normal" checked={familyPlanningModel.pelvicExamination == "normal"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">normal</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="mass" checked={familyPlanningModel.pelvicExamination == "mass"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">mass</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="abnormal discharge" checked={familyPlanningModel.pelvicExamination == "abnormal discharge"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">abnormal discharge</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="cervical abnormalities" checked={familyPlanningModel.pelvicExamination == "cervical abnormalities"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">cervical abnormalities</span>
                                        </label>

                                        <div className='ml-5'>
                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "cervical abnormalities"} name="cervicalAbnormal" value="warts" checked={familyPlanningModel.cervicalAbnormal == "warts"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">warts</span>
                                            </label>

                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "cervical abnormalities"} name="cervicalAbnormal" value="polyp or cyst" checked={familyPlanningModel.cervicalAbnormal == "polyp or cyst"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">polyp or cyst</span>
                                            </label>

                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "cervical abnormalities"} name="cervicalAbnormal" value="inflammation or erosion" checked={familyPlanningModel.cervicalAbnormal == "inflammation or erosion"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">inflammation or erosion</span>
                                            </label>

                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "cervical abnormalities"} name="cervicalAbnormal" value="bloody discharge" checked={familyPlanningModel.cervicalAbnormal == "bloody discharge"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">bloody discharge</span>
                                            </label>
                                        </div>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="cervical consistency" checked={familyPlanningModel.pelvicExamination == "cervical consistency"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">cervical consistency</span>
                                        </label>

                                        <div className='ml-5'>
                                            <div className='flex'>
                                                <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                    <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "cervical consistency"} name="cervicalConsistency" value="firm" checked={familyPlanningModel.cervicalConsistency == "firm"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                    <span className="label-text text-[11px]">firm</span>
                                                </label>
                                                <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                    <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "cervical consistency"} name="cervicalConsistency" value="soft" checked={familyPlanningModel.cervicalConsistency == "soft"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                    <span className="label-text text-[11px]">soft</span>
                                                </label>
                                            </div>
                                        </div>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="cervical tenderness" checked={familyPlanningModel.pelvicExamination == "cervical tenderness"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">cervical tenderness</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="adnexal mass/tenderness" checked={familyPlanningModel.pelvicExamination == "adnexal mass/tenderness"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">adnexal mass/tenderness</span>
                                        </label>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="uterine position" checked={familyPlanningModel.pelvicExamination == "uterine position"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">uterine position</span>
                                        </label>

                                        <div className='ml-5'>
                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "uterine position"} name="uterinePosition" value="mid" checked={familyPlanningModel.uterinePosition == "mid"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">mid</span>
                                            </label>
                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "uterine position"} name="uterinePosition" value="anteflexed" checked={familyPlanningModel.uterinePosition == "anteflexed"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">anteflexed</span>
                                            </label>
                                            <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                                <input type="checkbox" disabled={familyPlanningModel.pelvicExamination != "uterine position"} name="uterinePosition" value="retroflexed" checked={familyPlanningModel.uterinePosition == "retroflexed"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                                <span className="label-text text-[11px]">retroflexed</span>
                                            </label>
                                        </div>

                                        <label className="label cursor-pointer py-1 flex gap-2 justify-start">
                                            <input type="checkbox" disabled={familyPlanningModel.methodUsed != "Interval" && familyPlanningModel.methodUsed != "Post-Partrum"} name="pelvicExamination" value="uterine depth:" checked={familyPlanningModel.pelvicExamination == "uterine depth:"} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[11px]">uterine depth:</span>
                                            <input type="number" disabled={familyPlanningModel.pelvicExamination != "uterine depth:"} name="uterineDepth" value={familyPlanningModel.uterineDepth} onChange={handleInputChange} placeholder="cm" className="w-[60%] input input-bordered input-primary input-xs" />
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
                    <div className='px-5 py-2'>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>SIDE B</p>
                            <p className='font-semibold text-right'>FP FORM 1</p>
                        </div>
                        <table className='text-[13px] border-black mb-1 text-black'>
                            <thead>
                                <tr className='border border-black'>
                                    <th colSpan={5} className='border border-r-1 border-black text-center font-semibold text-black'>
                                        FAMILY PLANNING CLIENT ASSESSMENT RECORD
                                    </th>

                                </tr>
                                <tr className='border border-black'>
                                    <th className='border border-r-1 border-black w-[15%] text-black font-semibold'>DATE OF VISIT</th>
                                    <th className='border border-r-1 border-black text-black w-[25%] text-center'>
                                        <p className='font-semibold mb-0 pb-0'>MEDICAL FINDINGS</p>
                                        <span className="text-[11px]">
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
                                    <tr key={assessment.keyId} className='border-b-1 border border-black'>
                                        <td className='border border-r-1 border-black text-black p-1 text-center'>{DateToString(assessment.dateOfVisit)}</td>
                                        <td className='border border-r-1 border-black text-black p-1 text-center'>{assessment.medicalFindings}</td>
                                        <td className='border border-r-1 border-black text-black p-1 text-center'>{assessment.methodAccepted}</td>
                                        <td className='border border-r-1 border-black text-black p-1 text-center'>{assessment.nameAndSignatureSP}</td>
                                        <td className='border border-r-1 border-black text-black p-1 text-center'>{DateToString(assessment.dateFollowUp)}</td>
                                        <td className='border border-r-1 border-black text-black p-1 text-center'>
                                            <div className='flex justify-center items-center'>
                                                <button onClick={() => removeAssessment(assessment.keyId)} className='btn btn-ghost rounded-full px-3 active:bg-red-400 hover:bg-red-300'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 active:text-white ">
                                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {familyAssessmentModelList.length == 0 && (
                                    <tr>
                                        <td colSpan={6} className='border  border-black'>
                                            <p className='text-[12px] p-1 text-gray-400 text-center'>No Data</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='border shadow mx-5 rounded p-3'>
                        <p className='font-semibold mb-3'>
                            FAMILY PLANNING CLIENT ASSESSMENT RECORD FORM
                        </p>
                        <div className='flex gap-2 w-full'>
                            <div className='flex flex-col w-[25%]'>
                                <label className='text-[13px] font-semibold'>Date of Visit</label>
                                <input type="date" name='dateOfVisit' value={familyAssessmentModel.dateOfVisit} onChange={handleInputChangeAssessment} placeholder="Type here" className="input input-bordered input-primary w-full input-sm" />
                            </div>
                            <div className='flex flex-col w-[25%]'>
                                <label className='text-[13px] font-semibold'>Method Accepted</label>
                                <input type="text" name='methodAccepted' value={familyAssessmentModel.methodAccepted} onChange={handleInputChangeAssessment} placeholder="Method Accepted" className="input input-bordered input-primary w-full input-sm" />
                            </div>
                            <div className='flex flex-col w-[25%]'>
                                <label className='text-[13px] font-semibold'>Name and Signature of Service Provider</label>
                                <input type="text" placeholder="Name and Signature of Service Provider" name='nameAndSignatureSP' value={familyAssessmentModel.nameAndSignatureSP} onChange={handleInputChangeAssessment} className="input input-bordered input-primary w-full input-sm" />
                            </div>
                            <div className='flex flex-col w-[25%] mb-3'>
                                <label className='text-[13px] font-semibold'>Date of follow-up visit</label>
                                <input type="date" name='dateFollowUp' value={familyAssessmentModel.dateFollowUp} onChange={handleInputChangeAssessment} className="input input-bordered input-primary w-full input-sm" />
                            </div>
                        </div>
                        <label className='text-[13px] font-semibold'>Medical Findings</label>
                        <textarea className="textarea textarea-primary w-full" name='medicalFindings' value={familyAssessmentModel.medicalFindings} onChange={handleInputChangeAssessment} placeholder="Medical Findings"></textarea>
                        <button className="btn btn-sm btn-primary btn-outline mt-2" onClick={addForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            </svg>
                            Add
                        </button>
                    </div>
                    <div className='px-5'>
                        <p className='font-semibold text-[14px]'>How to Reasonably Sure a Client is Not Pregnant</p>
                        <div className='flex justify-between'>
                            <label className='text-[13px]'>
                                1. Did you have a baby less than (6) months ago, are you fully or nearly-fully breastfeeding, and have  you had no menstrual period since then?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="babyLessThan6Months" value={1} checked={familyPlanningModel.babyLessThan6Months == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="babyLessThan6Months" value={0} checked={familyPlanningModel.babyLessThan6Months == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[13px]'>
                                2. Have you abstained from sexual intercourse since your last menstrual period or delivery?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="abstain" value={1} checked={familyPlanningModel.abstain == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="abstain" value={0} checked={familyPlanningModel.abstain == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[13px]'>
                                3. Have you had a baby in the last four (4) weeks?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="babyLessThan4Weeks" value={1} checked={familyPlanningModel.babyLessThan4Weeks == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="babyLessThan4Weeks" value={0} checked={familyPlanningModel.babyLessThan4Weeks == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[13px]'>
                                4. Did your last menstrual period start within the past seven (7) days?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="menstrualPast7Days" value={1} checked={familyPlanningModel.menstrualPast7Days == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="menstrualPast7Days" value={0} checked={familyPlanningModel.menstrualPast7Days == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[13px]'>
                                5. Have you jad a miscarriage or abortion in the last seven (7) days?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="abortionPast7Days" value={1} checked={familyPlanningModel.abortionPast7Days == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="abortionPast7Days" value={0} checked={familyPlanningModel.abortionPast7Days == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <label className='text-[13px]'>
                                6. Have you been using a reliable contraceptive method consistently and correctly?
                            </label>
                            <div className='flex items-center'>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="usingContraceptives" value={1} checked={familyPlanningModel.usingContraceptives == 1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="usingContraceptives" value={0} checked={familyPlanningModel.usingContraceptives == 0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                        </div>

                        <li className='font-semibold text-[13px]'>
                            If the client answered YES to at least one of the questions and she is free of signs or symptoms of pregnancy, provide client with desired method.
                        </li>
                        <li className='font-semibold text-[13px]'>
                            If the client answered NO to all the questions, pregnancy cannot be ruled out. The client should await menses or use a pregnancy test.
                        </li>
                    </div>
                </div>
                <div className='flex justify-end mb-3 mr-3'>
                    <button onClick={() => updatePlanning()} className="btn btn-sm btn-primary mt-2 text-white">Update Family Planning Record</button>
                </div>
            </div>
        </div>
    )
}

export default FamilyPlanningFormUpdate
