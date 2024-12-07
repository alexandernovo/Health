import React, { useState, useEffect } from 'react'
import { EkonsultaModel, initialEkonsultaModel } from '@/types/enkonsultaType';
import { AppointmentModel } from '@/types/appointmentType';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { DateToString, TimeToString12Hour, calculateAge } from '@/utils/DateFunction';

const EkonsultaForm: React.FC = () => {

    const { appointment_id } = useParams<{ appointment_id: string }>();
    const [ekonsulta, setEkonsulta] = useState<EkonsultaModel>(initialEkonsultaModel);
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const token: string | null = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isWalkin = queryParams.get('isWalkin');

    useEffect(() => {
        fetchAppointmentDetails();
    }, [])

    const assign = () => {
        ekonsulta.appointment_id = appointment_id;
        ekonsulta.user_id = appointment.user_id;
    }
    const handleInputChange = (e: any) => {
        const { name, value, type } = e.target;
        if (type == "checkbox") {
            setEkonsulta(prevState => {
                const prevValue = prevState[name as keyof EkonsultaModel]; // Type assertion to keyof HypertensiveModel
                return {
                    ...prevState,
                    [name]: !prevValue
                };
            });
        }
        else {
            setEkonsulta(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleInputChangeCheck = (e: any) => {
        const { name, value, type } = e.target;
        setEkonsulta(prevState => ({
            ...prevState,
            [name]: value
        }));
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

    const saveEkonsulta = async () => {
        assign();
        const response = await axios.post("/api/ekonsulta/createEkonsulta", ekonsulta, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.status == "success") {
            dispatch(setToastState({ toast: true, toastMessage: "Ekonsulta Record Created Successfully", toastSuccess: true }));
            if (isWalkin) {
                navigate(`/ekonsulta_report/${appointment_id}`);
            }
            else {
                navigate('/appointments');
            }
        }
    }
    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0 pb-3">
                    <div className='flex justify-between p-4 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                            </svg>
                            Ekonsulta Record
                        </h1>
                    </div>
                    <div className='px-5'>
                        <div className='border flex justify-between p-2 gap-4'>
                            <div className='flex mt-2 w-[50%]'>
                                <label className='font-semibold text-[13px] flex-nowrap'>Date of Consultation:</label>
                                <input type="text" readOnly value={DateToString(appointment.appointmentDate)} className="input input-bordered input-sm w-full" />
                            </div>
                            <div className='flex mt-2 w-[50%] '>
                                <label className='font-semibold text-[13px] flex-nowrap '>Family Serial No:</label>
                                <input value={ekonsulta.familySerialNo} name='familySerialNo' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                            </div>
                        </div>
                        <div className='border border-t-0 flex gap-2 justify-between items-center p-1 px-2'>
                            <div className='flex mt-2 w-[50%] items-center gap-2'>
                                <label className='font-semibold text-[13px] flex-nowrap'>Time:</label>
                                <input type="text" readOnly value={TimeToString12Hour(appointment.appointmentTime)} className="input input-bordered input-sm w-full" />
                            </div>
                            <div className='flex justify-start items-center w-[50%] gap-2'>
                                <label className='text-[13px] font-bold'>Patient Type:</label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input checked={ekonsulta.patientType == true} name='patientType' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">New</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.patientType == false} name='patientType' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Old</span>
                                </label>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Personal Details</p>
                            <div className='px-2 mt-5'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[13px]'>Patient Name</label>
                                    <input type="text" readOnly value={`${appointment.firstname} ${appointment.lastname}`} className="input input-bordered input-sm w-[50%]" />
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[30%]'>
                                        <label className='font-semibold text-[13px]'>Birthdate</label>
                                        <input readOnly value={DateToString(appointment.birthdate)} type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='font-semibold text-[13px]  w-[10%]'>Age</label>
                                        <input type="text" readOnly value={calculateAge(appointment.birthdate)} className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[15%]' >
                                        <label className='font-semibold text-[13px] '>Gender</label>
                                        <input type="text" readOnly value={appointment.gender} className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Civil Status</label>
                                    <input type="text" readOnly value={appointment.civil_status} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[40%]'>
                                        <label className='font-semibold text-[13px]'>If married, Maiden Last Name:</label>
                                        <input value={ekonsulta.maidenLastname} name='maidenLastname' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[40%]'>
                                        <label className='font-semibold text-[13px] '>Maiden Middle Name:</label>
                                        <input value={ekonsulta.maidenMiddleName} name='maidenMiddleName' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[40%]'>
                                        <label className='font-semibold text-[13px]'>Mother's Name:</label>
                                        <input value={ekonsulta.mothersName} name='mothersName' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[40%]'>
                                        <label className='font-semibold text-[13px] '>Mother's Birthday:</label>
                                        <input value={ekonsulta.mothersBirthday} name='mothersBirthday' onChange={handleInputChange} type="date" className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[40%]'>
                                        <label className='font-semibold text-[13px]'>Educational Attainment:</label>
                                        <input type="text" readOnly value={appointment.education} className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[40%]'>
                                        <label className='font-semibold text-[13px] '>Occupation:</label>
                                        <input type="text" readOnly value={appointment.occupation} className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[40%]'>
                                        <label className='font-semibold text-[13px]'>Religion:</label>
                                        <input type="text" readOnly value={appointment.religion} className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[40%]'>
                                        <label className='font-semibold text-[13px] '>Ethnicity (IP Group):</label>
                                        <input value={ekonsulta.ethnicity} name='ethnicity' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Address</p>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Purok:</label>
                                    <input value={ekonsulta.purok} name='purok' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Barangay:</label>
                                    <input type="text" readOnly value={appointment.brgy} className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Contact Number:</label>
                                    <input type="text" readOnly value={appointment.contact_number} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>ZipCode:</label>
                                    <input value={ekonsulta.zipCode} name='zipCode' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Philhealth</p>
                            <div className='flex w-full gap-4 px-2 items-end'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>NHTS No.:</label>
                                    <input value={ekonsulta.NHTSNo} name='NHTSNo' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <label className="label cursor-pointer flex gap-2">
                                    <input checked={ekonsulta.NHTSClass == true} name='NHTSClass' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Member</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.NHTSClass == false} name='NHTSClass' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Dependent</span>
                                </label>
                            </div>
                            <div className='flex w-full gap-4 px-2 items-end'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>PHIC No.:</label>
                                    <input value={ekonsulta.PHICNo} name='PHICNo' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <label className="label cursor-pointer flex gap-2">
                                    <input checked={ekonsulta.PHICClass == true} name='PHICClass' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Member</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input checked={ekonsulta.PHICClass == false} name='PHICClass' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Dependent</span>
                                </label>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Anthropometrics</p>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Body Length/Height (cm):</label>
                                    <input value={ekonsulta.bodyLength} name='bodyLength' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>Weight(kg):</label>
                                    <input value={ekonsulta.weight} name='weight' onChange={handleInputChange} type="number" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>BMI:</label>
                                    <input value={ekonsulta.BMI} name='BMI' onChange={handleInputChange} type="number" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Head Circumference:</label>
                                    <input type="text" value={ekonsulta.headCircumference} name='headCircumference' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>Waist Circumference:</label>
                                    <input type="number" value={ekonsulta.waistCircumference} name='waistCircumference' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Skinfold Thickness:</label>
                                    <input type="text" value={ekonsulta.skinfoldThickness} name='skinfoldThickness' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>Mid Upper Arm Circumference:</label>
                                    <input type="number" value={ekonsulta.midUpperArmCircumference} name='midUpperArmCircumference' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Anthropometrics</p>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[20%]'>
                                    <label className='font-semibold text-[13px]'>BP(mmHg):</label>
                                    <input type="text" value={ekonsulta.BP} name='BP' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[20%]'>
                                    <label className='font-semibold text-[13px] '>RR(cpm):</label>
                                    <input type="number" value={ekonsulta.RR} name='RR' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[20%]'>
                                    <label className='font-semibold text-[13px] '>HR(bpm):</label>
                                    <input type="number" value={ekonsulta.HR} name='HR' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[20%]'>
                                    <label className='font-semibold text-[13px] '>PR(bpm):</label>
                                    <input type="number" value={ekonsulta.PR} name='PR' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[20%]'>
                                    <label className='font-semibold text-[13px] '>Temp(°C):</label>
                                    <input type="number" value={ekonsulta.Temp} name='Temp' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3 px-2 flex gap-3'>
                            <div className='w-[40%]'>
                                <label className='font-semibold text-[13px] '>Chief Complaints / History of Present Illness:</label>
                                <textarea className="textarea textarea-bordered w-full" value={ekonsulta.chiefComplaints} name='chiefComplaints' onChange={handleInputChange} rows={11} placeholder="Chief Complaints"></textarea>
                            </div>
                            <div className='w-[60%] mt-4'>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.hospitalization} name='hospitalization' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hospitalization</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.emphysema} name='emphysema' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Emphysema</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.pneumonia} name='pneumonia' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Pneumonia</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.asthma} name='asthma' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Asthma</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.epilepsy} name='epilepsy' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Epilepsy/Seizure Disorder</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.thyroid} name='thyroid' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Thyroid Diseases</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input checked={ekonsulta.cancer} name='cancer' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Cancer, specify organ</span>
                                        </label>
                                        <input type="text" disabled={ekonsulta.cancer == false} value={ekonsulta.cancerSpecify} name='cancerSpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[80%]" />
                                    </div>
                                    <div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input checked={ekonsulta.hepatitis} name='hepatitis' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">hepatitis, specify type</span>
                                        </label>
                                        <input type="number" disabled={ekonsulta.hepatitis == false} value={ekonsulta.hepatitisSpecify} name='hepatitisSpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[80%]" />
                                    </div>

                                    <label className="label cursor-pointer flex gap-2 mb-[30px]">
                                        <input checked={ekonsulta.UTI} name='UTI' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Urinary Track Infection</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.cerebrovascular} name='cerebrovascular' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Cerebrovascular Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.hyperlipidemia} name='hyperlipidemia' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hyperlipidemia</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.TB} name='TB' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">TB, specify organ</span>
                                        <input type="string" disabled={ekonsulta.TB == false} value={ekonsulta.TBSpecify} name='TBSpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.coronary} name='coronary' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Coronary Artery Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.hypertension} name='hypertension' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hypertension, highest Bp</span>
                                        <input type="number" className="input input-bordered input-sm w-[30%]" />
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.ifPTB} name='ifPTB' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">if PTB, what category</span>
                                        <input type="string" disabled={ekonsulta.ifPTB == false} value={ekonsulta.ifPTBSpecify} name='ifPTBSpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[30%]" />
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.diabetes} name='diabetes' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes Mellitus</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.pepticUlcer} name='pepticUlcer' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Peptic Ulcer Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.liverDisease} name='liverDisease' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Liver Diseases</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.minorsurgeries} name='minorsurgeries' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Minor Surgeries</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input checked={ekonsulta.COPD} name='COPD' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">COPD</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" checked={ekonsulta.Others} name='Others' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Others</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3 px-2'>
                            <p className='border-b-[1px] py-1'>Past Surgical History (Present Illness)</p>
                            <div className='flex gap-2'>
                                <div className='flex flex-col mt-2  w-[50%]'>
                                    <label className='font-semibold text-[13px]'>Operation:</label>
                                    <input value={ekonsulta.operation1} name='operation1' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2  w-[50%]'>
                                    <label className='font-semibold text-[13px]'>Date:</label>
                                    <input value={ekonsulta.operationDate1} name='operationDate1' onChange={handleInputChange} type="date" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex flex-col mt-2  w-[50%]'>
                                    <label className='font-semibold text-[13px]'>Operation:</label>
                                    <input value={ekonsulta.operation2} name='operation2' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2  w-[50%]'>
                                    <label className='font-semibold text-[13px]'>Date:</label>
                                    <input value={ekonsulta.operationDate2} name='operationDate2' onChange={handleInputChange} type="date" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3 px-2'>
                            <p className='border-b-[1px] py-1'>Screening</p>
                            <div className='flex gap-2 items-end'>
                                <div className='flex flex-col mt-2  w-[50%]'>
                                    <label className='font-semibold text-[13px]'>Visual Acuity:</label>
                                    <input type="text" value={ekonsulta.visualAcuity} name='visualAcuity' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                                <label className='text-[13px] font-semibold mb-2'>(20/20 vision normal value)</label>
                            </div>
                            <div className='flex gap-2 items-end'>
                                <div className='flex flex-col mt-2  w-[50%]'>
                                    <label className='font-semibold text-[13px]'>Basic Hearing Test:</label>
                                    <input type="text" value={ekonsulta.basicHearingTest} name='basicHearingTest' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2  w-[50%]'>
                                    <label className='font-semibold text-[13px]'>Newborn Hearing Test:</label>
                                    <input type="text" value={ekonsulta.newbornHearingTest} name='newbornHearingTest' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <label className='font-semibold text-[13px]'>Cervical Cancer Screening Done:</label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.cervicalCancerScreeningDone == true} name='cervicalCancerScreeningDone' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Yes</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.cervicalCancerScreeningDone == false} name='cervicalCancerScreeningDone' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">No</span>
                                </label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <label className='font-semibold text-[13px]'>HIV/AIDS Screening Done:</label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.hivAidsScreeningDone == true} name='hivAidsScreeningDone' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Yes</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.hivAidsScreeningDone == false} name='hivAidsScreeningDone' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">No</span>
                                </label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <label className='font-semibold text-[13px]'>Prostate Cancer Screening Done:</label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.prostateCancerScreeningDone == true} name='prostateCancerScreeningDone' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Yes</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" checked={ekonsulta.prostateCancerScreeningDone == false} name='prostateCancerScreeningDone' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">No</span>
                                </label>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3 px-2 pt-2'>
                            <textarea value={ekonsulta.developmentalAndMentalEvaluation} name='developmentalAndMentalEvaluation' onChange={handleInputChange} className="textarea textarea-bordered w-full" rows={5} placeholder="Developmental And Mental Health Examination"></textarea>
                        </div>
                        <div className='border mt-2 pb-3 px-2'>
                            <p className='border-b-[1px] py-1'>Laboratory Examinations:</p>
                            <div className='flex'>
                                <div className='w-1/3 border border-r-1'>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.expandedNewbornScreening} name='expandedNewbornScreening' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Expanded Newborn Screening</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.CBC2} name='CBC2' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">CBC</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.bloodType} name='bloodType' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Blood Type</span>
                                        <input type="number" value={ekonsulta.bloodTypeSpecify} name='bloodTypeSpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[30%]" />
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.FBS} name='FBS' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">FBS</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.sputumMicroscopy} name='sputumMicroscopy' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Sputum Microscopy</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.slitSkinSmear} name='slitSkinSmear' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Slit-skin Smear</span>
                                    </label>
                                </div>
                                <div className='w-1/3 border border-r-1'>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.totalCholesterol} name='totalCholesterol' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Total Cholesterol</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.hdlCholesterol} name='hdlCholesterol' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">HDL Cholesterol</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.serumandBun} name='serumandBun' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Serum Creatinine and BUN</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.routineUrinalysis} name='routineUrinalysis' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Routine Urinalysis</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.katoKatz} name='katoKatz' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Kato-Katz for Schistosomiasis</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2 justify-start">
                                        <input type="checkbox" checked={ekonsulta.rapidPlasma} name='rapidPlasma' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Rapid Plasma Reagin For Syphilis</span>
                                    </label>
                                </div>
                                <div className='w-1/3 border'>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.igmAndIgG} name='igmAndIgG' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Igm and IgG Dengue Test</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.nonStructure} name='nonStructure' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Non-structure protein 1 (NS1)</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.hepaB} name='hepaB' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hepa B Rapid Test</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.fecalysis} name='fecalysis' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Fecalysis</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.malarialSmear} name='malarialSmear' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Malarial Smear</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.nucleicAndAmplification} name='nucleicAndAmplification' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Nucleic acid amplification test</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3 px-2'>
                            <p className='border-b-[1px] py-1'>Family History:</p>
                            <div className='flex'>
                                <div className='w-1/5 border'>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Allergy</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.allergy} name='allergy' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Asthma</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.cancer} name='cancer' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Cancer, specify organ</span>
                                        <input type="text" disabled={ekonsulta.cancer} value={ekonsulta.cancerSpecify} name='cancerSpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.cerebrovascular} name='cerebrovascular' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Cerebrovascular Diseases</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.coronary} name='coronary' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Coronary Artery Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.diabetes} name='diabetes' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes Melitus</span>
                                    </label>
                                </div>
                                <div className='w-1/5 border'>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.emphysema} name='emphysema' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Emphysema</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.epilepsy} name='epilepsy' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Epilepsy/Seizure Disorder</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.hepatitis} name='hepatitis' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hepatitis, specify type</span>
                                        <input type="text" disabled={ekonsulta.hepatitis == false} value={ekonsulta.hepatitisSpecify} name='hepatitisSpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.hyperlipidemia} name='hyperlipidemia' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hyperlipidemia</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.hypertension} name='hypertension' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hypertension, highest BP</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.pepticUlcer} name='pepticUlcer' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Peptic Ulcer Disease</span>
                                    </label>
                                </div>
                                <div className='w-1/5 border'>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.pneumonia} name='pneumonia' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Pneumonia</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.thyroid} name='thyroid' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Thyroid Diseases</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.TB} name='TB' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">TB, specify organ</span>
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.ifPTB} name='ifPTB' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">If PTB what category</span>
                                        <input type="text" disabled={ekonsulta.ifPTB == false} value={ekonsulta.ifPTBSpecify} name='ifPTBSpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.Others} name='Others' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Others</span>
                                    </label>
                                </div>
                                <div className='w-2/5 border'>
                                    <label className="label cursor-pointer flex justify-between gap-2">
                                        <div className="flex justify-start gap-2">
                                            <input type="checkbox" checked={ekonsulta.allergy} name='allergy' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Allergy (Food)</span>
                                        </div>
                                        <input type="text" value={ekonsulta.allergySpecify} name='allergySpecify' onChange={handleInputChange} className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                    <label className="label cursor-pointer flex justify-between gap-2">
                                        <div className="flex justify-start gap-2">
                                            <input type="checkbox" checked={ekonsulta.DrugBl} name='DrugBl' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Allergy (Drug)</span>
                                        </div>
                                        <input value={ekonsulta.Drug} name='Drug' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                    <label className="label cursor-pointer flex justify-between gap-2">
                                        <div className="flex justify-start gap-2">
                                            <input checked={ekonsulta.DisabilityBl} name='DisabilityBl' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Disability</span>
                                        </div>
                                        <input value={ekonsulta.Disability} name='Disability' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                    <label className="label cursor-pointer flex justify-between gap-2">
                                        <div className="flex justify-start gap-2">
                                            <input type="checkbox" checked={ekonsulta.DrugBl} name='DrugBl' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Drug</span>
                                        </div>
                                        <input type="text" value={ekonsulta.Drug} name='Drug' onChange={handleInputChange} className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                    <label className="label cursor-pointer flex justify-between gap-2">
                                        <div className="flex justify-start gap-2">
                                            <input checked={ekonsulta.HandicapBl} name='HandicapBl' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Handicap</span>
                                        </div>
                                        <input type="text" value={ekonsulta.Handicap} name='Handicap' onChange={handleInputChange} className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                    <label className="label cursor-pointer flex justify-between gap-2">
                                        <div className="flex justify-start gap-2">
                                            <input checked={ekonsulta.ImpairmentBl} name='ImpairmentBl' onChange={handleInputChange} type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Impairment</span>
                                        </div>
                                        <input type="text" value={ekonsulta.Impairment} name='Impairment' onChange={handleInputChange} className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3 px-2'>
                            <p className='border-b-[1px] py-1'>Risky Practices Leading to Lifestyle-Related Disease:</p>
                            <div className='flex w-full'>
                                <div className='w-[70%]'>
                                    <div className="flex justify-start gap-2 items-center mt-1">
                                        <span className="label-text text-[13px] w-[15%]">Smoking</span>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="Yes" checked={ekonsulta.smoking == "Yes"} name='smoking' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Yes</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="No" checked={ekonsulta.smoking == "No"} name='smoking' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">No</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="Quit" checked={ekonsulta.smoking == "Quit"} name='smoking' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Quit</span>
                                        </label>
                                        <div className="flex justify-start gap-2  w-[60%] ms-5 items-center">
                                            <span className="label-text text-[13px]">No. of sticks/day</span>
                                            <input type="text" value={ekonsulta.number_of_sticks} name='number_of_sticks' onChange={handleInputChange} className="input input-bordered input-sm  w-[30%]" />
                                        </div>
                                    </div>
                                    <div className="flex justify-start gap-2 items-center mt-1">
                                        <span className="label-text text-[13px] w-[15%]">Alcohol</span>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="Yes" checked={ekonsulta.alcohol == "Yes"} name='alcohol' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Yes</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="No" checked={ekonsulta.alcohol == "No"} name='alcohol' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">No</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="Quit" checked={ekonsulta.alcohol == "Quit"} name='alcohol' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Quit</span>
                                        </label>
                                        <div className="flex justify-start gap-2  w-[60%] ms-5 items-center">
                                            <span className="label-text text-[13px]">No. of bottles/day</span>
                                            <input type="text" value={ekonsulta.number_of_bottles} name='number_of_bottles' onChange={handleInputChange} className="input input-bordered input-sm  w-[30%]" />
                                        </div>

                                    </div>
                                    <div className="flex justify-start gap-2 items-center mt-1">
                                        <span className="label-text text-[13px] w-[15%]">Illicit Drugs</span>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="Yes" checked={ekonsulta.illicit_drugs == "Yes"} name='illicit_drugs' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Yes</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="No" checked={ekonsulta.illicit_drugs == "No"} name='illicit_drugs' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">No</span>
                                        </label>
                                        <label className="label cursor-pointer flex justify-start items-center gap-2 w-[15%]">
                                            <input type="checkbox" value="Quit" checked={ekonsulta.illicit_drugs == "Quit"} name='illicit_drugs' onChange={handleInputChangeCheck} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Quit</span>
                                        </label>
                                        <div className="flex justify-start gap-2  w-[60%] ms-5 items-center">
                                            <span className="label-text text-[13px]">No. of packs/day</span>
                                            <input type="text" value={ekonsulta.no_of_packs} name='no_of_packs' onChange={handleInputChange} className="input input-bordered input-sm  w-[30%]" />
                                        </div>
                                    </div>
                                </div>
                                <textarea className="textarea textarea-bordered w-[40%] mt-1" rows={4} value="Note:
