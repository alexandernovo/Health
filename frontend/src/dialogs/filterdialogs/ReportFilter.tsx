import React, { useState, useEffect } from 'react'
import { UserModel } from '@/types/userType';
import { initialReportFilter, ReportFilterParam } from '@/types/reportfilter';
import axios from 'axios';
import Select from 'react-select';

interface ReportFilterProps {
    Toggle: () => void,
    Show: boolean;
    Filter: (filter: ReportFilterParam) => void
}

const ReportFilter: React.FC<ReportFilterProps> = (props: ReportFilterProps) => {
    const token: string | null = localStorage.getItem("token");
    const [patients, setPatients] = useState<UserModel[]>([]);
    const [filter, setFilter] = useState<ReportFilterParam>(initialReportFilter);
    const [error, setError] = useState<boolean>();

    const reportTypes: { value: string, label: string }[] = [
        { value: 'Hypertensive/Diabetic', label: 'Hypertensive/Diabetic' },
        { value: 'Family Planning', label: 'Family Planning' },
        { value: 'Newborn Delivery Record', label: 'Newborn Delivery Record' },
        { value: 'Maternal Health Records', label: 'Maternal Health Records' },
        { value: 'Immunization', label: 'Immunization' },
        { value: 'Ekonsulta', label: 'E-konsulta' },
        { value: 'Vaccination', label: 'Vaccination' },
    ];

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const response = await axios.get('/api/users/getPatients', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status === 'success') {
                setPatients(response.data.patients);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = () => {
        if (filter.reportType == '' || filter.user_id == 0) {
            setError(true);
        }
        else {
            setError(false);
            props.Filter(filter)

        }
    }

    const handleChangeReport = (selectedOption: any) => {
        setFilter((prevState: any) => ({
            ...prevState,
            reportType: selectedOption.value
        }));
    }

    const handlePatientChange = (selectedOption: any) => {
        const selectedPatient = patients.find(patient => patient.id === selectedOption.value);
        setFilter((prevState: any) => ({
            ...prevState,
            user_id: selectedPatient?.id
        }));

        console.log('Selected Patient:', selectedPatient);
    };


    return (
        <dialog className={`modal ${props.Show && 'modal-open'}`} >
            <div className="modal-box rounded-md p-0 overflow-hidden">
                <div className='bg-[#219EBC] p-4 px-5 sticky top-0 z-10 text-white flex justify-between'>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                        </svg>
                        Filter Reports Records
                    </h3>
                    <button className="btn btn-ghost btn-sm rounded-full p-1" onClick={() => props.Toggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className='modal-body px-5 pt-4 max-h-[96vh] pb-[300px] overflow-scroll'>
                    <div className='w-full mx-auto h-full pb-[20px]'>
                        <div className='w-full flex flex-col items-center'>
                            <div className='md:w-full lg:w-full'>
                                <div className=' w-full px-5'>
                                    {error && (
                                        <p className='text-red-500 mb-1'>Please fill the filter</p>
                                    )}
                                    <label className='font-semibold text-[14px]'>Patient Name</label>
                                    <Select
                                        className="basic-single w-full h-[45px]"
                                        classNamePrefix="select"
                                        placeholder="Select Patient..."
                                        onChange={handlePatientChange}
                                        options={patients.map(patient => ({ value: patient.id, label: `${patient.firstname} ${patient.lastname}` }))}
                                    />

                                    <Select
                                        className="basic-single w-full h-[45px] mt-4 z-5"
                                        classNamePrefix="select"
                                        placeholder="Select Report Type..."
                                        onChange={handleChangeReport}
                                        options={reportTypes.map(report => ({ value: report.value, label: `${report.label}` }))}
                                    />

                                    <button className='btn btn-primary mt-5 w-full py-2' onClick={() => handleFilter()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                        </svg>
                                        Filter
                                    </button>
                                    {/* <div className='w-full mt-3'>
                                        <label className='font-semibold text-[14px]'>Date From</label>
                                        <input type="date" value={filter.dateFrom} name="address" className="input input-bordered w-full h-[48px]" placeholder="Address" />
                                    </div>

                                    <div className='w-full mt-3'>
                                        <label className='font-semibold text-[14px]'>Date To</label>
                                        <input type="date" value={filter.dateTo} name="address" className="input input-bordered w-full h-[48px]" placeholder="Address" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default ReportFilter
