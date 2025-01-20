import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserModel } from '@/types/userType';
import { Link } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';
import { AppointmentModel } from '@/types/appointmentType';
import { DateToString, TimeToString12Hour } from '@/utils/DateFunction';

const PatientRecords: React.FC = () => {
    const token: string | null = localStorage.getItem('token');
    const [record, setRecord] = useState<AppointmentModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { user_id } = useParams<{ user_id: string }>();

    useEffect(() => {
        FetchUser();
        FetchPatientRecords();
    }, []);

    const handleRefresh = () => {
        setSearchQuery('');
        FetchPatientRecords();
    }
    const FetchUser = async () => {
        try {
            const response = await axios.get(`/api/users/getUserById/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status == "success") {
                setUser(response.data.user);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const FetchPatientRecords = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/record/getUserRecord/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status == "success") {
                setRecord(Object.values(response.data.record));
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredRecords = record.filter((record) =>
        record.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.consultationTypeName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const RedirectTo = (consultationTypeName?: string, appointment_id?: number) => {
        if (consultationTypeName == "Maternal Health Records") {
            return `/udpatematernal/${appointment_id}`;
        }
        else if (consultationTypeName == "Newborn Delivery Record") {
            return `/newborndeliveryformupdate/${appointment_id}`;
        }
        else if (consultationTypeName == "Family Planning") {
            return `/familyplanning_form_update/${appointment_id}`;
        }
        else if (consultationTypeName == "Hypertensive/Diabetic") {
            return `/hypertensive_update/${appointment_id}`
        }
        else if (consultationTypeName == "Vaccination") {
            return `/vaccination_update/${appointment_id}`
        }
        else if (consultationTypeName == "Immunization") {
            return `/immunization_update/${appointment_id}`
        }
        else if (consultationTypeName == "Check-up") {
            return `/ekonsulta_form_update/${appointment_id}`
        }
        else {
            return "";
        }
    }

    const RedirectToPrint = (consultationTypeName?: string, appointment_id?: number) => {
        if (consultationTypeName == "Maternal Health Records") {
            return `/maternal_report/${appointment_id}`;
        }
        else if (consultationTypeName == "Newborn Delivery Record") {
            return `/newborn_report/${appointment_id}`;
        }
        else if (consultationTypeName == "Family Planning") {
            return `/familyplanning_report/${appointment_id}`;
        }
        else if (consultationTypeName == "Hypertensive/Diabetic") {
            return `/hypertensive_report/${appointment_id}`
        }
        else if (consultationTypeName == "Vaccination") {
            return `/vaccination_report/${appointment_id}`
        }
        else if (consultationTypeName == "Immunization") {
            return `/immunization_report/${appointment_id}`
        }
        else if (consultationTypeName == "Check-up") {
            return `/ekonsulta_report/${appointment_id}`
        }
        else {
            return "";
        }
    }

    const columns: TableColumn<AppointmentModel>[] = [
        // {
        //     name: 'Patient Name',
        //     selector: (row: AppointmentModel) => `${row.firstname} ${row.lastname} ${row.extension || ''}` || '',
        //     sortable: true,
        //     width: '40%'
        // },
        {
            name: 'Consultation Type',
            selector: (row: AppointmentModel) => row.consultationTypeName || '',
            sortable: true,
        },
        {
            name: 'Appointment Date',
            selector: (row: AppointmentModel) => DateToString(row.appointmentDate) || '',
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row: AppointmentModel) => (
                <div className='flex gap-2'>
                    <Link to={RedirectTo(row.consultationTypeName, row.appointment_id)} className={`btn btn-outline btn-xs flex gap-1 btn-primary px-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        Update
                    </Link >
                    <Link to={RedirectToPrint(row.consultationTypeName, row.appointment_id)} className={`btn btn-outline btn-xs flex gap-1 btn-primary px-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                        </svg>
                        View
                    </Link >
                </div>
            ),
            sortable: false,
        },

    ];

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
                        <span className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            {user?.firstname} {user?.lastname} {user?.extension} Records
                        </span>
                    </li>
                </ul>
            </div>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0">
                    <div className='flex justify-between p-5 pb-0 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
                                <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                                <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                            </svg>
                            {user?.firstname} {user?.lastname} {user?.extension} Records
                        </h1>
                        <div className='flex gap-1'>
                            <button className='btn btn-ghost btn-sm' onClick={() => handleRefresh()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </div>
                    </div>
                    <div className='pb-5 px-5'>
                        <DataTable
                            columns={columns}
                            data={filteredRecords}
                            noHeader
                            pagination
                            highlightOnHover
                            persistTableHead={true}
                            progressPending={loading}
                            progressComponent={<span className="loading loading-spinner text-info mt-2"></span>}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientRecords;
