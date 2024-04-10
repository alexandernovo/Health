import React, { useState } from 'react';
import doctor from '@images/backround-avatar.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeUser } from '@store/user/userSlice';
import axios from 'axios';
import Loading from '@/components/Loading';
import { UserModel } from '@/types/userType';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<UserModel>({
        firstname: '',
        lastname: '',
        username: '',
        contact_number: '',
        address: '',
        birthdate: '',
        occupation: '',
        education: '',
        religion: '',
        gender: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<UserModel>({
        firstname: '',
        lastname: '',
        username: '',
        contact_number: '',
        address: '',
        birthdate: '',
        occupation: '',
        education: '',
        religion: '',
        gender: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name as keyof UserModel]: value // Type assertion
        }));
        if (formData[name as keyof UserModel] !== '') { // Type assertion
            setError(prevState => ({
                ...prevState,
                [name as keyof UserModel]: ""
            }));
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError(prevState => ({
                ...prevState,
                password: "Passwords do not match"
            }));

            return;
        }

        try {
            const response = await axios.post('/api/users/register', formData);
            console.log(response.data);
            if (response.data.status == 'success') {
                setLoading(true);
                const data = response.data;
                localStorage.setItem("token", data.authorization.token);

                setTimeout(() => { // put the storing here to not update isSignedIn first because the sidebar will showup if called first
                    setLoading(false);
                    const userToStore: UserModel = {
                        _id: data.user.id,
                        token: data.authorization.token,
                        firstname: data.user.firstname,
                        lastname: data.user.lastname,
                        username: data.user.username,
                        contact_number: data.user.contact_number,
                        address: data.user.address,
                        birthdate: data.user.birthdate,
                        occupation: data.user.occupation,
                        education: data.user.education,
                        religion: data.user.religion,
                        gender: data.user.gender,
                        usertype: data.user.usertype,
                        isSignedIn: true
                    }
                    dispatch(storeUser(userToStore));
                    navigate('/home');
                }, 2000);

            }
            else {
                setError(response.data.errors);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
        <>
            {!loading && (
                <div className='flex w-1/2 flex-1 pt-4 flex-wrap pb-[60px] md:pb-[0px] lg:pb-[0px] lg:flex-nowrap md:flex-nowrap bg-[#219EBC]'>
                    {/* <div className='md:w-1/2 lg-1/2 w-full px-[40px] md:h-full lg:h-full mt-3 lg:mt-0 md:mt-0 flex items-center justify-center'>
                        <div>
                            <h2 className='text-[15px] md:text-[45px] lg:text-[45px] text-center font-bold text-white tracking-wider'>ALIGTOS BARANGAY HEALTH STATION AND BIRTHING CLINIC MANAGEMENT SYSTEM</h2>
                        </div>
                    </div> */}
                    {/* <div className='md:w-1/2 lg-1/2 w-full px-5 h-full pb-[60px]'> */}
                    <div className='w-[600px] mx-auto px-5 h-full pb-[60px]'>
                        <div className='w-full flex flex-col items-center'>
                            <div className='md:w-full lg:w-full px-[35px]'>
                                <img src={doctor} className='md:w-[200px] md:h-[220px] lg:w-[200px] lg:h-[220px] mx-auto bg-blend-normal' />
                                <p className='font-semibold text-[20px] mb-2 text-white tracking-wide'>REGISTER HERE</p>
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <div className='flex gap-2 w-full flex-wrap md:flex-nowrap lg:flex-nowrap justify-between'>
                                        <div className='md:w-[49%] lg:w-[49%] w-full'>
                                            <label className="input input-bordered flex items-center mb-1 md:mb-0 lg:mb-0 h-[45px] relative pl-[37px]" >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="grow" placeholder="Firstname" />
                                            </label>
                                            {error.firstname && <p className="text-red-500 text-[13px]">{error.firstname}</p>}
                                        </div>
                                        <div className='md:w-[49%] lg:w-[49%] w-full'>
                                            <label className="h-[45px] input input-bordered flex items-center relative pl-[37px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="grow" placeholder="Lastname" />
                                            </label>
                                            {error.lastname && <p className="text-red-500 text-[13px]">{error.lastname}</p>}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <input type="text" name="username" value={formData.username} onChange={handleChange} className="grow" placeholder='Username' />
                                        </label>
                                        {error.username && <p className="text-red-500 text-[13px]">{error.username}</p>}
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="number" name="contact_number" value={formData.contact_number} onChange={handleChange} className="grow" placeholder='Contact number' />
                                        </label>
                                        {error.contact_number && <p className="text-red-500 text-[13px]">{error.contact_number}</p>}
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <select value={formData.gender} className="outline-0 grow w-full h-full" name="gender" onChange={handleChange}>
                                                <option value="" disabled>Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </label>

                                        {error.gender && <p className="text-red-500 text-[13px]">{error.gender}</p>}
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="grow" placeholder='Address' />
                                        </label>
                                        {error.address && <p className="text-red-500 text-[13px]">{error.address}</p>}

                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" name="education" value={formData.education} onChange={handleChange} className="grow" placeholder='Education' />
                                        </label>

                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="grow" placeholder='Birthdate' />
                                        </label>

                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="grow" placeholder='Occupation' />
                                        </label>
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="grow" placeholder='Religion' />
                                        </label>
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                                className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="grow" placeholder='Password' />
                                        </label>
                                        {error.password && <p className="text-red-500 text-[13px]">{error.password}</p>}
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="grow" placeholder='Confirm Password' />
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-active btn-primary w-full mt-3">REGISTER</button>
                                </form>
                                <p className='text-[14px] text-center mt-1 text-white'>Already have an account? <Link to="/" className='text-white hover:text-blue-800'>Login Here</Link></p>
                            </div>
                        </div>
                    </div>
                </div >
            )}

            {loading && (
                <Loading />
            )}
        </>
    );
};

export default Register;
