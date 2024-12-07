import React, { useEffect, useState, useRef } from 'react';
import logo from '@images/logo-center.png';
import axios from 'axios';
import { Notification } from '@/types/notificationType';
import avatar from '@images/default.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const token: string | null = localStorage.getItem("token");
    const [notification, setNotification] = useState<Notification[]>([]);
    const [toggleNotif, setToggleNotif] = useState<boolean>(false);
    const [readNotifications, setReadNotifications] = useState<string[]>([]); // Add state to track read notifications
    const isAuthenticated: boolean | undefined = useSelector((state: RootState) => state.userState.isSignedIn);
    const notificationRef = useRef<HTMLDivElement | null>(null); // Create a ref for the notification dropdown
    const navigate = useNavigate();

    // Initialize readNotifications state with the value from localStorage
    useEffect(() => {
        const storedNotifications = localStorage.getItem("notif");
        if (storedNotifications) {
            setReadNotifications(JSON.parse(storedNotifications)); // Load from localStorage
        }
    }, []);

    // Count unread notifications
    const unreadCount = notification.filter(
        (notif) => !readNotifications.includes(notif.notification_id.toString())
    ).length;

    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
            setToggleNotif(false); // Close the dropdown if click is outside
        }
    };

    // Add event listener on component mount, and clean it up on unmount
    useEffect(() => {
        // Add click listener only if notificationRef is available
        document.addEventListener('click', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); // Empty dependency array to run only once

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("/api/notification/getNotification", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status === "success") {
                    setNotification(response.data.notification);
                    console.log(response.data.notification);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        if (isAuthenticated) {
            const intervalId = setInterval(fetchNotifications, 5000);
            return () => clearInterval(intervalId);
        }
    }, [token]); // Ensure token is included as dependency

    // Handle notification read and update state
    const handleRead = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, location: string, notif_id: number) => {
        e.preventDefault();

        // Check if the notification has been read already
        if (!readNotifications.includes(notif_id.toString())) {
            // Add it to the read notifications list and update state
            const updatedReadNotifications = [...readNotifications, notif_id.toString()];
            setReadNotifications(updatedReadNotifications); // Update local state

            // Store the updated list of read notifications in localStorage
            localStorage.setItem("notif", JSON.stringify(updatedReadNotifications)); 
        }

        navigate(location); // Navigate to the desired location (appointment or elsewhere)
    };

    return (
        <div className="navbar bg-base-100 top-0 sticky border-b-[1px] z-10 flex justify-between">
            <div className="navbar-start w-[80%] md:w-auto lg:w-auto">
                <img src={logo} className="w-[45px] h-[45px] mr-2" alt="Logo" />
                <a className="md:text-xl lg:text-xl text-[16px] tracking-wider font-semibold">
                    ALIGTOS BARANGAY HEALTH STATION AND BIRTHING CLINIC MANAGEMENT SYSTEM
                </a>
            </div>
            <div className="navbar-end w-[30%]">
                {isAuthenticated && (
                    <div className="position-relative">
                        <button className="btn btn-ghost btn-circle" onClick={(e) => {
                            e.stopPropagation(); // Prevent the event from bubbling up
                            setToggleNotif((prev) => !prev); // Toggle notification dropdown
                        }}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="badge badge-xs badge-primary indicator-item">{unreadCount}</span>
                            </div>
                        </button>
                        <div
                            ref={notificationRef}
                            className={`border absolute p-3 rounded-[9px] ${toggleNotif ? '' : 'hidden'} top-[44px] right-[25px] bg-white`}
                        >
                            <p className="text-start mb-2 font-bold flex items-center">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                Notification
                            </p>
                            <div className="overflow-y-auto h-[400px] w-[300px]">
                                {
                                    notification && notification.length > 0 ? (
                                        notification.map((notif, index) => {
                                            const destination = notif.notif_type === "appointment" ? '/appointments' : '';
                                            const isRead = readNotifications.includes(notif.notification_id.toString());
                                            return (
                                                <Link onClick={(event) => handleRead(event, destination, notif.notification_id)} to={destination} key={index}>
                                                    <div className={`border text-start rounded-[7px] mb-1 hover:bg-[lightgray] cursor-pointer ${isRead ? '' : "bg-[lightgray]"}`}>
                                                        <div className="flex items-start gap-2 p-3">
                                                            <img src={avatar} className="w-[40px] h-[40px] rounded-full border" alt="Avatar" />
                                                            <div>
                                                                <p className="mb-0 font-semibold text-[14px] focus:text-[black]">{notif.senderName}</p>
                                                                <p className="mb-0 text-[#64748b] text-[12px]">{notif.message}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <p className="text-center mt-5 text-[lightgray]">No Notification</p>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
