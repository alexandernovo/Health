import React, { useState, useEffect } from 'react'
import { UserModel } from '@/types/userType';
import axios from 'axios';
import Select from 'react-select';
import { initialReportFilter, ReportFilterParam } from '@/types/reportfilter';
import { ConsultationModel } from '@/types/consultationType';
import { getMiddleInitial } from '@/utils/CommonFunctions';

interface PatientRecordDialogProps {
    Toggle: () => void;
    Show: boolean;
    Filter: (filter: ReportFilterParam) => void;
}

const PatientRecordDialog: React.FC<PatientRecordDialogProps> = (props: PatientRecordDialogProps) => {
    const token: string | null = localStorage.getItem("token");
    const [patients, setPatients] = useState<UserModel[]>([]);
    const [error, setError] = useState<boolean>();
    const [filter, setFilter] = useState<ReportFilterParam>(initialReportFilter);
    const [consultationType, setConsultationType] = useState<ConsultationModel[]>([]);

    const reportTypes: { value: string, label: string }[] = [
        { value: 'Hypertensive/Diabetic', label: 'Hypertensive/Diabetic' },
        { value: 'Family Planning', label: 'Family Planning' },
        { value: 'Newborn Delivery Record', label: 'Newborn Delivery Record' },
        { value: 'Maternal Health Records', label: 'Maternal Health Records' },
        { value: 'Immunization', label: 'Immunization' },
        { value: 'Ekonsulta', label: 'Check-up' },
        { value: 'Vaccination', label: 'Vaccination' },
    ];

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
    const handleConsultationChange = (selectedOption: any) => {
        const selectedConsultationType = consultationType.find(
            consultation => consultation.consultationTypeId == selectedOption.value
        );
        setFilter((prevState: any) => ({
            ...prevState,
            consultationTypeId: selectedConsultationType?.consultationTypeId,
            reportType: selectedConsultationType?.consultationTypeName
        }));
    };

    const handleChangeReport = (selectedOption: any) => {
        setFilter((prevState: any) => ({
            ...prevState,
            reportType: selectedOption.value
        }));
    }
    const handlePatientChange = (selectedOption: any) => {
        const selectedPatient = patients.find(patient => patient.id == selectedOption.value);
        setFilter((prevState: any) => ({
            ...prevState,
            user_id: selectedPatient?.id
        }));

        console.log('Selected Patient:', selectedPatient);
    };

    const createForm = () => {
        if (filter.consultationTypeId == 0 || filter.user_id == 0) {
            setError(true);
        }
        else {
            setError(false);
            props.Filter(filter)
        }
    }

    return (
        <dialog className={`modal ${props.Show && 'modal-open'}`} >
            <div className="modal-box rounded-md p-0 overflow-hidden">
                <div className='bg-[#219EBC] p-4 px-5 sticky top-0 z-10 text-white flex justify-between'>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Add Patient Records
                    </h3>
                    <button className="btn btn-ghost btn-sm rounded-full p-1" onClick={() => props.Toggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className='modal-body px-5 pt-4 max-h-[96vh] pb-[250px] overflow-scroll'>
                    <div className='w-full mx-auto h-full pb-[20px]'>
                        <div className='w-full flex flex-col items-center'>
                            <div className='md:w-full lg:w-full'>
                                {error && (
                                    <p className='text-red-500 mb-1'>Please select patient and record type</p>
                                )}
                                <Select
                                    className="basic-single w-full h-[45px]"
                                    classNamePrefix="select"
                                    placeholder="Select Patient..."
                                    onChange={handlePatientChange}
                                    options={patients.map(patient => ({ value: patient.id, label: `${patient.firstname} ${getMiddleInitial(patient.middlename || '')} ${patient.lastname} ${patient.extension || ''}` }))}
                                />

                                {/* <Select
                                    className="basic-single w-full h-[45px] mt-4 z-5"
                                    classNamePrefix="select"
                                    placeholder="Select Report Type..."
                                    onChange={handleChangeReport}
                                    options={reportTypes.map(report => ({ value: report.value, label: `${report.label}` }))}
                                /> */}
                                 <Select
                                    className="basic-single w-full h-[45px] mt-3"
                                    classNamePrefix="select"
                                    placeholder="Select Consultation Type..."
                                    onChange={handleConsultationChange}
                                    options={consultationType.map(consultation => ({ value: consultation.consultationTypeId, label: consultation.consultationTypeName }))}
                                />
                            </div>
                            <button className='btn btn-primary mt-5 w-full py-2' onClick={() => createForm()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Add Records
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default PatientRecordDialog
