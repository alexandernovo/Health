import React, { useEffect, useState } from 'react'
import logo from '@images/logo-center.png'
import axios from 'axios';
import { Notification } from '@/types/notificationType';
import avatar from '@images/default.jpg'

const Navbar: React.FC = () => {
    const token: string | null = localStorage.getItem("token");
    const [notification, setNotification] = useState<Notification[]>([]);
    const [toggleNotif, setToggleNotif] = useState<boolean>(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("/api/notification/getNotification", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status == "success") {
                    setNotification(response.data.notification);
                    console.log(response.data.notification);
                }
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        // Set interval to fetch appointments every 500ms
        const intervalId = setInterval(fetchAppointments, 5000);

        // Clean up the interval when the component unmounts or on dependency change
        return () => clearInterval(intervalId);
    }, [token]); // Make sure to include token as a dependency

    return (
        <div className="navbar bg-base-100 top-0 sticky border-b-[1px] z-10">
            <div className="navbar-start w-[80%] md:w-auto lg:w-auto">
                {/* <div className="dropdown"> */}
                {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div> */}
                <img src={logo} className='w-[45px] h-[45px] mr-2' />
                <a className="md:text-xl lg:text-xl text-[16px] tracking-wider font-semibold">ALIGTOS BARANGAY HEALTH STATION AND BIRTHING CLINIC MANAGEMENT SYSTEM</a>
                {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul> */}
                {/* </div> */}
            </div>
            {/* <div className="navbar-center">
            </div> */}
            <div className="navbar-end">
                {/* <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button> */}
                <div className='position-relative'>
                    <button className="btn btn-ghost btn-circle" onClick={() => setToggleNotif(!toggleNotif)}>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item">{notification.length}</span>
                        </div>
                    </button>
                    <div className={`border absolute p-3 rounded-[9px] ${toggleNotif ? '' : 'invisible'} top-[44px] right-[25px] bg-white`}>
                        <p className='text-start mb-2 font-bold flex items-center'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            </div>
                            Notification
                        </p>
                        <div className='overflow-y-auto h-[400px] w-[300px]'>
                            {notification && notification.length > 0 ? (
                                <div className="border text-start rounded-[7px] mb-1">
                                    <div className="flex items-center gap-2 p-3 ">
                                        <img src={avatar} className='w-[40px] h-[40px] rounded-full border' alt="" />
                                        <div>
                                            <p className='mb-0 font-semibold'>Alexander Novo</p>
                                            <p className='mb-0 text-[#64748b] text-[12px]'>Notification bla bla bla bla</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center mt-5 text-[lightgray]">No Notification</p>
                            )}

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Navbar
