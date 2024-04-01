import React, { useState, useEffect } from 'react'
import { UserModel } from '@/types/userType';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';

interface UpdateUserDialogProps {
    Toggle: () => void;
    Show: boolean;
    OnUpdate: (data: UserModel) => void;
    Data: UserModel;
}
const UpdateUserDialog: React.FC<UpdateUserDialogProps> = (props: UpdateUserDialogProps) => {
    const dispatch = useDispatch();
    const token: string | null = localStorage.getItem("token");

    const initialData = {
        firstname: "",
        lastname: "",
        username: "",
        contact_number: "",
        address: "",
        gender: "",
        password: "",
        confirmPassword: ""
    }

    const [formData, setFormData] = useState<UserModel>(initialData);
    const [error, setError] = useState<UserModel>(initialData);

    useEffect(() => {
        setFormData({
            firstname: props.Data.firstname,
            lastname: props.Data.lastname,
            username: props.Data.username,
            contact_number: props.Data.contact_number,
            address: props.Data.address,
            gender: props.Data.gender,
            usertype: props.Data.usertype,
            password: '',
            confirmPassword: ''
        });
        setError(initialData);
    }, [props.Data.id]);

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

        if (formData.password != '' || formData.confirmPassword != '') {
            if (formData.password !== formData.confirmPassword) {
                setError(prevState => ({
                    ...prevState,
                    password: "Passwords do not match"
                }));
                return;
            }
        }

        try {
            const response = await axios.put(`/api/users/updateUser/${props.Data.id}`, formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            if (response.data.status == 'success') {
                const data = response.data;
                props.OnUpdate(data.user); // append data in manage user
                dispatch(setToastState({ toast: true, toastMessage: "User Updated Successfully", toastSuccess: true }));
                props.Toggle();
            }
            else {
                setError(response.data.errors);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    return (
        <dialog className={`modal ${props.Show && 'modal-open'}`} >
            <div className="modal-box max-w-none w-[700px] max-h-none h-[97vh] rounded-md p-0 overflow-hidden">
                <div className='bg-[#219EBC] p-4 px-5 sticky top-0 z-10 text-white flex justify-between'>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        Update User
                    </h3>
                    <button className="btn btn-ghost btn-sm rounded-full p-1" onClick={() => props.Toggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className='modal-body px-5 pt-4 max-h-[96vh] pb-[90px] overflow-scroll'>
                    <div className='w-full mx-auto h-full pb-[60px]'>
                        <div className='w-full flex flex-col items-center'>
                            <div className='md:w-full lg:w-full'>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                                className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="grow" placeholder='Password' />
                                        </label>
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <select value={formData.usertype} className="outline-0 grow w-full h-full" name="usertype" onChange={handleChange}>
                                                <option value="" disabled>Role</option>
                                                <option value="1">Patient</option>
                                                <option value="0">Admin</option>
                                            </select>
                                        </label>
                                        {error.password && <p className="text-red-500 text-[13px]">{error.password}</p>}
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="grow" placeholder='Confirm Password' />
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-active btn-primary w-full mt-3 bg-[#219EBC] border-0">UPDATE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default UpdateUserDialog