Administering RHU staff should fill up an NCD Risk Assessment Form if the client is 20 years old and above">
                                </textarea>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3 px-2'>
                            <p className='border-b-[1px] py-1'>Pertinent P.E. Findings:</p>
                            <div className='flex items-center'>
                                <div className='border p-1 w-[30%]'>Skin</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.skinPallor} name='skinPallor' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Pallor</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.skinRashes} name='skinRashes' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Rashes</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.skinJaundice} name='skinJaundice' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Jaundice</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.skinGoodSkinTurgor} name='skinGoodSkinTurgor' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Good Skin Turgor</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='border p-1 w-[30%]'>Heent</div>
                                <div className='border p-1 flex-1 flex flex-wrap justify-between'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentAnicteric} name='heentAnicteric' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Ancient Sclera</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentIntactTympanic} name='heentIntactTympanic' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Intact Tympanic Membrane</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentExudates} name='heentExudates' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Exudates</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentPupils} name='heentPupils' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Pupils brisky reactive to light</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentTonsil} name='heentTonsil' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Tonsil Pharyngeal Congestion</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentAuralDischarge} name='heentAuralDischarge' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Aural Discharge</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentNasalDischarge} name='heentNasalDischarge' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Nasal Discharge</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heentPalpableMass} name='heentPalpableMass' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Palpable Mass</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='border p-1 w-[30%]'>Chest/Lungs</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestSymmetrical} name='chestSymmetrical' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Symmetrical Chest Expansion</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestClearBreath} name='chestClearBreath' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Clear Breath Sounds</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestRetractions} name='chestRetractions' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Retractions</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestCrackles} name='chestCrackles' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Crackles/rales</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.chestWheeze} name='chestWheeze' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Wheeze</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='border p-1 w-[30%]'>Heart</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heartAdynamic} name='heartAdynamic' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Adymanic Precordium</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heartMurmurs} name='heartMurmurs' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Mumurs</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heartNormalRate} name='heartNormalRate' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Normal Rate Regular Rhythm</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.heartHeaves} name='heartHeaves' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">heavey/Thrils</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='border p-1 w-[30%]'>Abdomen</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenFlat} name='abdomenFlat' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Flat</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenGlobular} name='abdomenGlobular' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Globular</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenFlabby} name='abdomenFlabby' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Flabby</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenMuscleGuarding} name='abdomenMuscleGuarding' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Muscle Guarding</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenTenderness} name='abdomenTenderness' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Tenderness</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.abdomenPalpableMass} name='abdomenPalpableMass' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Palpable Mass</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='border p-1 w-[30%]'>Extremities</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.extremetiesGrossDeformity} name='extremetiesGrossDeformity' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Gross Deformity</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.extremetiesNormalGait} name='extremetiesNormalGait' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Normal Gait</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.extremetiesFullEqualPulse} name='extremetiesFullEqualPulse' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Full Equal pulses</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='border p-1 w-[30%]'>Neurological</div>
                                <div className='border p-1 flex-1 flex flex-wrap gap-3'>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalNormal} name='neurologicalNormal' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Normal</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalDevelopmental} name='neurologicalDevelopmental' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Development Delay</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalSeizures} name='neurologicalSeizures' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Seizures</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalMotorDeficit} name='neurologicalMotorDeficit' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Motor Deficit</span>
                                    </div>
                                    <div className="flex justify-start gap-2">
                                        <input type="checkbox" checked={ekonsulta.neurologicalSensoryDeficit} name='neurologicalSensoryDeficit' onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Sensory Deficit</span>
                                    </div>
                                </div>
                            </div>

                            <textarea value={ekonsulta.diagnosis} name='diagnosis' onChange={handleInputChange} className="textarea textarea-bordered w-full mt-2" rows={3} placeholder="Diagnosis"></textarea>
                            <textarea value={ekonsulta.treatment} name='treatment' onChange={handleInputChange} className="textarea textarea-bordered w-full mt-2" rows={3} placeholder="Treatment"></textarea>
                            <div className='flex gap-3 items-center'>
                                <div className='w-[50%]'>
                                    <span className="label-text text-[13px]">Health Care Provider</span>
                                    <input value={ekonsulta.healthcareProvider} name='healthcareProvider' onChange={handleInputChange} type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='w-[50%]'>
                                    <span className="label-text text-[13px]">Administered By:</span>
                                    <input type="text" value={ekonsulta.administeredBy} name='administeredBy' onChange={handleInputChange} className="input input-bordered input-sm w-full" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-end mb-3 mr-3'>
                        <button onClick={() => saveEkonsulta()} className="btn btn-sm btn-primary mt-2 text-white">Save Ekonsulta Record</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EkonsultaForm
