import React, { useEffect, useState } from 'react'
import ConsultationTypeDialog from '@/dialogs/consultationtypedialogs/ConsultationTypeDialog'
import UpdateConsultationTypeDialog from '@/dialogs/consultationtypedialogs/UpdateConsultationTypeDialog';
import ConfirmationDialog from '@dialogs/confirmationdialog/ConfirmationDialog';
import { ConsultationModel } from '@/types/consultationType';
import { setToastState } from '@/store/common/global';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const ManageConsultationType: React.FC = () => {
    const token: string | null = localStorage.getItem("token");
    const [toggleAdd, setToggleAdd] = useState<boolean>(false);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [activateConsultationModal, setActivateConsultationModal] = useState<boolean>(false);

    const [consultationType, setConsultationType] = useState<ConsultationModel[]>([]);
    const [originalConsultation, setOriginalConsultation] = useState<ConsultationModel[]>([]); // Maintain original list
    const dispatch = useDispatch();

    const [toUpdate, setToUpdate] = useState<ConsultationModel>({
        consultationTypeName: '',
    });

    const AddConsultationData = (data: ConsultationModel) => {
        setConsultationType((prevType) => [data, ...prevType]);
    };

    const [confirmData, setConfirmData] = useState({
        buttonColor: "",
        buttonText: "",
        message: "",
    });

    const toggleAddModal = () => {
        setToggleAdd(!toggleAdd);
    }

    const toggleUpdateModal = () => {
        setToggleUpdate(!toggleUpdate);
    }

    const toggleActivateConsultation = () => {
        setActivateConsultationModal(!activateConsultationModal);
    }

    const HandleUpdateData = (data: ConsultationModel) => {
        setToUpdate(data);
        toggleUpdateModal();
    };

    const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.trim().toLowerCase();
        if (searchValue == '') {
            // If search input is empty, revert to original list
            setConsultationType(originalConsultation);
        } else {
            const filteredConsultations = originalConsultation.filter(consultation => {
                return consultation.consultationTypeName.toLowerCase().includes(searchValue);
            });
            setConsultationType(filteredConsultations);
        }
    };

    const ConfirmationModal = (data: ConsultationModel) => {
        setToUpdate(data);
        const Modaldata = {
            buttonColor: `${data.consultationTypeStatus == 0 ? 'success' : 'error'}`,
            buttonText: `${data.consultationTypeStatus == 0 ? 'Activate' : 'Deactivate'}`,
            message: `${data.consultationTypeStatus == 0 ? 'Are you sure you want to activate this consultation type?' : 'Are you sure you want to deactivate this consultation type?'}`,
        };
        setConfirmData(Modaldata);
        toggleActivateConsultation();
    };

    const UpdateConsultation = (data: ConsultationModel) => {
        setConsultationType((prevconsultations) => {
            const index = prevconsultations.findIndex((consultation) => consultation.consultationTypeId == data.consultationTypeId);
            if (index !== -1) {
                const updatedconsultations = [...prevconsultations];
                updatedconsultations[index] = data;
                return updatedconsultations;
            }
            return prevconsultations;
        });
    };

    const HandleActivation = () => {
        ActivationConsultation();
    }

    const ActivationConsultation = async () => {
        try {
            const response = await axios.put(`/api/consultation/activation/${toUpdate.consultationTypeId}/${toUpdate.consultationTypeStatus}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status == 'success') {
                UpdateConsultation(response.data.consultation);
                const message: string = toUpdate.consultationTypeStatus == 0 ? "Activated Successfully" : "Deactivated Successfully";
                dispatch(setToastState({ toast: true, toastMessage: message, toastSuccess: true }));
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchConsultationType();
    }, [])

    const fetchConsultationType = async () => {
        try {
            const response = await axios.get("api/consultation/getconsultation", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.status == "success") {
                setOriginalConsultation(Object.values(response.data.consultation_type));
                setConsultationType(Object.values(response.data.consultation_type));
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0">
                    <div className='flex justify-between p-4 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                                <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                                <path fillRule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            Manage Consultation Type
                        </h1>
                        <div className='flex gap-1'>
                            <button className='btn btn-ghost btn-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <input type="text" onInput={HandleSearch} placeholder="Search something..." className="input input-bordered input-sm w-full max-w-xs" />
                        </div>
                    </div>
                    <div className="overflow-x-auto px-5 pb-5 h-[74vh]">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='w-[33%]'>Consultation Name</th>
                                    <th className='w-[33%]'>Status</th>
                                    <th className='w-[33%]'>
                                        {/* <button className='btn btn-success btn-outline btn-xs flex gap-1 px-4' onClick={() => toggleAddModal()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                            </svg>
                                            Consultation Type
                                        </button> */}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultationType.map(consultation => (
                                    <tr key={consultation.consultationTypeId} >
                                        <td className='capitalize'>
                                            {consultation.consultationTypeName}
                                        </td>
                                        <td className={consultation.consultationTypeStatus == 0 ? "text-error" : "text-success"}>
                                            {consultation.consultationTypeStatus == 0 ? "Inactive" : "Active"}
                                        </td>
                                        {/* <td className='w-[12%]'>
                                            <button className="btn btn-outline btn-primary btn-xs flex gap-1" onClick={() => HandleUpdateData(consultation)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                </svg>
                                                Update
                                            </button>
                                        </td> */}
                                        <td className='w-[15%]'>
                                            <button onClick={() => ConfirmationModal(consultation)} className={`btn btn-outline btn-xs flex gap-1 ${consultation.consultationTypeStatus == 0 ? 'btn-success' : 'btn-error'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                                                </svg>
                                                {consultation.consultationTypeStatus == 0 ?
                                                    'Activate'
                                                    :
                                                    'Deactivate'
                                                }
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ConsultationTypeDialog Toggle={toggleAddModal} Show={toggleAdd} OnAdd={AddConsultationData} />
            <UpdateConsultationTypeDialog Toggle={toggleUpdateModal} Show={toggleUpdate} OnUpdate={UpdateConsultation} Data={toUpdate} />
            <ConfirmationDialog Toggle={toggleActivateConsultation} Show={activateConsultationModal} OnConfirm={HandleActivation} Message={confirmData.message} ConfirmButton={confirmData.buttonText} ButtonColor={confirmData.buttonColor} />
        </div>
    )
}

export default ManageConsultationType
