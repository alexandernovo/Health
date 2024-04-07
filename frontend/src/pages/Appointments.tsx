import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppointmentModel } from '@datatypes/appointmentType'
import { DateToString } from '@/utils/DateFunction'
import { TimeToString12Hour } from '@/utils/DateFunction'
import axios from 'axios'

const Appointments: React.FC = () => {
    const token: string | null = localStorage.getItem("token");
    const [appointments, setAppointments] = useState<AppointmentModel[]>([]);

    useEffect(() => {
        FetchActiveAppointments();
    }, []);

    const FetchActiveAppointments = async () => {
        try {
            const response = await axios.get("/api/appointment/getAppointments/1",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            if (response.data.status == "success") {
                setAppointments(response.data.appointment); // Set users with fetched data
            }
            else {
                console.log("Fetch Failed");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const ToRedirect = (type?: string, param?: number) => {
        if (type == "Maternal Health Records") {
            return `/managematernal/${param}`;
        }
        else {
            return "";
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
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='w-[20%]'>Name</th>
                                <th>Date and Time of Appointment</th>
                                <th>Contact No.</th>
                                <th>Consultation Type</th>
                                <th>Status</th>
                                <th colSpan={2}>
                                    <Link to="/createappointments" className='btn btn-success btn-outline btn-xs flex gap-1 px-4 w-[150px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                        </svg>
                                        Appointment
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => (
                                <tr key={appointment.appointmentId}>
                                    <td>{appointment.firstname} {appointment.lastname}</td>
                                    <td>{DateToString(appointment.appointmentDate)} {TimeToString12Hour(appointment.appointmentTime)}</td>
                                    <td>{appointment.contact_number}</td>
                                    <td>{appointment.consultationTypeName}</td>
                                    <td>{appointment.appointmentStatus == 1 ? 'Pending' : appointment.appointmentStatus == 2 ? 'Declined' : appointment.appointmentStatus == 3 ? 'Approved' : 'Cancelled'}</td>
                                    <td className='flex items-center justify-center'>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn m-1 btn-ghost p-1 rounded-full px-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                </svg>
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow  border bg-base-100 rounded-box w-52">

                                                {appointment.appointmentStatus == 1 && (
                                                    <li>
                                                        <Link to="">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>
                                                            Approved
                                                        </Link>
                                                    </li>
                                                )}

                                                {appointment.appointmentStatus == 3 && (
                                                    <>
                                                        <li>
                                                            <Link to={ToRedirect(appointment.consultationTypeName, appointment.appointmentId)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                </svg>
                                                                View
                                                            </Link>
                                                        </li>
                                                    </>

                                                )}
                                                {appointment.appointmentStatus == 1 && (
                                                    <li>
                                                        <Link to="">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                            Edit
                                                        </Link>
                                                    </li>
                                                )}
                                                {appointment.appointmentStatus == 1 && (
                                                    <li>
                                                        <Link to="">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>
                                                            Cancel
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Appointments
