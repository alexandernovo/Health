import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import Loading from '@/components/Loading';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useDispatch } from 'react-redux';
import { storeUser } from '@store/user/userSlice';
import { UserModel } from "@datatypes/userType";
import Toast from '@/components/Toast';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }: MainLayoutProps) => {
    const [loading, setLoading] = useState(true);
    const token: string | null = localStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated: boolean | undefined = useSelector((state: RootState) => state.userState.isSignedIn);
    const isToast: boolean | undefined = useSelector((state: RootState) => state.globalState.toast);
    const toastMessage: string | undefined = useSelector((state: RootState) => state.globalState.toastMessage);
    const typeMessage: boolean | undefined = useSelector((state: RootState) => state.globalState.toastSuccess);

    useEffect(() => {
        handleAuthentication();
    }, []);

    const LoadingFunc = (result: boolean) => {
        if (result) {
            setTimeout(() => {
                setLoading(false);
                if (location.pathname === "/register" || location.pathname === "/") {
                    navigate('/home');
                }
            }, 2000);
        }
        else {
            setTimeout(() => {
                setLoading(false);
                navigate(location.pathname === '/register' ? '/register' : '/');
            }, 2000);
        }
    }

    const handleAuthentication = async () => {
        try {
            if (token) {
                const response = await axios.post('/api/users/refresh', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.status === 'success') {

                    const data = response.data;
                    localStorage.setItem('token', data.authorization.token);

                    const userToStore: UserModel = {
                        id: data.user.id,
                        token: data.authorization.token,
                        firstname: data.user.firstname,
                        lastname: data.user.lastname,
                        username: data.user.username,
                        usertype: data.user.usertype,
                        isSignedIn: true
                    }

                    dispatch(storeUser(userToStore));
                    LoadingFunc(true);
                } else {

                }
            } else {
                LoadingFunc(false);
            }
        } catch (error) {
            LoadingFunc(false);
        }
    };

    return (
        <div className='flex flex-col'>
            <Navbar />

            {loading && (
                <Loading />
            )}

            {!loading && (
                <div className='flex-1 flex h-full'>
                    {isAuthenticated && (
                        <Sidebar />
                    )}
                    <div className={isAuthenticated ? 'ml-[240px] w-full bg-gray-100 min-h-[80vh]' : 'flex w-full'}>
                        {children}
                    </div>
                </div>
            )}

            {isToast && (
                <Toast Message={toastMessage} Type={typeMessage} />
            )}
        </div >
    );
};

export default MainLayout;
