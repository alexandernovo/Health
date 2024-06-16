import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import doctor from '@images/backround-avatar.png'
import { useDispatch } from 'react-redux';
import { storeUser } from '@store/user/userSlice';
import { UserModel } from "@datatypes/userType";
import Loading from '@/components/Loading';
import axios from 'axios';

const Login: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputType, setInputType] = useState('password');

    const toggleInputType = () => {
        setInputType(prevType => (prevType === 'password' ? 'text' : 'password'));
    };
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { username, password });
            if (response.data && response.data.status === 'success') {
                setLoading(true);
                const data = response.data;
                localStorage.setItem("token", data.authorization.token);

                setTimeout(() => {
                    setLoading(false);
                    const userToStore: UserModel = {
                        id: data.user.id,
                        token: data.authorization.token,
                        firstname: data.user.firstname,
                        lastname: data.user.lastname,
                        username: data.user.username,
                        address: data.user.address,
                        contact_number: data.user.contact_number,
                        usertype: data.user.usertype,
                        birthdate: data.user.birthdate,
                        brgy: data.user.brgy,
                        civil_status: data.user.civil_status,
                        gender: data.user.gender,
                        occupation: data.user.occupation,
                        education: data.user.education,
                        religion: data.user.religion,
                        isSignedIn: true
                    }
                    dispatch(storeUser(userToStore));
                    navigate('/dashboard');
                }, 2000);
            }
            else {
                setError(response.data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!loading && (
                <div className='flex flex-1 flex-wrap pb-[60px] md:pb-[0px] lg:pb-[0px] lg:flex-nowrap md:flex-nowrap bg-[#219EBC] h-screen'>
                    <div className='md:w-1/2 lg-1/2 w-full px-[40px] md:h-full lg:h-full mt-3 lg:mt-0 md:mt-0 flex items-center justiy-center'>
                        <div>
                            <h2 className='text-[15px] md:text-[45px] lg:text-[45px] text-center font-bold text-white tracking-wider'>ALIGTOS BARANGAY HEALTH STATION AND BIRTHING CLINIC MANAGEMENT SYSTEM</h2>
                        </div>
                    </div>
                    <div className='md:w-1/2 lg-1/2 w-full px-5 h-full'>
                        <form onSubmit={handleSubmit}>
                            <div className='w-full flex flex-col items-center mt-5'>
                                <div className='md:w-1/2 lg:w-1/2'>
                                    <img src={doctor} className='md:w-[200px] md:h-[220px] lg:w-[200px] lg:h-[220px] mx-auto bg-blend-normal' />
                                    <p className='font-semibold text-[20px] mb-2 text-white tracking-wide'>LOGIN HERE</p>
                                    <label className="input input-bordered flex items-center w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                        <input type="text" className="grow" placeholder="Username" onChange={handleUsernameChange} />
                                    </label>
                                    {error && error != '' && (
                                        <p className='text-[14px] text-red-500'>{error}</p>
                                    )}
                                    <label className="input input-bordered flex items-center w-full mt-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        <input type={inputType} className="grow" placeholder='Password' onChange={handlePasswordChange} />
                                        <svg onClick={toggleInputType} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 cursor-pointer">
                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                        </svg>
                                    </label>
                                    <button className="btn btn-active btn-primary w-full mt-3">LOGIN</button>
                                    <p className='text-[14px] text-center mt-1 text-white'>Don't have account? <Link to="register" className='text-white hover:text-blue-800'>Register Here</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {loading && (
                <Loading />
            )}
        </>
    )
}

export default Login
