import React, { useState, useEffect } from 'react'
import { AppointmentModel } from '@/types/appointmentType';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { vaccinationTypes } from '@/types/vaccination';
import { DateToString, calculateAge } from '@/utils/DateFunction';
import { VaccinationModel, VaccinationModelInitialValue } from '@/types/vaccination';
import { OtherVaccinesModel, OtherVaccinesModelInitialValue } from '@/types/otherVaccines';
import Select from 'react-select';
import { generateRandomId } from '@/utils/CommonFunctions';
import { StringToDate } from '@/utils/DateFunction';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';

const VaccinationFormUpdate: React.FC = () => {
    const { appointment_id } = useParams<{ appointment_id: string }>();
    const [appointment, setAppointment] = useState<AppointmentModel>({});
    const [vaccination, setVaccination] = useState<VaccinationModel>(VaccinationModelInitialValue);
    const [otherVaccinesList, setOtherVaccinesList] = useState<OtherVaccinesModel[]>([]);
    const [removeotherVaccinesList, setremoveOtherVaccinesList] = useState<OtherVaccinesModel[]>([]);
    const [otherVaccines, setOtherVaccines] = useState<OtherVaccinesModel>(OtherVaccinesModelInitialValue);
    const token: string | null = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointmentDetails();
        getVaccinationData();
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

    const handleInputChange = (e: any) => {
        const { name, value, type } = e.target;
        if (type == "checkbox") {
            setVaccination(prevState => {
                const prevValue = prevState[name as keyof VaccinationModel]; // Type assertion to keyof HypertensiveModel
                return {
                    ...prevState,
                    [name]: !prevValue
                };
            });
        }
        else {
            setVaccination(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const handleSelected = (selectedOption: any) => {
        console.log(selectedOption.value);
        setOtherVaccines(prevState => ({
            ...prevState,
            otherType: `${selectedOption.value} - ${selectedOption.label}`
        }));
    }

    const handleInputChangeOther = (e: any) => {
        const { name, value } = e.target;
        setOtherVaccines(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getVaccinationData = async () => {
        const response = await axios.get(`/api/vaccination/getVaccinationOneRecord/${appointment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status == "success") {
            setVaccination(response.data.vaccination);
            setOtherVaccinesList(response.data.vaccination.othervaccines);
        }
    }
    const removeOtherVaccinesNow = (keyIdToRemove?: string) => {
        const indexToRemove = otherVaccinesList.findIndex((item) => item.keyId == keyIdToRemove);
        if (indexToRemove !== -1) {
            const otherVaccinesToRemove = otherVaccinesList[indexToRemove]; // Get the medical model
            if (otherVaccinesToRemove.otherVaccinesId != 0) {
                setremoveOtherVaccinesList((prev) => [...prev, otherVaccinesToRemove]); // Add the medical model to remove array
            }
            const udpatedOtherVaccines = [...otherVaccinesList]; // Create a copy of the array
            udpatedOtherVaccines.splice(indexToRemove, 1); // Remove the item
            setOtherVaccinesList(udpatedOtherVaccines); // Update the state with the new array
        }
    };
    const addForm = () => {
        otherVaccines.keyId = generateRandomId();
        otherVaccines.otherVaccinesId = 0;
        setOtherVaccinesList(prevState => {
            return [...prevState, otherVaccines];
        });
        setOtherVaccines(OtherVaccinesModelInitialValue);
    }

    const updateVaccination = async () => {
        vaccination.otherVaccines = otherVaccinesList;
        vaccination.removeotherVaccines = removeotherVaccinesList;
        vaccination.appointment_id = appointment.appointment_id;
        vaccination.user_id = appointment.user_id;
        const response = await axios.put("/api/vaccination/updateVaccination", vaccination,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (response.data.status == "success") {
            dispatch(setToastState({ toast: true, toastMessage: "Vaccination Record Updated Successfully", toastSuccess: true }));
            navigate(`/vaccination_record/${appointment.user_id}`);
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
                            Vaccination Record
                        </h1>
                    </div>
                    <div className='flex px-5 gap-2'>
                        <div className='w-1/3'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold text-[14px]'>Patient Name</label>
                                <input type="text" readOnly value={`${appointment.firstname} ${appointment.lastname}`} placeholder="Patient Name" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold text-[14px]'>Date of Birth</label>
                                <input type="text" readOnly value={DateToString(appointment.birthdate)} placeholder="Patient Name" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold text-[14px]'>Age</label>
                                <input type="text" readOnly value={calculateAge(appointment.birthdate)} placeholder="Patient Name" className="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>

                    <div className='flex px-5 gap-2'>
                        <div className='w-1/3'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold text-[14px]'>Address</label>
                                <input type="text" readOnly value={appointment.address} placeholder="Patient Name" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold text-[14px]'>60 taon (Name of Vaccinator)</label>
                                <input type="text" name='nameOfVaccinator60' disabled={calculateAge(appointment.birthdate) < 60} onChange={handleInputChange} value={vaccination.nameOfVaccinator60} placeholder="Name of Vaccinator" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold text-[14px]'>65 taon (Name of Vaccinator)</label>
                                <input type="text" name='nameOfVaccinator65' disabled={calculateAge(appointment.birthdate) < 65} onChange={handleInputChange} value={vaccination.nameOfVaccinator65} placeholder="Name of Vaccinator" className="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>

                    <div className='flex px-5 gap-2'>
                        <div className='w-1/3'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold text-[14px]'>BloodType</label>
                                <input type="text" name='BloodType' value={vaccination.BloodType} onChange={handleInputChange} placeholder="Blood Type" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold text-[14px]'>Allergies</label>
                                <input type="text" name='Allergies' value={vaccination.Allergies} onChange={handleInputChange} placeholder="Allergies" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <label className='font-semibold text-[14px]'>For age 60 and above</label>
                            <div className='flex gap-4'>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input checked={vaccination.Diabetes} onChange={handleInputChange} disabled={calculateAge(appointment.birthdate) < 60} type="checkbox" name="pastHeartDisease" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex justify-start gap-2">
                                        <input checked={vaccination.Hypertension} onChange={handleInputChange} disabled={calculateAge(appointment.birthdate) < 60} type="checkbox" name="pastHeartDisease" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hypertension</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-5 pb-2'>
                        <table className='table table-bordered border border-black text-[13px] text-black'>
                            <thead>
                                <tr>
                                    <th className='border border-black font-semibold text-center text-black' colSpan={4}>Vaccines</th>
                                </tr>
                                <tr className='border border-black'>
                                    <th className='border-r-[1px] border-black font-semibold text-black'>Type</th>
                                    <th className='border-r-[1px] border-black font-semibold text-black'>Date Given</th>
                                    <th className='border-r-[1px] border-black font-semibold text-black'>Remarks</th>
                                    <tr></tr>
                                </tr>
                            </thead>
                            <tbody>
                                {otherVaccinesList
                                    .sort((a, b) => {
                                        const dateA = StringToDate(a.otherDateGiven) || new Date(0);
                                        const dateB = StringToDate(b.otherDateGiven) || new Date(0);
                                        return dateA.getTime() - dateB.getTime();
                                    })
                                    .map(md => (
                                        <tr key={md.keyId} className='border border-black'>
                                            <td className='border-r-[1px] border-black text-black'>{md.otherType}</td>
                                            <td className='border-r-[1px] border-black text-black'>{DateToString(md.otherDateGiven)}</td>
                                            <td className='border-r-[1px] border-black text-black'>{md.otherRemarks}</td>
                                            <td>
                                                <div className='flex justify-center items-center'>
                                                    <button onClick={() => removeOtherVaccinesNow(md.keyId)} className='btn btn-ghost rounded-full px-3 active:bg-red-400 hover:bg-red-300'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 active:text-white ">
                                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                {otherVaccinesList.length == 0 && (
                                    <tr className='border border-black'>
                                        <td colSpan={4}>
                                            <p className='text-[12px] text-gray-400 text-center'>No Data</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className='p-3 border rounded shadow-lg mx-5 mb-4'>
                        <p className='font-semibold'>Vaccines Used Form</p>
                        <div className='mt-3 flex gap-2'>
                            <div className='flex flex-col w-2/3'>
                                <label className='font-semibold text-[14px]'>Vaccination Type</label>
                                <Select
                                    className="basic-single h-[50px]"
                                    classNamePrefix="select"
                                    placeholder="Vaccination Type..."
                                    name='otherType'
                                    onChange={handleSelected}
                                    options={vaccinationTypes().map(vaccination => ({ value: vaccination.value, label: `${vaccination.label}` }))}
                                />

                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-semibold text-[14px]'>Date Given</label>
                                    <input name='otherDateGiven' value={otherVaccines.otherDateGiven} onChange={handleInputChangeOther} type="date" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <textarea name='otherRemarks' value={otherVaccines.otherRemarks} onChange={handleInputChangeOther} className="textarea textarea-bordered w-full" placeholder="Remarks"></textarea>
                        </div>

                        <button onClick={addForm} className="btn btn-sm btn-primary btn-outline mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            </svg>
                            Add
                        </button>
                    </div>
                    <div className='flex justify-end mr-3 mb-4'>
                        <button onClick={() => updateVaccination()} className="btn btn-sm btn-primary mt-2 text-white">Save Vaccination Record</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VaccinationFormUpdate
