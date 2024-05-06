import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { HypertensiveModel, HypertensiveModelInitialValue } from '@/types/hypertensive';
import { AppointmentModel } from '@/types/appointmentType';
import axios from 'axios';
import { DateToString, calculateAge } from '@/utils/DateFunction';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';


const HypertensiveFormUpdate: React.FC = () => {
    const { appointment_id } = useParams<{ appointment_id: string }>();
    const [hypertensivemodel, setHypertensiveModel] = useState<HypertensiveModel>(HypertensiveModelInitialValue);
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const token: string | null = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointmentDetails();
        getHypertensiveData();
    }, []);

    const getHypertensiveData = async () => {
        const response = await axios.get(`/api/hypertensive/getHypertensiveData/${appointment_id}`,
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

    const handleInputChange = (e: any) => {
        const { name, value, type } = e.target;
        if (type == "checkbox") {
            setHypertensiveModel(prevState => {
                const prevValue = prevState[name as keyof HypertensiveModel]; // Type assertion to keyof HypertensiveModel
                return {
                    ...prevState,
                    [name]: !prevValue
                };
            });
        }
        else {
            setHypertensiveModel(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

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

    const updateHypertensiveRecord = async () => {
        hypertensivemodel.appointment_id = appointment_id;
        hypertensivemodel.user_id = appointment.user_id;
        const response = await axios.put("/api/hypertensive/updateHypertensive", hypertensivemodel,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (response.data.status == "success") {
            dispatch(setToastState({ toast: true, toastMessage: "Hypertensive/Diabetic Record Updated Successfully", toastSuccess: true }));
            navigate(`/hypertensive_record/${appointment.user_id}`);
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
                            {appointment?.firstname} {appointment?.lastname} Records
                        </Link>
                    </li>
                    <li>
                        <Link to={`/hypertensive_record/${appointment.user_id}`} className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            {appointment?.firstname} {appointment?.lastname} Hypertensive/Diabetic Records
                        </Link>
                    </li>
                    <li>
                        <span className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>
                            Update {appointment?.firstname} {appointment?.lastname} Record
                        </span>
                    </li>
                </ul>
            </div>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0">
                    <div className='flex justify-between p-4 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                            </svg>
                            Hypertensive and Diabetic Record
                        </h1>
                    </div>
                    <div className='px-5'>
                        <h1 className='font-semibold'>Please check the corresponding column</h1>
                    </div>

                    <div className='px-5 mt-3'>
                        <div className='flex gap-2'>
                            <div className='w-[30%]'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-semibold text-[14px]'>Patient Name</label>
                                    <input type="text" readOnly value={`${appointment.firstname} ${appointment.lastname}`} placeholder="Patient Name" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-[20%]'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-semibold text-[14px]'>Date Of Birth</label>
                                    <input type="text" readOnly value={DateToString(appointment.birthdate)} placeholder="Patient Name" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-[10%]'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-semibold text-[14px]'>Age</label>
                                    <input type="text" readOnly value={calculateAge(appointment.birthdate)} placeholder="Patient Name" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-[10%]'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-semibold text-[14px]'>Sex</label>
                                    <input type="text" readOnly value={appointment.gender == "Male" ? 'M' : 'F'} placeholder="Patient Name" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-[30%]'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-semibold text-[14px]'>Address</label>
                                    <input type="text" readOnly value={`${appointment.address}`} placeholder="Patient Name" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <p className='mt-3 font-semibold'>MEDICATION TAKEN</p>
                        <div className='flex items-center justify-between'>
                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="amlodipine" checked={hypertensivemodel.amlodipine} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">AMLODIPINE</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="losartan" checked={hypertensivemodel.losartan} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">LOSARTAN</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="metroprolol" checked={hypertensivemodel.metroprolol} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">METROPROLOL</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="simvastatin" checked={hypertensivemodel.simvastatin} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">SIMVASTIN</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="gliclazide" checked={hypertensivemodel.gliclazide} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">GLICLAZIDE</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="metformin" checked={hypertensivemodel.metformin} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">METFORMIN</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="insulin" checked={hypertensivemodel.insulin} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">INSULIN</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" name="others" checked={hypertensivemodel.others} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">OTHERS</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <input type="text" name="othersDescription" placeholder='others' value={hypertensivemodel.othersDescription} onChange={handleInputChange} className="input input-bordered input-xs" />
                            </div>
                        </div>
                        <div className='flex justify-end mb-3 mt-2'>
                            <button onClick={() => updateHypertensiveRecord()} className="btn btn-sm btn-primary mt-2 text-white">Update Hypertensive/Diabetic Record</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default HypertensiveFormUpdate
