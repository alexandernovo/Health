import React, { useState, useEffect } from 'react';
import doctor from '@images/backround-avatar.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeUser } from '@store/user/userSlice';
import axios from 'axios';
import Loading from '@/components/Loading';
import { UserModel } from '@/types/userType';
import Select from 'react-select';
import { regions, getProvincesByRegion, getCityMunByProvince, getBarangayByMun } from 'phil-reg-prov-mun-brgy'

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [provincesFiltered, setProvincesFiltered] = useState([]);
    const [municipalityFiltered, setMunicipalityFiltered] = useState([]);
    const [brgyFiltered, setBrgyFiltered] = useState([]);
    const [inputType, setInputType] = useState('password');
    const [inputType2, setInputType2] = useState('password');

    const toggleInputType = () => {
        setInputType(prevType => (prevType == 'password' ? 'text' : 'password'));
    };
    const toggleInputType2 = () => {
        setInputType2(prevType => (prevType == 'password' ? 'text' : 'password'));
    };

    const [formData, setFormData] = useState<UserModel>({
        firstname: '',
        middlename: '',
        lastname: '',
        extension: '',
        username: '',
        contact_number: '+63',
        address: '',
        birthdate: '',
        occupation: '',
        reg_code: '06',
        region: regions
            .filter((region: any) => region.reg_code == '06')
            .map((region: any) => region.name)[0],
        prov_code: '0606',
        mun_code: '060602',
        civil_status: '',
        education: '',
        religion: 'Roman Catholic',
        brgy: "Igpalge",
        gender: 'Male',
        password: '',
        confirmPassword: ''
    });
    const educationalAttainment = [
        "Select Educational Attainment",
        "Elementary",
        "High School Undergraduate",
        "High School Graduate",
        "College Undergraduate",
        "College Graduate",
        "Postgraduate",
        "Doctorate",
        "Vocational",
        "Others"
    ];

    const religions = [
        "Roman Catholic",
        "Islam",
        "Iglesia ni Cristo",
        "Evangelical Christianity",
        "Other Christian Denominations",
        "Philippine Independent Church",
        "Seventh-Day Adventist",
        "Jehovah's Witnesses",
        "Buddhism",
        "Hinduism",
        "Judaism",
        "Non-religious",
        "Indigenous Beliefs",
        "Others"
    ];

    const [error, setError] = useState<UserModel>({
        firstname: '',
        lastname: '',
        username: '',
        contact_number: '',
        address: '',
        birthdate: '',
        region: '',
        province: '',
        municipality: '',
        brgy: '',
        occupation: '',
        education: '',
        religion: '',
        gender: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const filteredProvinces = getProvincesByRegion(formData.reg_code);
        const filteredMunicipalities = getCityMunByProvince(formData.prov_code);
        const filteredBrgy = getBarangayByMun(formData.mun_code);

        setProvincesFiltered(filteredProvinces);
        setMunicipalityFiltered(filteredMunicipalities);
        setBrgyFiltered(filteredBrgy);
    }, [formData.reg_code, formData.prov_code, formData.mun_code]);

    useEffect(() => {
        const selectedProvince: any = provincesFiltered.find((province: any) => province.prov_code == formData.prov_code);
        if (selectedProvince) {
            setFormData(prevState => ({
                ...prevState,
                province: selectedProvince.name,
            }));
        }
    }, [formData.prov_code, provincesFiltered]);

    useEffect(() => {
        const selectedMunicipality: any = municipalityFiltered.find((mun: any) => mun.mun_code == formData.mun_code);
        if (selectedMunicipality) {
            setFormData(prevState => ({
                ...prevState,
                municipality: selectedMunicipality.name,
            }));
        }
    }, [formData.mun_code, municipalityFiltered]);


    const handleSelectChangeRegion = (selectedOption: any) => {
        const { label, value } = selectedOption;
        setFormData(prevState => ({
            ...prevState,
            region: label,
            reg_code: value,
            prov_code: '',
            province: '',
            mun_code: '',
            municipality: '',
            brgy: ''
        }));
    }
    const handleSelectChangeProvince = (selectedOption: any) => {
        const { label, value } = selectedOption;
        setFormData(prevState => ({
            ...prevState,
            province: label,
            prov_code: value,
            mun_code: '',
            municipality: '',
            brgy: ''
        }));
    }
    const handleSelectChangeMunicipality = (selectedOption: any) => {
        const { label, value } = selectedOption;
        setFormData(prevState => ({
            ...prevState,
            municipality: label,
            mun_code: value,
            brgy: ''
        }));
    }
    const handleSelectChangeBrgy = (selectedOption: any) => {
        const { label } = selectedOption;
        setFormData(prevState => ({
            ...prevState,
            brgy: label,
        }));
    }

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
                        id: data.user.id,
                        token: data.authorization.token,
                        firstname: data.user.firstname,
                        middlename: data.user.middlename,
                        lastname: data.user.lastname,
                        extension: data.user.extension,
                        username: data.user.username,
                        contact_number: data.user.contact_number,
                        address: data.user.address,
                        civil_status: data.user.civil_status,
                        birthdate: data.user.birthdate,
                        occupation: data.user.occupation,
                        education: data.user.education,
                        religion: data.user.religion,
                        gender: data.user.gender,
                        usertype: data.user.usertype,
                        brgy: data.user.brgy,
                        position: data.user.position,
                        isSignedIn: true
                    }
                    dispatch(storeUser(userToStore));
                    navigate('/appointments');
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
                                    <div className='flex gap-2 w-full flex-wrap md:flex-nowrap lg:flex-nowrap justify-between mt-3'>
                                        <div className='md:w-[49%] lg:w-[49%] w-full'>
                                            <label className="input input-bordered flex items-center mb-1 md:mb-0 lg:mb-0 h-[45px] relative pl-[37px]" >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="grow" placeholder="Firstname*" />
                                            </label>
                                            {error.firstname && <p className="text-red-500 text-[13px]">{error.firstname}</p>}
                                        </div>
                                        <div className='md:w-[49%] lg:w-[49%] w-full'>
                                            <label className="input input-bordered flex items-center mb-1 md:mb-0 lg:mb-0 h-[45px] relative pl-[37px]" >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} className="grow" placeholder="Middlename" />
                                            </label>
                                            {error.middlename && <p className="text-red-500 text-[13px]">{error.middlename}</p>}
                                        </div>
                                    </div>
                                    <div className='flex gap-2 w-full flex-wrap md:flex-nowrap lg:flex-nowrap justify-between mt-3'>
                                        <div className='md:w-[49%] lg:w-[49%] w-full'>
                                            <label className="h-[45px] input input-bordered flex items-center relative pl-[37px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="grow" placeholder="Lastname*" />
                                            </label>
                                            {error.lastname && <p className="text-red-500 text-[13px]">{error.lastname}</p>}
                                        </div>
                                        <div className='md:w-[49%] lg:w-[49%] w-full'>
                                            <label className="h-[45px] input input-bordered flex items-center relative pl-[37px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                <input type="text" name="extension" value={formData.extension} onChange={handleChange} className="grow" placeholder="Extension" />
                                            </label>
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
                                            <input name="contact_number" value={formData.contact_number} onChange={handleChange} className="grow" placeholder='Contact number' />
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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <select value={formData.civil_status} className="outline-0 grow w-full h-full" name="civil_status" onChange={handleChange}>
                                                <option value="" disabled>Civil Status</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
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
                                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="grow" placeholder='Address' />
                                        </label>
                                        {error.address && <p className="text-red-500 text-[13px]">{error.address}</p>} */}
                                        <Select
                                            className="basic-single w-full h-[45px] mt-2 hidden"
                                            classNamePrefix="select"
                                            placeholder="Select Region"
                                            onChange={handleSelectChangeRegion}
                                            name='region'
                                            value={{ value: formData.reg_code, label: formData.region }}
                                            options={regions.map((region: any) => ({ value: region.reg_code, label: region.name }))}
                                        />
                                        {error.region && <p className="text-red-500 text-[13px]">{error.region}</p>}

                                        <Select
                                            className="basic-single w-full h-[45px] mt-3 hidden"
                                            classNamePrefix="select"
                                            placeholder="Select Province"
                                            onChange={handleSelectChangeProvince}
                                            name='province'
                                            value={{ value: formData.prov_code, label: formData.province }}
                                            options={provincesFiltered.map((province: any) => ({ value: province.prov_code, label: province.name }))}
                                        />
                                        {error.province && <p className="text-red-500 text-[13px]">{error.province}</p>}

                                        <Select
                                            className="basic-single w-full h-[45px] mt-3 hidden"
                                            classNamePrefix="select"
                                            placeholder="Select Municipality"
                                            onChange={handleSelectChangeMunicipality}
                                            name='province'
                                            value={{ value: formData.mun_code, label: formData.municipality }}
                                            options={municipalityFiltered.map((municipality: any) => ({ value: municipality.mun_code, label: municipality.name }))}
                                        />
                                        {error.municipality && <p className="text-red-500 text-[13px]">{error.municipality}</p>}

                                        {/* <Select
                                            className="basic-single w-full h-[45px] mt-3"
                                            classNamePrefix="select"
                                            placeholder="Select Baranggay"
                                            onChange={handleSelectChangeBrgy}
                                            name='municipality'
                                            options={brgyFiltered.map((brgy: any) => ({ value: brgy.mun_code, label: brgy.name }))}
                                        /> */}
                                        <label className='text-[13px] font-semibold mb-0 mt-3 text-white'>Baranggay</label>
                                        <select name="brgy" value={formData.brgy} onChange={handleChange} className="select select-bordered select-md w-full ">
                                            <option value="Capoyuan" selected={formData.brgy == "Capoyuan"}>Capoyuan</option>
                                            <option value="Palma" selected={formData.brgy == "Palma"}>Palma</option>
                                            <option value="Igpalge" selected={formData.brgy == "Igpalge"}>Igpalge</option>
                                        </select>
                                        {error.brgy && <p className="text-red-500 text-[13px]">{error.brgy}</p>}

                                        {/* <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" name="education" value={formData.education} onChange={handleChange} className="grow" placeholder='Education' />
                                        </label> */}
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <select value={formData.education} className="outline-0 grow w-full h-full" name="education" onChange={handleChange}>
                                                {educationalAttainment.map(x => (
                                                    <option value={x}>{x}</option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className='text-[13px] font-semibold mb-0 mt-3 text-white'>Birthdate</label>
                                        <label className="h-[45px] input input-bordered flex items-center w-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="grow" placeholder='Birthdate' />
                                        </label>
                                        {error.birthdate && <p className="text-red-500 text-[13px]">{error.birthdate}</p>}

                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="grow" placeholder='Occupation' />
                                        </label>
                                        {/* <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1">
                                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="grow" placeholder='Religion' />
                                        </label> */}
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <select value={formData.religion} className="outline-0 grow w-full h-full" name="religion" onChange={handleChange}>
                                                {religions.map(x => (
                                                    <option value={x}>{x}</option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                                className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                            <input type={inputType} name="password" value={formData.password} onChange={handleChange} className="grow" placeholder='Password' />
                                            <svg onClick={toggleInputType} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 cursor-pointer">
                                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                            </svg>
                                        </label>
                                        {error.password && <p className="text-red-500 text-[13px]">{error.password}</p>}
                                        <label className="h-[45px] input input-bordered flex items-center w-full mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                            <input type={inputType2} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="grow" placeholder='Confirm Password' />
                                            <svg onClick={toggleInputType2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 cursor-pointer">
                                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                            </svg>
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
