import React, { useState } from 'react'
import { EkonsultaModel } from '@/types/enkonsultaType';

const EkonsultaForm: React.FC = () => {

    const [ekonsulta, setEkonsulta] = useState<EkonsultaModel>();

    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0 pb-3">
                    <div className='flex justify-between p-4 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                            </svg>
                            Ekonsulta Record
                        </h1>
                    </div>
                    <div className='px-5'>
                        <div className='border flex justify-between p-2 gap-4'>
                            <div className='flex mt-2 w-[50%]'>
                                <label className='font-semibold text-[13px] flex-nowrap'>Date of Consultation:</label>
                                <input type="text" className="input input-bordered input-sm w-full" />
                            </div>
                            <div className='flex mt-2 w-[50%] '>
                                <label className='font-semibold text-[13px] flex-nowrap '>Family Serial No:</label>
                                <input type="text" className="input input-bordered input-sm w-full" />
                            </div>
                        </div>
                        <div className='border border-t-0 flex justify-between items-center p-1 px-2'>
                            <label className='w-[50%] text-[13px] font-bold'>Time:</label>
                            <div className='flex justify-start items-center w-[50%] gap-2'>
                                <label className='text-[13px] font-bold'>Patient Type:</label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">New</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Old</span>
                                </label>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Personal Details</p>
                            <div className='px-2 mt-5'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[13px]'>Patient Name</label>
                                    <input type="text" className="input input-bordered input-sm w-[50%]" />
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[30%]'>
                                        <label className='font-semibold text-[13px]'>Birthdate</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <label className='font-semibold text-[13px]  w-[10%]'>Age</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[15%]' >
                                        <label className='font-semibold text-[13px] '>Gender</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Civil Status</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[40%]'>
                                        <label className='font-semibold text-[13px]'>If married, Maiden Last Name:</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[40%]'>
                                        <label className='font-semibold text-[13px] '>Maiden Middle Name:</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[40%]'>
                                        <label className='font-semibold text-[13px]'>Mother's Name:</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[40%]'>
                                        <label className='font-semibold text-[13px] '>Mother's Birthday:</label>
                                        <input type="date" className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[40%]'>
                                        <label className='font-semibold text-[13px]'>Educational Attainment:</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[40%]'>
                                        <label className='font-semibold text-[13px] '>Occupation:</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex flex-col mt-2  w-[40%]'>
                                        <label className='font-semibold text-[13px]'>Religion:</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                    <div className='flex flex-col mt-2 w-[40%]'>
                                        <label className='font-semibold text-[13px] '>Ethnicity (IP Group):</label>
                                        <input type="text" className="input input-bordered input-sm w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Address</p>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Purok:</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>Barangay:</label>
                                    <input type="date" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Contact Number:</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>ZipCode:</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Philhealth</p>
                            <div className='flex w-full gap-4 px-2 items-end'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>NHTS No.:</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Member</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Dependent</span>
                                </label>
                            </div>
                            <div className='flex w-full gap-4 px-2 items-end'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>PHIC No.:</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Member</span>
                                </label>
                                <label className="label cursor-pointer flex gap-2">
                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <span className="label-text text-[13px]">Dependent</span>
                                </label>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Anthropometrics</p>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Body Length/Height (cm):</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>Weight(kg):</label>
                                    <input type="number" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>BMI:</label>
                                    <input type="number" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Head Circumference:</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>Waist Circumference:</label>
                                    <input type="number" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[40%]'>
                                    <label className='font-semibold text-[13px]'>Skinfold Thickness:</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[40%]'>
                                    <label className='font-semibold text-[13px] '>Mid Upper Arm Circumference:</label>
                                    <input type="number" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3'>
                            <p className='border-b-[1px] px-2 py-1'>Anthropometrics</p>
                            <div className='flex w-full gap-4 px-2'>
                                <div className='flex flex-col mt-2  w-[20%]'>
                                    <label className='font-semibold text-[13px]'>BP(mmHg):</label>
                                    <input type="text" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[20%]'>
                                    <label className='font-semibold text-[13px] '>RR(cpm):</label>
                                    <input type="number" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[20%]'>
                                    <label className='font-semibold text-[13px] '>HR(bpm):</label>
                                    <input type="number" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[20%]'>
                                    <label className='font-semibold text-[13px] '>PR(bpm):</label>
                                    <input type="number" className="input input-bordered input-sm w-full" />
                                </div>
                                <div className='flex flex-col mt-2 w-[20%]'>
                                    <label className='font-semibold text-[13px] '>Temp(°C):</label>
                                    <input type="number" className="input input-bordered input-sm w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='border mt-2 pb-3 px-2 flex gap-3'>
                            <div className='w-[40%]'>
                                <label className='font-semibold text-[13px] '>Chief Complaints / History of Present Illness:</label>
                                <textarea className="textarea textarea-bordered w-full" rows={11} placeholder="Chief Complaints"></textarea>
                            </div>
                            <div className='w-[60%] mt-4'>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hospitalization</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Emphysema</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Pneumonia</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Asthma</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Epilepsy/Seizure Disorder</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Thyroid Diseases</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Cancer, specify organ</span>
                                        </label>
                                        <input type="number" className="input input-bordered input-sm w-[80%]" />
                                    </div>
                                    <div>
                                        <label className="label cursor-pointer flex gap-2 justify-start">
                                            <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">hepatitis, specify type</span>
                                        </label>
                                        <input type="number" className="input input-bordered input-sm w-[80%]" />
                                    </div>

                                    <label className="label cursor-pointer flex gap-2 mb-[30px]">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Urinary Track Infection</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Cerebrovascular Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hyperlipidemia</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">TB, specify organ</span>
                                        <input type="number" className="input input-bordered input-sm w-[50%]" />
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Coronary Artery Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hypertension, highest Bp</span>
                                        <input type="number" className="input input-bordered input-sm w-[30%]" />
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">TB, specify organ</span>
                                        <input type="number" className="input input-bordered input-sm w-[30%]" />
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes Mellitus</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Peptic Ulcer Disease</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Liver Diseases</span>
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Minor Surgeries</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">COPD</span>
                                    </label>
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Others</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EkonsultaForm
