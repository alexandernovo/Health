import React, { useState, useEffect } from 'react'
import { ConsultationModel } from '@/types/consultationType';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';

interface UpdateConsultationTypeDialogProps {
    Toggle: () => void,
    OnUpdate: (data: ConsultationModel) => void;
    Show: boolean;
    Data: ConsultationModel;
}
const UpdateConsultationTypeDialog: React.FC<UpdateConsultationTypeDialogProps> = (props: UpdateConsultationTypeDialogProps) => {
    const dispatch = useDispatch();
    const token: string | null = localStorage.getItem("token");

    const initialData: ConsultationModel = {
        consultationTypeName: ''
    }

    useEffect(() => {
        setFormData({
            consultationTypeName: props.Data.consultationTypeName
        });
        setError(initialData);
    }, [props.Data.consultationTypeId]);

    const [formData, setFormData] = useState<ConsultationModel>(initialData);
    const [error, setError] = useState<ConsultationModel>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name as keyof ConsultationModel]: value // Type assertion
        }));
        if (formData[name as keyof ConsultationModel] !== '') { // Type assertion
            setError(prevState => ({
                ...prevState,
                [name as keyof ConsultationModel]: ""
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/consultation/updateconsultation/${props.Data.consultationTypeId}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            if (response.data.status == 'success') {
                props.OnUpdate(response.data.consultation); // append data in manage consultation
                dispatch(setToastState({ toast: true, toastMessage: "Consultation Updated Successfully", toastSuccess: true }));
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
            <div className="modal-box rounded-md p-0 overflow-hidden">
                <div className='bg-[#219EBC] p-4 px-5 sticky top-0 z-10 text-white flex justify-between'>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        Update Consultation Type
                    </h3>
                    <button className="btn btn-ghost btn-sm rounded-full p-1" onClick={() => props.Toggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className='modal-body px-5 pt-4 pb-[10px] overflow-scroll'>
                    <div className='w-full mx-auto h-full'>
                        <div className='w-full flex flex-col items-center'>
                            <div className='md:w-full lg:w-full'>
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <div className='flex gap-2 w-full flex-wrap md:flex-nowrap lg:flex-nowrap justify-between'>
                                        <div className='w-full'>
                                            <label className="input input-bordered flex items-center mb-1 md:mb-0 lg:mb-0 h-[45px] relative pl-[37px]" >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1 absolute left-[16px]"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                <input type="text" name="consultationTypeName" value={formData.consultationTypeName} onChange={handleChange} className="grow" placeholder="Consultation Type" />
                                            </label>
                                            {error.consultationTypeName && <p className="text-red-500 text-[13px]">{error.consultationTypeName}</p>}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-active btn-primary w-full mt-3 bg-[#219EBC] border-0">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default UpdateConsultationTypeDialog
