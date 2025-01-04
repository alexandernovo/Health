import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserModel } from '@/types/userType';
import { ConsultationModel } from '@/types/consultationType';
import { AppointmentModel } from '@/types/appointmentType';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import TimeDialog from '@/dialogs/userdialogs/TimeDialog';


const CreateAppointments: React.FC = () => {
    const token: string | null = localStorage.getItem('token');
    const [patients, setPatients] = useState<UserModel[]>([]);
    const [consultationType, setConsultationType] = useState<ConsultationModel[]>([]);
    const isAdmin: number | undefined = useSelector((state: RootState) => state.userState.usertype);
    const user: UserModel = useSelector((state: RootState) => state.userState);
    const [toggleTime, setToggleTime] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentDate = new Date();

    const currentDateString = currentDate.toISOString().split('T')[0];  // 'YYYY-MM-DD' format
    const currentTimeString = currentDate.toTimeString().slice(0, 5);

    const [appointment, setAppointments] = useState<AppointmentModel>({
        appointment_id: undefined,
        firstname: undefined,
        lastname: undefined,
        contact_number: '',
        address: '',
        consultationTypeId: undefined,
        appointmentDate: currentDateString,
        appointmentTime: undefined,
        appointmentStatus: isAdmin == 0 ? 3 : 1,
        isActive: undefined,
        user_id: undefined,
        appointmentType : null
    });

    const [error, setError] = useState({
        appointmentId: '',
        firstname: '',
        lastname: '',
        contact_number: '',
        address: '',
        consultationTypeId: undefined,
        appointmentDate: undefined,
        appointmentTime: '',
        isActive: undefined,
        user_id: undefined
    });

    useEffect(() => {
        fetchPatient();
        fetchConsultationType();
    }, []);

    const fetchPatient = async () => {
        try {
            const response = await axios.get('/api/users/getPatients', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status == 'success') {
                setPatients(response.data.patients);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointments((prevState: any) => ({
            ...prevState,
            appointmentDate: e.target.value
        }));
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointments((prevState: any) => ({
            ...prevState,
            appointmentTime: e.target.value
        }));
    };

    const fetchConsultationType = async () => {
        try {
            const response = await axios.get('/api/consultation/getConsultationsActive', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status == 'success') {
                setConsultationType(response.data.consultations);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePatientChange = (selectedOption: any) => {
        const selectedPatient = patients.find(patient => patient.id == selectedOption.value);
        setAppointments((prevState: any) => ({
            ...prevState,
            firstname: selectedPatient?.firstname,
            lastname: selectedPatient?.lastname,
            address: selectedPatient?.address,
            contact_number: selectedPatient?.contact_number,
            user_id: selectedPatient?.id
        }));
        console.log('Selected Patient:', selectedPatient);
    };

    const handleConsultationChange = (selectedOption: any) => {
        const selectedConsultationType = consultationType.find(
            consultation => consultation.consultationTypeId == selectedOption.value
        );
        setAppointments((prevState: any) => ({
            ...prevState,
            consultationTypeId: selectedConsultationType?.consultationTypeId
        }));
    };

    const handleCreateAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                '/api/appointment/createappointment',
                {
                    user_id: user.usertype == 0 ? appointment.user_id : user.id,
                    consultationTypeId: appointment.consultationTypeId,
                    appointmentTime: appointment.appointmentTime,
                    appointmentDate: appointment.appointmentDate,
                    appointmentStatus: appointment.appointmentStatus,
                    appointmentType: appointment.appointmentType
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status == 'success') {
                dispatch(setToastState({ toast: true, toastMessage: 'Appointment Created Successfully', toastSuccess: true }));
                navigate('/appointments');
            } else {
                setError(response.data.errors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTime = (time: string) => {
        if (time != "") {
            setToggleTime(false);
            setAppointments((prevState: any) => ({
                ...prevState,
                appointmentTime: time
            }));
        }
    }

    const timeDisplay = (time: string) => {
        console.log(time);
        if (time == "08:30") {
            return "08:30 - 09:30";
        }
        if (time == "09:30") {
            return "09:30 - 10:30";
        }
        if (time == "10:30") {
            return "10:30 - 11:30";
        }
        return "";
    }

    return (
        <div className="m-3">
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <Link to="/appointments">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            Appointments
                        </Link>
                    </li>
                    <li>
                        <span className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            Create Appointment
                        </span>
                    </li>
                </ul>
            </div>

            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3 ">
                <div className="card-body p-0 h-[74vh]">
                    <div className='flex justify-between p-4 px-5 pt-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                            </svg>
                            Create Appointment
                        </h1>
                    </div>
                    <form onSubmit={handleCreateAppointment} className='w-full'>
                        <div className='flex mb-3'>
                            {user.usertype == 0 || user.usertype == 2 ?
                                (
                                    <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                                        <label className='font-semibold text-[14px]'>Patient Name</label>
                                        <Select
                                            className="basic-single w-full h-[45px]"
                                            classNamePrefix="select"
                                            placeholder="Select Patient..."
                                            onChange={handlePatientChange}
                                            options={patients.map(patient => ({ value: patient.id, label: `${patient.firstname} ${patient.lastname}` }))}
                                        />
                                        {error.user_id && <p className="text-red-500 text-[13px] mt-[5px]">Patient is required</p>}
                                    </div>
                                )
                                : (
                                    <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                                        <label className='font-semibold text-[14px]'>Patient Name</label>
                                        <input readOnly type="text" value={`${user.firstname} ${user.lastname}`} name="address" className="input input-bordered w-full h-[48px]" placeholder="Address" />
                                    </div>
                                )
                            }


                            <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                                <label className='font-semibold text-[14px]'>Address</label>
                                <input readOnly type="text" value={user.usertype == 0 ? appointment.address : user.address} name="address" className="input input-bordered w-full h-[48px]" placeholder="Address" />
                            </div>
                        </div>
                        <div className='flex mb-3'>
                            <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                                <label className='font-semibold text-[14px]'>Appointment Date*</label>
                                <input type="date" name="appointment_date" value={appointment.appointmentDate} onChange={handleDateChange} className="input input-bordered w-full h-[48px]" placeholder="Address" />
                                {error.appointmentDate && <p className="text-red-500 text-[13px]">Appointment Date is required</p>}
                            </div>
                            <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                                <label className='font-semibold text-[14px]'>Appointment Time*</label>
                                <input type="text" readOnly onClick={() => setToggleTime(!toggleTime)} name="appointment_time" value={appointment.appointmentTime == undefined ? 'NA' : timeDisplay(appointment.appointmentTime)} onChange={handleTimeChange} className="input input-bordered w-full h-[48px]" placeholder="Time" />
                                {error.appointmentTime && <p className="text-red-500 text-[13px]">Appointment Time is required</p>}
                            </div>
                            {/* <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                                <label className='font-semibold text-[14px]'>Appointment Time*</label>
                                <input type="time" name="appointment_time" value={appointment.appointmentTime} onChange={handleTimeChange} className="input input-bordered w-full h-[48px]" placeholder="Address" />
                                {error.appointmentTime && <p className="text-red-500 text-[13px]">Appointment Time is required</p>}
                            </div> */}
                        </div>
                        <div className='flex'>
                            <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                                <label className='font-semibold text-[14px]'>Contact No.</label>
                                <input readOnly type="text" value={user.usertype == 0 ? appointment.contact_number : user.contact_number} name="contact_number" className="input input-bordered w-full h-[48px]" placeholder="Contact No." />
                            </div>
                            <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                                <label className='font-semibold text-[14px]'>Type of Consultation*</label>
                                <Select
                                    className="basic-single w-full h-[45px]"
                                    classNamePrefix="select"
                                    placeholder="Select Consultation Type..."
                                    onChange={handleConsultationChange}
                                    options={consultationType.map(consultation => ({ value: consultation.consultationTypeId, label: consultation.consultationTypeName }))}
                                />
                                {error.consultationTypeId && <p className="text-red-500 text-[13px] mt-[5px]">Consultation Type is required</p>}

                            </div>
                        </div>
                        <div className='px-5 mt-3'>
                            <button className='btn btn-primary h-[20px] flex bg-[#219EBC] border-0 text-white'>
                                Create Appointment
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <TimeDialog appointmentDate={appointment.appointmentDate} Toggle={toggleTime} SetToggle={() => setToggleTime(!toggleTime)} SetTime={handleTime} />
        </div >
    );
}

export default CreateAppointments;
