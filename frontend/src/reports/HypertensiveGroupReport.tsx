import React, { useRef, useState, useEffect } from 'react'
import ReactToPrint from "react-to-print";
import logoMaternal from '@assets/images/logo-maternal.png'
import logDepartment from '@assets/images/departmenthealth_logo.png'
import Hypertensivefilter from '@dialogs/filterdialogs/Hypertensivefilter';
import { UserModel } from '@/types/userType';
import { HypertensiveModel } from '@/types/hypertensive';
import axios from 'axios';
import { DateToString, calculateAge } from '@/utils/DateFunction';

const HypertensiveGroupReport = () => {
    const contentToPrint = useRef(null);
    const [toggle, setToggles] = useState<boolean>(false);
    const [filteredNow, setFilteredNow] = useState<boolean>(false);
    const token: string | null = localStorage.getItem("token");
    const [hypertensive, setHypertensive] = useState<UserModel[]>([]);

    const setToggle = () => {
        setToggles(!toggle);
    }

    const Filter = (filter: UserModel) => {
        getData(filter);
    }

    const getData = async (filter: UserModel) => {
        const response = await axios.post("/api/hypertensive/getHypertensiveGroup", filter, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.status == "success") {
            setFilteredNow(true);
            console.log(response.data.hypertensive)
            setHypertensive(response.data.hypertensive);
        }
    }

    return (
        <div>
            <div className='flex justify-center my-3'>
                <div className='w-[13in] gap-2 flex justify-end'>
                    <button className='btn btn-primary btn-sm' onClick={setToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                        </svg>
                        Generate Hypertensive / Diabetic Records
                    </button>
                    <ReactToPrint
                        trigger={() =>
                            <button className='btn btn-primary btn-sm text-white px-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM130px6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
                                </svg>
                                Print
                            </button>
                        }
                        content={() => contentToPrint.current}
                    />
                </div>
            </div>
            <div className='flex justify-center my-3'>
                <div className='report-card border-[0.5px] w-[13in] bg-white p-5 pt-[30px] px-[40px] rounded-[4px] shadow-sm' ref={contentToPrint}>
                    <div className='flex justify-center items-center gap-5'>
                        <img src={logoMaternal} className='w-[70px] h-[70px]' />
                        <div className='text-center font-semibold'>
                            <h1>BARBAZA RURAL HEALTH UNIT</h1>
                            <h2>Barbaza, Antique</h2>
                        </div>
                        <img src={logDepartment} className='w-[70px] h-[70px]' />
                    </div>

                    <div className='bg-gray-700 text-center mt-[40px] py-1 text-white'>
                        <h1>HYPERTENSIVE / DIABETIC RECORD</h1>
                    </div>
                    <div className='mt-5 flex gap-2'>
                        <table className='border text-[10px] w-full'>
                            <thead>
                                <tr>
                                    <th className='text-center font-semibold border-r-[1px]'>NO.</th>
                                    <th className='text-center font-semibold border-r-[1px]'>LAST NAME</th>
                                    <th className='text-center font-semibold border-r-[1px]'>FIRST NAME</th>
                                    <th className='text-center font-semibold border-r-[1px]'>SEX<br />M/F</th>
                                    <th className='text-center font-semibold border-r-[1px]'>AGE</th>
                                    <th className='text-center font-semibold border-r-[1px]'>DATE OF BIRTH<br />('mm/dd/yy')</th>
                                    <th className='text-center font-semibold border-r-[1px]'>ADDRESS</th>
                                    <th colSpan={8} className='text-center font-semibold'>
                                        <table className='w-full border-l-[1px]'>
                                            <thead>
                                                <tr className='w-full text-center font-semibold border-b-[1px] '>
                                                    <th colSpan={8} className='text-center font-semibold py-1'>
                                                        Place and "x" on the corresponding column
                                                    </th>
                                                </tr>
                                                <tr className='border-b-[1px]'>
                                                    <th colSpan={8} className='text-center font-semibold py-1'>
                                                        MEDICATION TAKEN
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td className='text-center font-semibold border-r-[1px] py-1' width={70}>AMLODIPINE</td>
                                                    <td className='text-center font-semibold border-r-[1px] py-1' width={70}>LOSARTAN</td>
                                                    <td className='text-center font-semibold border-r-[1px] py-1' width={70}>METOPROCOL</td>
                                                    <td className='text-center font-semibold border-r-[1px] py-1' width={70}>SIMVASTATIN</td>
                                                    <td className='text-center font-semibold border-r-[1px] py-1' width={70}>GUCLAZIDE</td>
                                                    <td className='text-center font-semibold border-r-[1px] py-1' width={70}>METFORMIN</td>
                                                    <td className='text-center font-semibold border-r-[1px] py-1' width={70}>INSULIN</td>
                                                    <td className='text-center font-semibold border-r-[1px] py-1' width={70}>OTHERS</td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {hypertensive.map((hypertense, index) => (
                                    <tr key={hypertense.id} className='border-t-[1px]'>
                                        <td className='text-center  py-1 border-r-[1px]'>{index + 1}</td>
                                        <td className='text-center  py-1 border-r-[1px]'>{hypertense.firstname}</td>
                                        <td className='text-center  py-1 border-r-[1px]'>{hypertense.lastname}</td>
                                        <td className='text-center  py-1 border-r-[1px]'>{hypertense.gender == 'Male' ? 'M' : 'F'}</td>
                                        <td className='text-center  py-1 border-r-[1px]'>{calculateAge(hypertense.birthdate)}</td>
                                        <td className='text-center  py-1 border-r-[1px]'>{DateToString(hypertense.birthdate)}</td>
                                        <td className='text-center  py-1 border-r-[1px]'>{hypertense.address}</td>
                                        <td className='text-center  py-1 border-r-[1px]' width={70}>{hypertense?.hypertensive?.amlodipine ? '✘' : ''}</td>
                                        <td className='text-center  py-1 border-r-[1px]' width={70}>{hypertense?.hypertensive?.losartan ? '✘' : ''}</td>
                                        <td className='text-center  py-1 border-r-[1px]' width={70}>{hypertense?.hypertensive?.metroprolol ? '✘' : ''}</td>
                                        <td className='text-center  py-1 border-r-[1px]' width={70}>{hypertense?.hypertensive?.simvastatin ? '✘' : ''}</td>
                                        <td className='text-center  py-1 border-r-[1px]' width={70}>{hypertense?.hypertensive?.gliclazide ? '✘' : ''}</td>
                                        <td className='text-center  py-1 border-r-[1px]' width={70}>{hypertense?.hypertensive?.metformin ? '✘' : ''}</td>
                                        <td className='text-center  py-1 border-r-[1px]' width={70}>{hypertense?.hypertensive?.insulin ? '✘' : ''}</td>
                                        <td className='text-center  py-1' width={70}>{hypertense?.hypertensive?.others ? '✘' : ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Hypertensivefilter Filter={Filter} Toggle={setToggle} Show={toggle} />
        </div>
    )
}

export default HypertensiveGroupReport
