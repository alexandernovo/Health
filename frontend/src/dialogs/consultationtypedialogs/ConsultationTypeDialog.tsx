import React, { useState } from 'react'
import { ConsultationModel } from '@/types/consultationType';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';

interface ConsultationTypeDialogProps {
    Toggle: () => void,
    OnAdd: (data: ConsultationModel) => void;
    Show: boolean;
}
const ConsultationTypeDialog: React.FC<ConsultationTypeDialogProps> = (props: ConsultationTypeDialogProps) => {
    const dispatch = useDispatch();
    const token: string | null = localStorage.getItem("token");

    const [formData, setFormData] = useState<ConsultationModel>({
        consultationTypeName: '',
    });

    const [error, setError] = useState<ConsultationModel>({
        consultationTypeName: '',
    });

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
            const response = await axios.post('/api/consultation/addconsultation', formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(response.data);
            if (response.data.status == 'success') {
                props.OnAdd(response.data.consultation); // append data in manage user
                dispatch(setToastState({ toast: true, toastMessage: "Consultation Added Successfully", toastSuccess: true }));
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
                            <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                            <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                            <path fillRule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        Add Consultation Type
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
                                    <button type="submit" className="btn btn-active btn-primary w-full mt-3 bg-[#219EBC] border-0">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default ConsultationTypeDialog
