import React, { useState } from 'react'
import { EkonsultaModel } from '@/types/enkonsultaType';

const EkonsultaForm: React.FC = () => {

    const [ekonsulta , setEkonsulta] = useState<EkonsultaModel>();

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
                        <div className='border flex justify-between p-2'>
                            <p className='w-[50%]'>Date of Consultation:</p>
                            <p className='w-[50%]'>Family Serial No:</p>
                        </div>
                        <div className='border border-t-0 flex justify-between items-center p-1 px-2'>
                            <label className='w-[50%]'>Time:</label>
                            <div className='flex justify-start items-center w-[50%] gap-2'>
                                <label>Patient Type:</label>
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
                        <div className='border mt-2'>
                            <p className='border-b-[1px] px-2 py-1'>Personal Details</p>
                            <div className='px-2 mt-5'>
                                <p>Patient Name</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EkonsultaForm
