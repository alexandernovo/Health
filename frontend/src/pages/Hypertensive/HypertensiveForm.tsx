import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { HypertensiveModel, HypertensiveModelInitialValue } from '@/types/hypertensive';
import { AppointmentModel } from '@/types/appointmentType';
import axios from 'axios';
import { DateToString, calculateAge } from '@/utils/DateFunction';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';


const HypertensiveForm: React.FC = () => {
    const { appointment_id } = useParams<{ appointment_id: string }>();
    const [hypertensivemodel, setHypertensiveModel] = useState<HypertensiveModel>(HypertensiveModelInitialValue);
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const token: string | null = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isWalkin = queryParams.get('isWalkin');

    useEffect(() => {
        fetchAppointmentDetails();
    }, []);

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

    const createHypertensiveRecord = async () => {
        hypertensivemodel.appointment_id = appointment_id;
        hypertensivemodel.user_id = appointment.user_id;
        const response = await axios.post("/api/hypertensive/createHypertensive", hypertensivemodel,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (response.data.status == "success") {
            dispatch(setToastState({ toast: true, toastMessage: "Hypertensive/Diabetic Record Created Successfully", toastSuccess: true }));
           
            if (isWalkin) {
                navigate(`/hypertensive_report/${appointment_id}`);
            }
            else
            {
                navigate('/appointments');
            }
        }
    }

    return (
        <div className='m-3'>
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
                            <button onClick={() => createHypertensiveRecord()} className="btn btn-sm btn-primary mt-2 text-white">Save Hypertensive/Diabetic Record</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default HypertensiveForm
