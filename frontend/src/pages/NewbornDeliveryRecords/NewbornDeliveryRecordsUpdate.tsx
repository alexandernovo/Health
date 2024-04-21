import { PostPartrumModel } from '@/types/PostPartrum';
import { NewBornModel } from '@/types/newBornType';
import { AppointmentModel } from '@/types/appointmentType';
import React, { useEffect, useState } from 'react'
import { generateRandomId } from '@/utils/CommonFunctions';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';
import { StringToDate } from '@/utils/DateFunction';
import { DateToString } from '@/utils/DateFunction';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewbornDeliveryRecordsUpdate: React.FC = () => {
    const [appointment, setAppointment] = useState<AppointmentModel>({});

    const initialNewbornValue = {
        newBornId: 0,
        user_id: 0,
        appointment_id: "",
        infantsName: "",
        dateTimeDelivery: "",
        infantsSex: "",
        lengthAtBirth: "",
        infantWeight: "",
        newBornScreeningCode: "",
        dateOfNewBornScreening: "",
        dateAndTimeOfDischarge: "",
        APGARScore: "",
        Presentation: "",
        uterusPosition: "",
        size: "",
        shape: "",
        adnexae: "",
        laceration: "",
        discharge: "",
        specify: "",
        postPartrum: []
    }
    const [newborn, setNewBorn] = useState<NewBornModel>(initialNewbornValue);
    const [error, setError] = useState<NewBornModel>(initialNewbornValue);
    const dispatch = useDispatch();
    const { appointment_id } = useParams<{ appointment_id: string }>();
    const navigate = useNavigate();
    const [postPartrum, setPostPartrum] = useState<PostPartrumModel[]>([]);
    const [postPartrumToRemove, setPostPartrumToRemove] = useState<PostPartrumModel[]>([]);
    const token: string | null = localStorage.getItem("token");

    useEffect(() => {
        fetchAppointmentDetails();
        fetchNewbornRecord();
    }, []);

    const fetchAppointmentDetails = async () => {
        const response = await axios.get(`/api/appointment/getAppointmentById/${appointment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.status == "success") {
            setAppointment(response.data.appointment);
            console.log(response.data.appointment)
        }
    }
    const fetchNewbornRecord = async () => {
        const response = await axios.get(`/api/newborn/getNewbornOneRecord/${appointment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status == "success") {
            setNewBorn(response.data.newborn);
            if (response.data.newborn.postpartrum.length > 0) {
                setPostPartrum(response.data.newborn.postpartrum);
            }
        }
    }
    const [postPartrumAdd, setPostPartrumAdd] = useState<PostPartrumModel>({
        keyId: "",
        postPartrumId: 0,
        postPartrumDate: "",
        bodyTemperature: "",
        postPartrumBP: "",
        postPartrumFundus: "",
        breast: "",
        Lochia: "",
        postPartrumRemarks: "",
    });



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewBorn(prevState => ({
            ...prevState,
            [name as keyof NewBornModel]: value // Type assertion
        }));
    };

    const handleInputChangePost = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostPartrumAdd(prevState => ({
            ...prevState,
            [name as keyof PostPartrumModel]: value // Type assertion
        }));
    };


    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        if (checked) {
            setNewBorn(prevState => ({ ...prevState, [name]: event.target.value }));
        } else {
            setNewBorn(prevState => ({ ...prevState, [name]: '' }));
        }
    };

    const addPostPartrum = () => {
        setPostPartrumAdd(prevState => ({
            ...prevState,
            keyId: generateRandomId()
        }))

        setPostPartrum(prevPostPartrum => {
            return [...prevPostPartrum, postPartrumAdd];
        });
    };
    const removePostPartrum = (keyIdToRemove?: string) => {
        const indexToRemove = postPartrum.findIndex((item) => item.keyId === keyIdToRemove);
        if (indexToRemove !== -1) {
            const postPartrumToRemove = postPartrum[indexToRemove];
            if (postPartrumToRemove.newBornId != 0) {
                setPostPartrumToRemove((prev) => [...prev, postPartrumToRemove]); // Add the medical model to remove array
            }
            const updatedPostPartrum = [...postPartrum]; // Create a copy of the array
            updatedPostPartrum.splice(indexToRemove, 1); // Remove the item
            setPostPartrum(updatedPostPartrum); // Update the state with the new array
        }
    };

    const updateNewborn = async () => {

        if (newborn !== undefined) {
            newborn.postPartrum = postPartrum;
            newborn.postPartrumToRemove = postPartrumToRemove;
            newborn.appointment_id = appointment_id;
            newborn.user_id = appointment.user_id;
        }

        const response = await axios.put("/api/newborn/updateNewbornRecord", newborn, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status == "success") {
            dispatch(setToastState({ toast: true, toastMessage: "Newborn Delivery Record Updated Successfully", toastSuccess: true }));
            navigate(`/newborn_record/${appointment.user_id}`);
        }
        else {
            setError(response.data.errors);
        }
    }
    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0">
                    <div className='flex justify-between p-4 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                            </svg>
                            Newborn Delivery Record
                        </h1>
                    </div>
                    <div className='flex px-[24px] gap-5'>
                        <div className='flex flex-col w-1/2'>
                            <label className='font-semibold text-[14px]'>Infant's Name</label>
                            <input type="text" placeholder="Infant's Name" value={newborn.infantsName} name="infantsName" onChange={handleInputChange} className="input input-bordered" />
                            {error?.infantsName && <p className="text-red-500 text-[13px]">{error?.infantsName}</p>}
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label className='font-semibold text-[14px]'>Date and Time of Delivery</label>
                            <input type="datetime-local" value={newborn.dateTimeDelivery} name="dateTimeDelivery" onChange={handleInputChange} placeholder="Infant's Name" className="input input-bordered" />
                            {error?.dateTimeDelivery && <p className="text-red-500 text-[13px]">{error?.dateTimeDelivery}</p>}
                        </div>
                    </div>
                    <div className='flex px-[24px] gap-5'>
                        <div className='flex flex-col w-[33%]'>
                            <label className='font-semibold text-[14px]'>Sex</label>
                            <select className="select select-bordered w-full" name="infantsSex" value={newborn.infantsSex} onChange={handleInputChange}>
                                <option disabled>Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {error?.infantsSex && <p className="text-red-500 text-[13px]">{error?.infantsSex}</p>}
                        </div>
                        <div className='flex flex-col w-[33%]'>
                            <label className='font-semibold text-[14px]'>Length at Birth</label>
                            <input type="text" placeholder="Length at Birth" name="lengthAtBirth" value={newborn.lengthAtBirth} onChange={handleInputChange} className="input input-bordered" />
                            {error?.lengthAtBirth && <p className="text-red-500 text-[13px]">{error?.lengthAtBirth}</p>}
                        </div>
                        <div className='flex flex-col w-[33%]'>
                            <label className='font-semibold text-[14px]'>Weight</label>
                            <input type="text" placeholder="Weight" name="infantWeight" value={newborn.infantWeight} onChange={handleInputChange} className="input input-bordered" />
                            {error?.infantWeight && <p className="text-red-500 text-[13px]">{error?.infantWeight}</p>}
                        </div>
                    </div>
                    <div className='flex px-[24px] gap-5'>
                        <div className='flex flex-col w-1/2'>
                            <label className='font-semibold text-[14px]'>Newborn Screening Code</label>
                            <input type="text" placeholder="Newborn Screening Code" name="newBornScreeningCode" value={newborn.newBornScreeningCode} onChange={handleInputChange} className="input input-bordered" />
                            {error?.newBornScreeningCode && <p className="text-red-500 text-[13px]">{error?.newBornScreeningCode}</p>}
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label className='font-semibold text-[14px]'>Date of Newborn Screening</label>
                            <input type="date" placeholder="Date of Newborn Screening" name="dateOfNewBornScreening" value={newborn.dateOfNewBornScreening} onChange={handleInputChange} className="input input-bordered" />
                            {error?.dateOfNewBornScreening && <p className="text-red-500 text-[13px]">{error?.dateOfNewBornScreening}</p>}
                        </div>
                    </div>
                    <div className='flex px-[24px] gap-5'>
                        <div className='flex flex-col w-1/2'>
                            <label className='font-semibold text-[14px]'>Date and Time of Discharge</label>
                            <input type="datetime-local" placeholder="Date and Time of Discharge" name="dateAndTimeOfDischarge" value={newborn.dateAndTimeOfDischarge} onChange={handleInputChange} className="input input-bordered" />
                            {error?.dateAndTimeOfDischarge && <p className="text-red-500 text-[13px]">{error?.dateAndTimeOfDischarge}</p>}
                        </div>
                    </div>
                    <div className='flex px-[24px] gap-5'>
                        <div className='flex flex-col w-1/2'>
                            <label className='font-semibold text-[14px]'>APGAR Score</label>
                            <input type="text" placeholder="APGAR Score" value={newborn.APGARScore} name="APGARScore" onChange={handleInputChange} className="input input-bordered" />
                            {error?.APGARScore && <p className="text-red-500 text-[13px]">{error?.APGARScore}</p>}
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label className='font-semibold text-[14px]'>Presentation</label>
                            <input type="text" placeholder="Presentation" value={newborn.Presentation} name="Presentation" onChange={handleInputChange} className="input input-bordered" />
                            {error?.Presentation && <p className="text-red-500 text-[13px]">{error?.Presentation}</p>}
                        </div>
                    </div>
                    <div className='px-[24px] mt-3'>
                        <h1 className='font-semibold text-[17px]'>Post Partrum Follow-up</h1>
                        <table className="table border mt-1 mb-3">
                            <thead>
                                <tr className='text-center font-semibold text-[13px] text-black'>
                                    <th className='border font-semibold py-1'>DATE</th>
                                    <th className='border font-semibold py-1'>BODY <br></br> TEMPERATURE </th>
                                    <th className='border font-semibold py-1'>BP</th>
                                    <th className='border font-semibold py-1'>FUNDUS</th>
                                    <th className='border font-semibold py-1'>BREAST</th>
                                    <th className='border font-semibold py-1'>LOCHIA</th>
                                    <th className='border font-semibold py-1'>REMARKS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {postPartrum
                                    .sort((a, b) => {
                                        const dateA = StringToDate(a.postPartrumDate) || new Date(0);
                                        const dateB = StringToDate(b.postPartrumDate) || new Date(0);
                                        return dateA.getTime() - dateB.getTime();
                                    })
                                    .map(pP => (
                                        <tr key={pP.postPartrumId}>
                                            <td className='border'>{DateToString(pP.postPartrumDate)}</td>
                                            <td className='border text-center'>{pP.bodyTemperature}</td>
                                            <td className='border'>{pP.postPartrumBP}</td>
                                            <td className='border'>{pP.postPartrumFundus}</td>
                                            <td className='border'>{pP.breast}</td>
                                            <td className='border'>{pP.Lochia}</td>
                                            <td className='border'>{pP.postPartrumRemarks}</td>
                                            <td>
                                                <div className='flex justify-center items-center'>
                                                    <button onClick={() => removePostPartrum(pP.keyId)} className='btn btn-ghost rounded-full px-3 active:bg-red-400 hover:bg-red-300'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 active:text-white ">
                                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                {postPartrum.length == 0 && (
                                    <tr>
                                        <td colSpan={11}>
                                            <p className='text-[12px] text-gray-400 text-center'>No Data</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='px-[24px]'>
                        <div className='border p-4 mb-3 rounded-md shadow-sm'>
                            <h1 className='font-semibold text-[17px] mb-2'>Post Partrum Follow-up Form</h1>

                            <div className='flex gap-5'>
                                <div className='flex flex-col w-[33%]'>
                                    <label className='font-semibold text-[14px]'>Date</label>
                                    <input type="date" className="input input-sm input-bordered" name='postPartrumDate' value={postPartrumAdd.postPartrumDate} onChange={handleInputChangePost} />
                                </div>
                                <div className='flex flex-col w-[33%]'>
                                    <label className='font-semibold text-[14px]'>Body Temperature</label>
                                    <input type="number" placeholder="Body Temperature" name='bodyTemperature' value={postPartrumAdd.bodyTemperature} onChange={handleInputChangePost} className="input input-sm input-bordered" />
                                </div>
                                <div className='flex flex-col w-[33%]'>
                                    <label className='font-semibold text-[14px]'>BP</label>
                                    <input type="text" placeholder="BP" name='postPartrumBP' value={postPartrumAdd.postPartrumBP} onChange={handleInputChangePost} className="input input-sm input-bordered" />
                                </div>
                            </div>
                            <div className='flex gap-5 mt-3'>
                                <div className='flex flex-col w-[33%]'>
                                    <label className='font-semibold text-[14px]'>Fundus</label>
                                    <input type="date" placeholder='Fundus' name='postPartrumFundus' value={postPartrumAdd.postPartrumFundus} onChange={handleInputChangePost} className="input input-sm input-bordered" />
                                </div>
                                <div className='flex flex-col w-[33%]'>
                                    <label className='font-semibold text-[14px]'>Breast</label>
                                    <input type="text" placeholder="Breast" name='breast' value={postPartrumAdd.breast} onChange={handleInputChangePost} className="input input-sm input-bordered" />
                                </div>
                                <div className='flex flex-col w-[33%]'>
                                    <label className='font-semibold text-[14px]'>Lochia</label>
                                    <input type="text" placeholder="Lochia" name='Lochia' value={postPartrumAdd.Lochia} onChange={handleInputChangePost} className="input input-sm input-bordered" />
                                </div>
                            </div>
                            <div className='flex flex-col mt-3'>
                                <label className='font-semibold text-[14px]'>Remarks</label>
                                <textarea className="textarea textarea-bordered w-full" name='postPartrumRemarks' value={postPartrumAdd.postPartrumRemarks} onChange={handleInputChangePost} placeholder="Remarks"></textarea>
                            </div>
                            <button className="btn btn-sm btn-primary btn-outline mt-2" onClick={addPostPartrum}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                </svg>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className='px-[24px]'>
                        <h1 className='font-semibold text-[17px]'>Pelvic Examination</h1>
                        <div className='ml-4 text-[13px] mt-3'>
                            <p className='font-semibold'>UTERUS POSITION</p>
                            <div className='flex gap-5 mt-2'>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="uterusPosition" value="ANTEFLEXED" checked={newborn.uterusPosition === 'ANTEFLEXED'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">ANTEFLEXED</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="uterusPosition" value="RETROFLEXED" checked={newborn.uterusPosition === 'RETROFLEXED'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">RETROFLEXED</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="uterusPosition" value="MIDPOSITION" checked={newborn.uterusPosition === 'MIDPOSITION'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">MIDPOSITION</span>
                                </label>
                            </div>
                            {error?.uterusPosition && <p className="text-red-500 text-[13px]">{error?.uterusPosition}</p>}


                            <p className='font-semibold mt-3'>SIZE</p>
                            <div className='flex gap-5 mt-2'>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="size" value="SMALL" checked={newborn.size === 'SMALL'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">SMALL</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="size" value="NORMAL" checked={newborn.size === 'NORMAL'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NORMAL</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="size" value="LARGE" checked={newborn.size === 'LARGE'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">LARGE</span>
                                </label>
                            </div>
                            {error?.size && <p className="text-red-500 text-[13px]">{error?.size}</p>}

                            <p className='font-semibold mt-3'>SHAPE</p>
                            <div className='flex gap-5 mt-2'>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="shape" value="REGULAR" checked={newborn.shape === 'REGULAR'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">REGULAR</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="shape" value="IRREGULAR" checked={newborn.shape === 'IRREGULAR'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">IRREGULAR</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="shape" value="FIBROID" checked={newborn.shape === 'FIBROID'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">FIBROID</span>
                                </label>
                            </div>
                            {error?.shape && <p className="text-red-500 text-[13px]">{error?.shape}</p>}

                            <p className='font-semibold mt-3'>ADNEXAE</p>
                            <div className='flex gap-5 mt-2'>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="adnexae" value="NORMAL" checked={newborn.adnexae === 'NORMAL'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NORMAL</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="adnexae" value="ENLARGE" checked={newborn.adnexae === 'ENLARGE'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">ENLARGE</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="adnexae" value="TENDER" checked={newborn.adnexae === 'TENDER'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">TENDER</span>
                                </label>
                            </div>
                            {error?.adnexae && <p className="text-red-500 text-[13px]">{error?.adnexae}</p>}

                            <p className='font-semibold mt-3'>LACERATION</p>
                            <div className='flex gap-5 mt-2'>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="laceration" value="YES" checked={newborn.laceration === 'YES'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">YES</span>
                                </label>
                                <label className="items-center cursor-pointer flex gap-2">
                                    <input type="checkbox" name="laceration" value="NO" checked={newborn.laceration === 'NO'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">NO</span>
                                </label>
                            </div>
                            {error?.laceration && <p className="text-red-500 text-[13px]">{error?.laceration}</p>}

                            <p className='font-semibold mt-3'>DISCHARGE</p>
                            <div className='flex gap-5 mt-2 items-center mb-4'>
                                <div className='flex flex-col'>
                                    <div className='flex gap-5'>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="discharge" value="YES" checked={newborn.discharge === 'YES'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">YES</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="discharge" value="NO" checked={newborn.discharge === 'NO'} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">NO</span>
                                        </label>
                                    </div>
                                    {error?.discharge && <p className="text-red-500 text-[13px]">{error?.discharge}</p>}
                                </div>
                                <div className='flex w-[60%] flex-cp; items-center gap-2'>
                                    <label className='font-semibold text-[13px]'>If Yes, please specify:</label>
                                    <input type="text" placeholder="If Yes, please specify:" required={newborn.discharge === 'YES'} disabled={newborn.discharge === 'NO' || newborn.discharge === '' || newborn.discharge === null || newborn.discharge === undefined} name='specify' value={newborn.specify} onChange={handleInputChange} className="input input-bordered input-sm flex-1" />
                                </div>
                                {error?.specify && <p className="text-red-500 text-[13px]">{error?.specify}</p>}
                            </div>
                            <div className='flex justify-end mb-[30px] mt-4'>
                                <button className="btn btn-sm btn-primary mt-2 text-white" onClick={() => updateNewborn()}>Save Newborn Delivery Record</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default NewbornDeliveryRecordsUpdate
