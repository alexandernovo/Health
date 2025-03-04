import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserModel } from '@/types/userType';
import ReportFilter from '@/dialogs/filterdialogs/ReportFilter';
import { ReportFilterParam, initialReportFilter } from '@/types/reportfilter';
import PatientRecordDialog from '@/dialogs/patientrecordsdialog/PatientRecordDialog';
import { useNavigate } from 'react-router-dom';
import { AppointmentModel } from '@/types/appointmentType';
import { getMiddleInitial } from '@/utils/CommonFunctions';

const ManageRecords: React.FC = () => {
    const token: string | null = localStorage.getItem("token");
    const [users, setUsers] = useState<UserModel[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [toggle, setToggles] = useState<boolean>(false);
    const [togglePatientModal, setTogglePatientModal] = useState<boolean>(false);
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
        appointmentStatus: 3,
        isActive: undefined,
        user_id: undefined,
        appointmentType: null
    });
    const navigate = useNavigate();

    const Filter = (filter: ReportFilterParam) => {
        const url = redirectToReport(filter); // Get the URL from the redirect function
        console.log(url);
        if (url) {
            navigate(url); // Navigate directly to the URL
        }
    };

    const PatientForm = async (filter: ReportFilterParam) => {
        // Wait for the URL to be resolved from the redirectToForm function
        let url = await redirectToForm(filter);
        url += "?isWalkin=true";
        console.log(url);  // You can check what URL is returned

        if (url) {
            navigate(url);  // Navigate to the returned URL if it's valid
        }
    };


    const redirectToReport = (filter: ReportFilterParam): string => {

        switch (filter.reportType) {
            case "Maternal Health Records":
                return `/maternal_records/${filter.user_id}`;
            case "Newborn Delivery Record":
                return `/newborn_record/${filter.user_id}`;
            case "Family Planning":
                return `/familyPlanning_record/${filter.user_id}`;
            case "Hypertensive/Diabetic":
                return `/hypertensive_record/${filter.user_id}`;
            case "Vaccination":
                return `/vaccination_record/${filter.user_id}`;
            case "Immunization":
                return `/immunization_record/${filter.user_id}`;
            case "Check-up":
                return `/ekonsulta_records/${filter.user_id}`;
            default:
                return ""; // Return an empty string if no valid reportType
        }
    }

    const redirectToForm = (filter: ReportFilterParam): Promise<string> => {
        return new Promise((resolve, reject) => {
            saveAppointment(filter, (appointmentData) => {
                console.log(filter.reportType);
                let redirectUrl = ''; // Default empty string

                switch (filter.reportType) {
                    case "Maternal Health Records":
                        redirectUrl = `/managematernal/${appointmentData.appointment_id}`;
                        break;
                    case "Newborn Delivery Record":
                        redirectUrl = `/newborndeliveryform/${appointmentData.appointment_id}`;
                        break;
                    case "Family Planning":
                        redirectUrl = `/familyplanning_form/${appointmentData.appointment_id}`;
                        break;
                    case "Hypertensive/Diabetic":
                        redirectUrl = `/hypertensive_form/${appointmentData.appointment_id}`;
                        break;
                    case "Vaccination":
                        redirectUrl = `/vaccination_form/${appointmentData.appointment_id}`;
                        break;
                    case "Immunization":
                        redirectUrl = `/immunization_form/${appointmentData.appointment_id}`;
                        break;
                    case "Check-up":
                        redirectUrl = `/ekonsulta_form/${appointmentData.appointment_id}`;
                        break;
                    default:
                        break; // Leave redirectUrl as empty string
                }

                resolve(redirectUrl); // Resolve with the correct URL
            });
        });
    }

    const saveAppointment = async (filter: ReportFilterParam, callback: (appointmentData: AppointmentModel) => void) => {
        try {
            const response = await axios.post(
                '/api/appointment/createappointment',
                {
                    user_id: filter.user_id,
                    consultationTypeId: filter.consultationTypeId,
                    appointmentTime: currentTimeString,
                    appointmentDate: appointment.appointmentDate,
                    appointmentStatus: appointment.appointmentStatus,
                    appointmentType: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status == 'success') {
                callback(response.data.appointment);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRecords();
    }, []);

    const handleRefresh = () => {
        getRecords();
    }

    const getRecords = async () => {
        setLoading(true);
        const response = await axios.get("/api/record/getUserWithRecord", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status == "success") {
            setUsers(response.data.records);
            setFilteredUsers(response.data.records);
        }
        setLoading(false);
    }

    const setToggle = () => {
        setToggles(!toggle);
    }

    const setToggleReportFilter = () => {

    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        const filteredData = users.filter(user =>
            user.firstname?.toLowerCase().includes(value) ||
            user.lastname?.toLowerCase().includes(value) ||
            user.contact_number?.toLowerCase().includes(value) ||
            user.address?.toLowerCase().includes(value)
        );
        setFilteredUsers(filteredData);
    };

    const columns: TableColumn<UserModel>[] = [
        {
            name: 'Patient Name',
            selector: (row: UserModel) => `${row.firstname || ''} ${getMiddleInitial(row.middlename || '')} ${row.lastname || ''} ${row.extension || ''}`,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: (row: UserModel) => row.gender || '',
            sortable: true,
        },
        {
            name: 'Contact No.',
            selector: (row: UserModel) => row.contact_number || '', // Provide a default value
            sortable: true,
        },
        {
            name: 'Address',
            selector: (row: UserModel) => row.address || '', // Provide a default value
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row: UserModel) => (
                <Link to={`/patientRecords/${row.id}`} className={`btn btn-outline btn-xs flex gap-1 btn-primary px-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                    View
                </Link>
            ),
            sortable: false,
        },

    ];


    return (
        <>
            <div className='m-3'>
                <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                    <div className="card-body p-0">
                        <div className='flex justify-between p-5 pb-0 px-5'>
                            <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
                                    <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                                    <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                                </svg>
                                Manage Records
                            </h1>
                            <div className='flex gap-1'>
                                <button className='btn btn-primary btn-sm' onClick={() => setTogglePatientModal(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Add Patient Records
                                </button>
                                <Link to='/hypertensive_group_report' className='btn btn-primary btn-sm' >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                    </svg>
                                    Generate Hypertensive / Diabetic Records
                                </Link>
                                <button className='btn btn-primary btn-sm' onClick={() => setToggle()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                    </svg>
                                    Report Filter
                                </button>
                                <button className='btn btn-ghost btn-sm' onClick={() => handleRefresh()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <input
                                    type="search"
                                    placeholder="Search"
                                    onChange={handleSearch}
                                    className="input input-bordered input-sm w-full max-w-xs"
                                />
                            </div>
                        </div>
                        <div className='pb-5 px-5'>
                            <DataTable
                                columns={columns}
                                data={filteredUsers}
                                pagination
                                highlightOnHover
                                paginationPerPage={10}
                                noHeader
                                // dense
                                striped
                                paginationRowsPerPageOptions={[10, 20, 30]}
                                persistTableHead={true}
                                progressPending={loading}
                                progressComponent={<span className="loading loading-spinner text-info mt-2"></span>}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ReportFilter Toggle={setToggle} Show={toggle} Filter={Filter} />
            <PatientRecordDialog Toggle={() => setTogglePatientModal(!togglePatientModal)} Show={togglePatientModal} Filter={PatientForm} />
        </>
    );
}


export default ManageRecords;
