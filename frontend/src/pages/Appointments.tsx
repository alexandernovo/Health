import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppointmentModel } from '@datatypes/appointmentType';
import { DateToString } from '@/utils/DateFunction';
import { TimeToString12Hour } from '@/utils/DateFunction';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToastState } from '@/store/common/global';
import DataTable, { TableColumn } from 'react-data-table-component';
import { RootState } from '@store/store';
import { UserModel } from '@/types/userType';
import DeclineDialog from '@/dialogs/userdialogs/DeclineDialog';
import RemarksDialog from '@/dialogs/userdialogs/RemarksDialog';
import ConfirmationDialog from '@/dialogs/confirmationdialog/ConfirmationDialog';


const Appointments: React.FC = () => {
    const token: string | null = localStorage.getItem("token");
    const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
    const [filteredAppointments, setFilteredAppointments] = useState<AppointmentModel[]>([]);
    const user: UserModel = useSelector((state: RootState) => state.userState);
    const [loading, setLoading] = useState<boolean>(true);
    const [declineDialog, setDeclineDialog] = useState<boolean>(false);
    const [remarksDialog, setRemarksDialog] = useState<boolean>(false);
    const [declineId, setDeclineId] = useState<number>(0);
    const [approveId, setApproveId] = useState<number>(0);
    const [declineLoad, setDeclineLoad] = useState<boolean>(false);
    const [remark, setRemarks] = useState<string>("");
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchActiveAppointments();
    }, []);

    const handleRefresh = () => {
        fetchActiveAppointments();
    }

    const handleDeclineDialog = (id?: number) => {
        setDeclineDialog(true);
        id && setDeclineId(id);
    }

    const handleApproveDialog = (id?: number)=>{
        setShowConfirm(true);
        id && setApproveId(id)
    }

    const handleDecline = async (remarks: string) => {
        setDeclineLoad(true)

        let data = {
            id: declineId,
            remarks: remarks
        };
        const response = await axios.post("/api/appointment/declineAppointment", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.status == "success") {
            dispatch(setToastState({ toast: true, toastMessage: "Appointment Decline Successfully", toastSuccess: true }));
            updateStatus(response.data.appointment);
            setDeclineLoad(false)
            setDeclineDialog(false);
        }
    }



    const fetchActiveAppointments = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/appointment/getAppointments/1", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status == "success") {
                setAppointments(response.data.appointment);
                const appointmentFilteredByUser: AppointmentModel[] = (user.usertype == 0 || user.usertype == 2)
                    ? response.data.appointment
                    : response.data.appointment.filter((appointment: AppointmentModel) => appointment.user_id == user.id);
                setFilteredAppointments(appointmentFilteredByUser);
                console.log(user.usertype, appointmentFilteredByUser);
                console.log(user.usertype, response.data.appointment);

                setLoading(false);
            } else {
                console.log("Fetch Failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        const filteredData = appointments.filter(appointment =>
            appointment.firstname?.toLowerCase().includes(value) ||
            appointment.lastname?.toLowerCase().includes(value) ||
            appointment.contact_number?.toLowerCase().includes(value) ||
            appointment.address?.toLowerCase().includes(value)
        );
        setFilteredAppointments(filteredData);
    };

    const changeStatusAppointment = async (id?: number, status?: number) => {
        try {
            const response = await axios.post(`/api/appointment/changeAppointmentStatus/${id}/${status}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status == "success") {
                updateStatus(response.data.appointment);
                const message: string = status == 3 ? "Approved Successfully" : "Cancelled Successfully";
                dispatch(setToastState({ toast: true, toastMessage: message, toastSuccess: true }));
            }
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    const updateStatus = (updatedAppointment: AppointmentModel) => {
        setFilteredAppointments(prevAppointments => {
            return prevAppointments.map(appointment => {
                if (appointment.appointment_id == updatedAppointment.appointment_id) {
                    return { ...appointment, appointmentStatus: updatedAppointment.appointmentStatus };
                }
                return appointment;
            });
        });
    };

    const columns: TableColumn<AppointmentModel>[] = [
        {
            name: 'Patient Name',
            selector: (row: AppointmentModel) => `${row.firstname} ${row.lastname} ${row.extension || ''}`,
            sortable: true,
            width: '17%'
        },
        {
            name: 'Appointment Date',
            selector: (row: AppointmentModel) => `${DateToString(row.appointmentDate)} ${TimeToString12Hour(row.appointmentTime)}`,
            sortable: true,
            width: '18%'
        },
        {
            name: 'Contact No.',
            selector: (row: AppointmentModel) => row.contact_number || '',
            sortable: true,
            width: '12%'
        },
        {
            name: 'Consultation Type',
            selector: (row: AppointmentModel) => row.consultationTypeName || '',
            sortable: true,
            width: '19%'
        },
        {
            name: 'Status',
            selector: (row: AppointmentModel) => (row.appointmentStatus == 1 ? 'Pending' : row.appointmentStatus == 2 ? 'Declined' : row.appointmentStatus == 3 ? 'Approved' : row.appointmentStatus == 4 ? 'Done' : 'Cancelled'),
            sortable: true,
            width: '10%'
        },
        {
            name: (
                <Link to="/createappointments" className='btn btn-success btn-outline btn-xs px-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Create Appointment
                </Link>
            ),
            cell: (row: AppointmentModel) => (
                row.appointmentStatus == 1 ? (
                    <div className='flex items-center gap-1'>
                        {(user.usertype == 0 || user.usertype == 2) && (
                            <button className=' btn btn-success btn-xs text-white btn-outline active:text-white hover:text-white text-[13px] px-2' onClick={() => handleApproveDialog(row.appointment_id)}>
                                Approve
                            </button>
                        )}
                        <Link to={`/updateappointments/${row.appointment_id}`} className=' btn btn-primary btn-xs px-3 text-white btn-outline active:text-white hover:text-white  text-[13px]' >
                            Edit
                        </Link>
                        {(user.usertype == 0 || user.usertype == 2) && (
                            // 2
                            <button className=' btn btn-error btn-xs px-3 text-white btn-outline active:text-white hover:text-white  text-[13px]' onClick={() => handleDeclineDialog(row.appointment_id)}>
                                Decline
                            </button>
                        )}
                    </div>
                ) : row.appointmentStatus == 2 ? (
                    <>
                        <button onClick={() => { setRemarksDialog(true), setRemarks(row.remarks ?? "") }} className=' btn btn-error btn-xs px-3 text-white btn-outline active:text-white hover:text-white  text-[13px]'>
                            View Remarks
                        </button>
                    </>
                ) :
                    (
                        <>
                            {
                                row.appointmentStatus != 2 && !(user.usertype == 1 && row.appointmentStatus == 3) && (
                                    <Link to={ToRedirect(row.consultationTypeName, row.appointment_id, row.appointmentStatus)} className=' btn btn-primary btn-xs px-3 text-white btn-outline active:text-white hover:text-white  text-[13px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        View
                                    </Link>
                                )
                            }
                        </>
                    )
            ),
            sortable: false,
        }
    ];

    const ToRedirect = (type?: string, appointment_id?: number, appointmentStatus?: number) => {
        if (appointmentStatus != 4) {
            if (type == "Maternal Health Records") {
                return `/managematernal/${appointment_id}`;
            }
            else if (type == "Newborn Delivery Record") {
                return `/newborndeliveryform/${appointment_id}`;
            }
            else if (type == "Family Planning") {
                return `/familyplanning_form/${appointment_id}`
            }
            else if (type == "Hypertensive/Diabetic") {
                return `/hypertensive_form/${appointment_id}`
            }
            else if (type == "Vaccination") {
                return `/vaccination_form/${appointment_id}`
            }
            else if (type == "Immunization") {
                return `/immunization_form/${appointment_id}`
            }
            else if (type == "Check-up") {
                return `/ekonsulta_form/${appointment_id}`
            }
            else {
                return "";
            }
        }
        else {
            if (type == "Maternal Health Records") {
                return `/maternal_report/${appointment_id}`;
            }
            else if (type == "Newborn Delivery Record") {
                return `/newborn_report/${appointment_id}`;
            }
            else if (type == "Family Planning") {
                return `/familyplanning_report/${appointment_id}`
            }
            else if (type == "Hypertensive/Diabetic") {
                return `/hypertensive_report/${appointment_id}`
            }
            else if (type == "Vaccination") {
                return `/vaccination_report/${appointment_id}`
            }
            else if (type == "Immunization") {
                return `/immunization_report/${appointment_id}`
            }
            else if (type == "Check-up") {
                return `/ekonsulta_report/${appointment_id}`
            }
            else {
                return "";
            }
        }
    }

    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0 h-[85vh] p-5">
                    <div className='flex justify-between'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                            Manage Appointments
                        </h1>
                        <div className='flex gap-1'>
                            <button className='btn btn-ghost btn-sm' onClick={() => handleRefresh()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <input
                                type="search"
                                className="input input-bordered input-sm w-full max-w-xs"
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredAppointments}
                        pagination
                        highlightOnHover
                        paginationPerPage={10}
                        noHeader
                        persistTableHead={true}
                        // dense
                        striped
                        paginationRowsPerPageOptions={[10, 20, 30]}
                        progressPending={loading}
                        progressComponent={<span className="loading loading-spinner text-info mt-2"></span>}
                    />
                </div>
            </div>

            <DeclineDialog isOpen={declineDialog} onDecline={handleDecline} isLoad={declineLoad} setDeclineDialog={() => setDeclineDialog(!declineDialog)} />
            <RemarksDialog isOpen={remarksDialog} setRemarkDialog={() => setRemarksDialog(!remarksDialog)} remarks={remark} />
            <ConfirmationDialog Toggle={() => setShowConfirm(!showConfirm)} Show={showConfirm} ConfirmButton="Approve it!" ButtonColor="blue" Message="Approve this appointment?" OnConfirm={() => changeStatusAppointment(approveId, 3)} />
        </div >
    )
}

export default Appointments;
