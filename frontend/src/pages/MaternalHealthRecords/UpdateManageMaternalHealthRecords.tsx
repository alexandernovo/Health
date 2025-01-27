import React, { useEffect, useState } from 'react'
import { MaternalModel } from '@/types/MaternalType';
import { MedicalAssessmentModel } from '@/types/MedicalAssessment';
import { DateToString, calculateAge, StringToDate } from '@/utils/DateFunction';
import { generateRandomId, getMiddleInitial } from '@/utils/CommonFunctions';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppointmentModel } from '@/types/appointmentType';

const UpdateManageMaternalHealthRecords: React.FC = () => {
    const [medical, setMedical] = useState<MedicalAssessmentModel[]>([]);
    const [medicalToRemove, setMedicalToRemove] = useState<MedicalAssessmentModel[]>([]);
    const { appointment_id } = useParams<{ appointment_id: string }>();
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const [errorAssessment, setErrorAssessment] = useState("");
    const token: string | null = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMaternalDetails();
        fetchAppointmentDetails();
    }, []);

    useEffect(() => {
        if (appointment) {
            setMaternal(prevMaternal => ({
                ...prevMaternal,
                appointment_id: appointment_id,
                user_id: appointment.user_id,
                firstname: appointment.firstname || "",
                lastname: appointment.lastname || "",
                birthdate: appointment.birthdate || "",
                occupation: appointment.occupation || "",
                education: appointment.education || "",
                address: appointment.address || "",
                religion: appointment.religion || "",
                age: calculateAge(appointment.birthdate || ""),
            }));
        }
    }, [appointment, appointment_id]);

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

    const [error, setError] = useState<MaternalModel>({
        dateAdmitted: "",
        dateDischarge: "",
    });

    const [maternal, setMaternal] = useState<MaternalModel>({
        fNo: "",
        philhealth: "",
        husbandName: "",
        husbandbirthdate: "",
        husbandage: undefined,
        husbandAddress: "",
        husbandEducation: "",
        husbandOccupation: "",
        dateofmarriage: "",
        dateAdmitted: "",
        dateDischarge: "",
        timeAdmitted: "",
        timeDischarge: "",
        pastPTB: false,
        pastHeartDisease: false,
        pastDiabetes: false,
        pastAsthma: false,
        pastGoiter: false,
        familyHistoryPTB: false,
        familyHistoryHeartDisease: false,
        familyHistoryDiabetes: false,
        familyHistoryHypertension: false,
        familyHistoryGoiter: false,
        LMP: "",
        EDC: "",
        GRAVIDA: "",
        PARA: "",
        OBScore: "",
        below18ORabove35: false,
        pregnancyMore4: false,
        poorObstetrical: false,
        Below2YearsBirthInterval: false,
        lessThan145cm: false,
        moreThan145cm: false,
        antePostPartrum: false,
        prematureLabor: false,
        abnormalPresentation: false,
        preEnclampsia: false,
        STD: false,
        TT1: false,
        TT2: false,
        TT3: false,
        TT4: false,
        TT5: false,
    });



    const InitialValueMedicalAssessment = {
        keyId: "",
        Date: "",
        BP: "",
        HR: "",
        AOG: 0,
        RR: "",
        FH: 0,
        WT: 0,
        TEMP: 0,
        FHBPres: false,
        Remarks: ""
    };

    const [medicalForm, setMedicalForm] = useState(InitialValueMedicalAssessment);

    const handleCheckboxChangeOBScore = (event: any) => {
        const { name, checked } = event.target;
        if (checked) {
            setMaternal(prevState => ({ ...prevState, [name]: event.target.value }));
        } else {
            setMaternal(prevState => ({ ...prevState, [name]: '' }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMedicalForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleHusbandAGE = (event: React.ChangeEvent<HTMLInputElement>) => {
        const husbandBirthdate = event.target.value; // Assuming the event target value is the husband's birthdate
        const husbandAge = calculateAge(husbandBirthdate);

        setMaternal(prevState => ({
            ...prevState,
            husbandbirthdate: husbandBirthdate,
            husbandage: husbandAge
        }));
    };


    const removeMedicalAssessment = (keyIdToRemove?: string) => {
        const indexToRemove = medical.findIndex((item) => item.keyId == keyIdToRemove);
        if (indexToRemove !== -1) {
            const medicalToRemove = medical[indexToRemove]; // Get the medical model
            if (medicalToRemove.medicalAssessmentID != 0) {
                setMedicalToRemove((prev) => [...prev, medicalToRemove]); // Add the medical model to remove array
            }
            const updatedMedical = [...medical]; // Create a copy of the array
            updatedMedical.splice(indexToRemove, 1); // Remove the item
            setMedical(updatedMedical); // Update the state with the new array
        }
    };

    const handleInputChangeMaternal = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMaternal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleMedicalCheckbox = (event: any) => {
        const { name, checked } = event.target;
        setMedicalForm(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };
    const handleCheckboxChangeMaternal = (event: any) => {
        const { name, checked } = event.target;
        setMaternal(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };


    const addForm = () => {
        if (!medicalForm.Date || !medicalForm.BP || !medicalForm.HR || !medicalForm.RR) {
            setErrorAssessment('Please fill in all required fields (Date, BP, HR, RR)');
            return;
        }

        setMedical(prevMedical => {
            const newMedicalAssessment = {
                keyId: generateRandomId(),
                Date: medicalForm.Date,
                BP: medicalForm.BP,
                HR: medicalForm.HR,
                AOG: medicalForm.AOG,
                RR: medicalForm.RR,
                FH: medicalForm.FH,
                WT: medicalForm.WT,
                TEMP: medicalForm.TEMP,
                FHBPres: medicalForm.FHBPres,
                Remarks: medicalForm.Remarks,
                medicalAssessmentID: 0,
                maternal_id: maternal.maternal_id
            };
            return [...prevMedical, newMedicalAssessment];
        });

        setMedicalForm(InitialValueMedicalAssessment);
    };

    const updateMaternal = async () => {
        try {
            maternal.medicalAssessment = medical; //put medical in medicalAssessment model
            maternal.removeMedicalAssessment = medicalToRemove;
            const response = await axios.put("/api/maternal/updateMaternalRecords", maternal,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status == "success") {
                dispatch(setToastState({ toast: true, toastMessage: "Maternal Health Record Updated Successfully", toastSuccess: true }));
                navigate(`/maternal_records/${appointment.user_id}`);
            }
            else {
                setError(response.data.errors);
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='m-3 overflow-hidden'>
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
                            {appointment?.firstname} ${getMiddleInitial(appointment?.middlename || '')} {appointment?.lastname} ${appointment?.extension || ''} Records
                        </Link>
                    </li>
                    <li>
                        <Link to={`/maternal_records/${appointment.user_id}`} className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            {appointment?.firstname} ${getMiddleInitial(appointment?.middlename || '')} {appointment?.lastname} ${appointment?.extension || ''} Maternal Health Records
                        </Link>
                    </li>
                    <li>
                        <span className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>
                            Update {appointment?.firstname} ${getMiddleInitial(appointment?.middlename || '')} {appointment?.lastname} ${appointment?.extension || ''} Maternal Health Records
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
                            Maternal Health Record
                        </h1>
                    </div>
                    <div className='flex px-[24px]'>
                        <div>
                            <div className='flex flex-col'>
                                <label className='font-semibold text-[14px]'>F. No.</label>
                                <input type="text" placeholder="F. No." name='fNo' value={maternal.fNo} onChange={handleInputChangeMaternal} className="input input-bordered w-full" />
                            </div>
                            <div className='flex flex-col mt-3'>
                                <label className='font-semibold text-[14px]'>Philhealth No:</label>
                                <input type="text" placeholder="Philhealth No:" name='philhealth' value={maternal.philhealth} onChange={handleInputChangeMaternal} className="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto px-5 pb-[30px] w-full mt-3">
                        <h1 className='font-bold mb-4'>1. General Data</h1>
                        <div className='flex justify-between gap-4'>
                            <div className='w-1/3'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-semibold text-[14px]'>Patient Name</label>
                                    <input type="text" readOnly value={`${maternal.firstname} ${maternal.lastname}`} placeholder="Patient Name" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px] w-full'>Date of Birth</label>
                                    <input type="text" readOnly value={DateToString(maternal.birthdate)} placeholder="Date of Birth" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Patient Age</label>
                                    <input type="text" readOnly value={maternal.age} placeholder="Age" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 justify-between gap-4'>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Address</label>
                                    <input type="text" readOnly value={maternal.address} placeholder="Address" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Education</label>
                                    <input type="text" readOnly value={maternal.education} placeholder="Education" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Occupation</label>
                                    <input type="text" readOnly value={maternal.occupation} placeholder="Occupation" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 gap-4'>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Husband</label>
                                    <input type="text" placeholder="Husband's name" name='husbandName' value={maternal.husbandName} onChange={handleInputChangeMaternal} className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Date of Birth</label>
                                    <input type="date" name='husbandbirthdate' value={maternal.husbandbirthdate} onChange={handleHusbandAGE} className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Age</label>
                                    <input type="text" readOnly placeholder="Age" value={maternal.husbandage} className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 justify-between gap-4'>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Address</label>
                                    <input type="text" name='husbandAddress' value={maternal.husbandAddress} onChange={handleInputChangeMaternal} placeholder="Address" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Education</label>
                                    <input type="text" name='husbandEducation' value={maternal.husbandEducation} onChange={handleInputChangeMaternal} placeholder="Education" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Occupation</label>
                                    <input type="text" name='husbandOccupation' value={maternal.husbandOccupation} onChange={handleInputChangeMaternal} placeholder="Occupation" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 w-full gap-5'>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Date of Marriage</label>
                                    <input type="date" placeholder="Date of Marriage" name='dateofmarriage' value={maternal.dateofmarriage} onChange={handleInputChangeMaternal} className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Religion</label>
                                    <input type="text" placeholder="Religion" readOnly value={maternal.religion} className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 gap-5'>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Date Admitted</label>
                                    <input type="date" value={maternal.dateAdmitted} name='dateAdmitted' onChange={handleInputChangeMaternal} className="input input-bordered w-full" />
                                </div>
                                {error.dateAdmitted && <p className="text-red-500 text-[13px]">{error.dateAdmitted}</p>}
                            </div>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Date Discharge</label>
                                    <input type="date" placeholder="Education" name='dateDischarge' value={maternal.dateDischarge} onChange={handleInputChangeMaternal} className="input input-bordered w-full" />
                                </div>
                                {error.dateDischarge && <p className="text-red-500 text-[13px]">{error.dateDischarge}</p>}
                            </div>
                        </div>
                        <div className='flex mt-3 gap-5'>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Time Admitted</label>
                                    <input type="time" value={maternal.timeAdmitted} name='timeAdmitted' onChange={handleInputChangeMaternal} className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Time Discharge</label>
                                    <input type="time" placeholder="Education" name='timeDischarge' value={maternal.timeDischarge} onChange={handleInputChangeMaternal} className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold mb-4 mt-5'>2. Medical History</h1>

                        <div className='ml-3'>
                            <h2 className='font-semibold text-[14px]'>1. Past History (Please Check)</h2>

                            <div className='flex w-1/2 justify-between'>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="pastPTB" checked={maternal.pastPTB} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">PTB</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="pastHeartDisease" checked={maternal.pastHeartDisease} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Heart Disease</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="pastDiabetes" checked={maternal.pastDiabetes} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="pastAsthma" checked={maternal.pastAsthma} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Asthma</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="pastGoiter" checked={maternal.pastGoiter} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Goiter</span>
                                    </label>
                                </div>
                            </div>
                            <h2 className='font-semibold text-[14px] mt-2'>2. Family History (Please Check)</h2>
                            <div className='flex w-1/2 justify-between'>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <span className="label-text text-[13px]">PTB</span>
                                        <input type="checkbox" name="familyHistoryPTB" checked={maternal.familyHistoryPTB} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryHeartDisease" checked={maternal.familyHistoryHeartDisease} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Heart Disease</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryDiabetes" checked={maternal.familyHistoryDiabetes} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryHypertension" checked={maternal.familyHistoryHypertension} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hypertension</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="familyHistoryGoiter" checked={maternal.familyHistoryGoiter} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Goiter</span>
                                    </label>
                                </div>
                            </div>
                            <h2 className='font-semibold text-[14px] mt-2'>3. Menstrual History</h2>
                            <div className='flex gap-3'>
                                <div className='flex flex-col mt-2 w-1/4'>
                                    <label className='font-semibold text-[12px]'>LMP (Last Menstrual Period)</label>
                                    <input type="date" placeholder="LMP" name='LMP' value={maternal.LMP} onChange={handleInputChangeMaternal} className="input input-bordered w-full input-sm" />
                                </div>
                                <div className='flex flex-col mt-2 w-1/4'>
                                    <label className='font-semibold text-[12px]'>EDC (Estimated Date of Confinement)</label>
                                    <input type="date" placeholder="EDC" name='EDC' value={maternal.EDC} onChange={handleInputChangeMaternal} className="input input-bordered w-full input-sm" />
                                </div>
                                <div className='flex flex-col mt-2 w-1/4'>
                                    <label className='font-semibold text-[12px]'>GRAVIDA</label>
                                    <input type="text" placeholder="GRAVIDA" name='GRAVIDA' value={maternal.GRAVIDA} onChange={handleInputChangeMaternal} className="input input-bordered w-full input-sm" />
                                </div>
                                <div className='flex flex-col mt-2 w-1/4'>
                                    <label className='font-semibold text-[12px]'>PARA</label>
                                    <input type="number" placeholder="PARA" name='PARA' value={maternal.PARA} onChange={handleInputChangeMaternal} className="input input-bordered w-full input-sm" />
                                </div>
                            </div>
                            <h2 className='font-semibold text-[14px] mt-4'>OB GYNE HISTORY</h2>
                            <div className='flex w-1/3 justify-between items-center'>
                                <label className='text-[12px]'>OB SCORE</label>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="OBScore" value="F" checked={maternal.OBScore == 'F'} onChange={handleCheckboxChangeOBScore} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">F</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="OBScore" value="P" checked={maternal.OBScore == 'P'} onChange={handleCheckboxChangeOBScore} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">P</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="OBScore" value="A" checked={maternal.OBScore == 'A'} onChange={handleCheckboxChangeOBScore} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">A</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="OBScore" value="L" checked={maternal.OBScore == 'L'} onChange={handleCheckboxChangeOBScore} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">L</span>
                                    </label>
                                </div>
                            </div>

                            <h2 className='font-semibold text-[14px] mt-3'>RISK FACTOR</h2>
                            <div className='flex'>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="below18ORabove35" checked={maternal.below18ORabove35} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Below 18 - above 35 yrs.</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="pregnancyMore4" checked={maternal.pregnancyMore4} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Pregnancy more than 4</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="poorObstetrical" checked={maternal.poorObstetrical} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Poor Obstetrical Condition</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="Below2YearsBirthInterval" checked={maternal.Below2YearsBirthInterval} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Below 2 yrs. Birth Interval</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="lessThan145cm" checked={maternal.lessThan145cm} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Less Than 145 cm. Height</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="moreThan145cm" checked={maternal.moreThan145cm} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">More than 145 cm. Height</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex '>
                                <h2 className='font-semibold text-[13px] mt-3 w-1/3'>Present S/s</h2>
                                <h2 className='font-semibold text-[14px] mt-3 w-1/3'>TETANUS TOXOID IMMUNIZATION</h2>
                            </div>
                            <div className='flex'>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="antePostPartrum" checked={maternal.antePostPartrum} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Ante and post partrum hemmorrhage.</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="prematureLabor" checked={maternal.prematureLabor} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Premature labor</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="abnormalPresentation" checked={maternal.abnormalPresentation} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Abnormal Presentation</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="preEnclampsia" checked={maternal.preEnclampsia} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Pre Enclampsia</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="STD" checked={maternal.STD} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">STD</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="TT1" checked={maternal.TT1} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT1</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="TT2" checked={maternal.TT2} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT2</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="TT3" checked={maternal.TT3} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT3</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="TT3" checked={maternal.TT4} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT4</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="TT5" checked={maternal.TT5} onChange={handleCheckboxChangeMaternal} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT5</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <h1 className='font-semibold text-[15px] mt-3'>MEDICAL ASSESSMENTS</h1>
                            <table className="table table-bordered border mt-1">
                                <thead>
                                    <tr>
                                        <th className="font-semibold text-black">Date</th>
                                        <th className="font-semibold text-black">B/P</th>
                                        <th className="font-semibold text-black">WT.</th>
                                        <th className="font-semibold text-black">HR</th>
                                        <th className="font-semibold text-black">RR</th>
                                        <th className="font-semibold text-black">TEMP</th>
                                        <th className="font-semibold text-black">AOG</th>
                                        <th className="font-semibold text-black">FH</th>
                                        <th className="font-semibold text-center text-black">FHB Pres.</th>
                                        <th className="font-semibold text-black">REMARKS</th>
                                        <th></th>
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
                                                <td className='border-r-[1px] py-0'>{DateToString(md.Date)}</td>
                                                <td className='border-r-[1px] py-0'>{md.BP}</td>
                                                <td className='border-r-[1px] py-0'>{md.WT}</td>
                                                <td className='border-r-[1px] py-0'>{md.HR}</td>
                                                <td className='border-r-[1px] py-0'>{md.RR}</td>
                                                <td className='border-r-[1px] py-0'>{md.TEMP}</td>
                                                <td className='border-r-[1px] py-0'>{md.AOG}</td>
                                                <td className='border-r-[1px] py-0'>{md.FH}</td>
                                                <td className='border-r-[1px] py-0'>
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
                                                <td className='border-r-[1px] py-0'>{md.Remarks}</td>
                                                <td className='border-r-[1px] py-0'>
                                                    <div className='flex justify-center items-center'>
                                                        <button onClick={() => removeMedicalAssessment(md.keyId)} className='btn btn-ghost rounded-full px-3 active:bg-red-400 hover:bg-red-300'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 active:text-white ">
                                                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
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
                            <div className='border p-3 mt-3 rounded-md mb-3'>
                                <h1 className='font-semibold text-[15px] mt-3 mb-2 flex items-center gap-2'>
                                    MEDICAL ASSESSMENTS FORM
                                    {errorAssessment && (
                                        <p className='text-red-400 text-[13px]'>{errorAssessment}</p>
                                    )}
                                </h1>
                                <div className='flex gap-3'>
                                    <div className='w-1/3'>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Date</label>
                                            <input
                                                type="date"
                                                placeholder="Type here"
                                                className="input w-full input-bordered input-sm"
                                                name="Date"
                                                value={medicalForm.Date}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Heart Rate(HR)</label>
                                            <input
                                                type="text"
                                                placeholder="Heart Rate"
                                                className="input w-full input-bordered input-sm"
                                                name="HR"
                                                value={medicalForm.HR}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='font-semibold text-[14px]'>Age of Gestation (AOG)</label>
                                            <input
                                                type="number"
                                                placeholder="AOG"
                                                className="input w-full input-bordered input-sm"
                                                name="AOG"
                                                value={medicalForm.AOG}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='w-1/3'>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Blood Pressure (BP)</label>
                                            <input
                                                type="text"
                                                placeholder="Blood Pressure"
                                                className="input w-full input-bordered input-sm"
                                                name="BP"
                                                value={medicalForm.BP}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Respiratory Rate(RR)</label>
                                            <input
                                                type="text"
                                                placeholder="Respiratory Rate"
                                                className="input w-full input-bordered input-sm"
                                                name="RR"
                                                value={medicalForm.RR}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='font-semibold text-[14px]'>Fundal Height(FH)</label>
                                            <input
                                                type="number"
                                                placeholder="Fundal Height"
                                                step={0.01}
                                                className="input w-full input-bordered input-sm"
                                                name="FH"
                                                value={medicalForm.FH}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='w-1/3'>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Weight (WT)</label>
                                            <input
                                                type="number"
                                                placeholder="Weight"
                                                step={0.01}
                                                className="input w-full input-bordered input-sm"
                                                name="WT"
                                                value={medicalForm.WT}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='font-semibold text-[14px]'>Temperature (TEMP)</label>
                                            <input
                                                type="number"
                                                placeholder="Temperature"
                                                step={0.01}
                                                className="input w-full input-bordered input-sm"
                                                name="TEMP"
                                                value={medicalForm.TEMP}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <label className="cursor-pointer flex gap-2 items-center items-end mt-[30px]">
                                            <input
                                                type="checkbox"
                                                name="FHBPres"
                                                checked={medicalForm.FHBPres}
                                                onChange={handleMedicalCheckbox}
                                                className="checkbox checkbox-primary checkbox-xs"
                                            />
                                            <span className="label-text text-[13px]">Fetal Heartbeat Present (FHB Pres.)</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='mt-2 flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Remarks</label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Remarks"
                                        name="Remarks"
                                        value={medicalForm.Remarks}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <button className="btn btn-sm btn-primary btn-outline mt-2" onClick={addForm}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                    </svg>
                                    Add
                                </button>
                            </div>
                            <div className='flex justify-end gap-2'>
                                <Link to={`/maternal_records/${appointment.user_id}`} className='btn btn-default btn-sm mt-2 btn-outline'>Cancel</Link>
                                <button onClick={() => updateMaternal()} className="btn btn-sm btn-primary mt-2 text-white">Update Maternal Health Record</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateManageMaternalHealthRecords
