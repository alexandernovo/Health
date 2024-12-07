import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RootState } from '@store/store';
import { useSelector, useDispatch } from 'react-redux';
import { UserModel, userInitialValue } from '@/types/userType';
import { setToastState } from '@/store/common/global';
import { storeUser } from '@/store/user/userSlice';

const Account: React.FC = () => {
    const token: string | null = localStorage.getItem("token");
    const user: UserModel = useSelector((state: RootState) => state.userState);
    const [userModel, setUserModel] = useState<UserModel>(userInitialValue);
    const [error, setError] = useState<UserModel>(userInitialValue);
    const dispatch = useDispatch();
    const [inputType, setInputType] = useState('password');
    const [inputType2, setInputType2] = useState('password');

    const toggleInputType = () => {
        setInputType(prevType => (prevType === 'password' ? 'text' : 'password'));
    };
    const toggleInputType2 = () => {
        setInputType2(prevType => (prevType === 'password' ? 'text' : 'password'));
    };
    useEffect(() => {
        setUserModel(user);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserModel(prevState => ({
            ...prevState,
            [name as keyof UserModel]: value // Type assertion
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userModel.password != '' || userModel.confirmPassword != '') {
            if (userModel.password !== userModel.confirmPassword) {
                setError(prevState => ({
                    ...prevState,
                    password: "Passwords do not match"
                }));
                return;
            }
        }

        try {
            const response = await axios.put(`/api/users/updateUser/${userModel.id}`, userModel,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status == 'success') {
                dispatch(storeUser(userModel));
                dispatch(setToastState({ toast: true, toastMessage: "User Updated Successfully", toastSuccess: true }));
            }
            else {
                setError(response.data.errors);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
        <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3 m-3">
            <div className="card-body p-0 pb-[50px]">
                <form onSubmit={handleSubmit} className='w-full'>

                    <div className='flex justify-center p-4 px-5 pt-5'>
                        <h1 className='flex text-[25px] items-center gap-1 font-semibold text-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                            Account Settings
                        </h1>
                    </div>
                    <div className='mt-4 w-[40%] mx-auto'>
                        <div className='flex gap-2 w-full flex-wrap md:flex-nowrap lg:flex-nowrap justify-between'>
                            <div className='md:w-[49%] lg:w-[49%] w-full'>
                                <label className="input input-bordered flex items-center mb-1 md:mb-0 lg:mb-0 h-[45px] relative pl-[37px]" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                    <input type="text" name="firstname" value={userModel.firstname} onChange={handleChange} className="grow" placeholder="Firstname" />
                                </label>
                                {error.firstname && <p className="text-red-500 text-[13px]">{error.firstname}</p>}
                            </div>
                            <div className='md:w-[49%] lg:w-[49%] w-full'>
                                <label className="h-[45px] input input-bordered flex items-center relative pl-[37px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                    <input type="text" name="lastname" value={userModel.lastname} onChange={handleChange} className="grow" placeholder="Lastname" />
                                </label>
                                {error.lastname && <p className="text-red-500 text-[13px]">{error.lastname}</p>}
                            </div>
                        </div>

                        <div className='w-full'>
                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input type="text" name="username" value={userModel.username} onChange={handleChange} className="grow" placeholder='Username' />
                            </label>
                            {error.username && <p className="text-red-500 text-[13px]">{error.username}</p>}
                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                </svg>
                                <input type="text" name="contact_number" value={userModel.contact_number} onChange={handleChange} className="grow" placeholder='Contact number' />
                            </label>
                            {error.contact_number && <p className="text-red-500 text-[13px]">{error.contact_number}</p>}
                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <select value={userModel.gender} className="outline-0 grow w-full h-full" name="gender" onChange={handleChange}>
                                    <option value="" disabled>Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </label>
                            {error.gender && <p className="text-red-500 text-[13px]">{error.gender}</p>}

                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <select value={userModel.civil_status} className="outline-0 grow w-full h-full" name="civil_status" onChange={handleChange}>
                                    <option value="" disabled>Civil Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Separated">Separated</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            {error.civil_status && <p className="text-red-500 text-[13px]">{error.civil_status}</p>}

                            {/* <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                </svg>
                                <input type="text" name="address" value={userModel.address} onChange={handleChange} className="grow" placeholder='Address' />
                            </label> */}
                            <label className='text-[13px] font-semibold mb-0 mt-3'>Baranggay</label>
                            <select name="brgy" value={userModel.brgy} onChange={handleChange} className="select select-bordered select-md w-full ">
                                <option value="Capoyuan" selected={userModel.brgy === "Capoyuan"}>Capoyuan</option>
                                <option value="Palma" selected={userModel.brgy === "Palma"}>Palma</option>
                                <option value="Igpalge" selected={userModel.brgy === "Igpalge"}>Igpalge</option>
                            </select>
                            {error.brgy && error.brgy != "Igpalge" && <p className="text-red-500 text-[13px]">{error.brgy}</p>}

                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                </svg>
                                <input type="text" name="education" value={userModel.education} onChange={handleChange} className="grow" placeholder='Education' />
                            </label>

                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                </svg>
                                <input type="date" name="birthdate" value={userModel.birthdate} onChange={handleChange} className="grow" placeholder='Birthdate' />
                            </label>

                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                </svg>
                                <input type="text" name="occupation" value={userModel.occupation} onChange={handleChange} className="grow" placeholder='Occupation' />
                            </label>
                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                </svg>
                                <input type="text" name="religion" value={userModel.religion} onChange={handleChange} className="grow" placeholder='Religion' />
                            </label>
                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                    className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type={inputType} name="password" onChange={handleChange} className="grow" placeholder='Password' />
                                <svg onClick={toggleInputType} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 cursor-pointer">
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                </svg>
                            </label>
                            {error.password && <p className="text-red-500 text-[13px]">{error.password}</p>}
                            <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type={inputType2} name="confirmPassword" onChange={handleChange} className="grow" placeholder='Confirm Password' />
                                <svg onClick={toggleInputType2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 cursor-pointer">
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <button type="submit" className="btn btn-active btn-primary w-full mt-3 bg-[#219EBC] border-0">UPDATE</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Account
