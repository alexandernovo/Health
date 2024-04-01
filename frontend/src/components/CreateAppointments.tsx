import React, { useState } from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'

const CreateAppointments: React.FC = () => {
    return (
        <div className='m-3'>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <Link to="/appointments">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            Appointments
                        </Link>
                    </li>
                    <li>
                        <span className="inline-flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            Create Appointment
                        </span>
                    </li>
                </ul>
            </div>

            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3 ">
                <div className="card-body p-0 h-[74vh]">
                    <div className='flex justify-between p-4 px-5 pt-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                            </svg>
                            Create Appointment
                        </h1>
                    </div>
                    <div className='flex mb-3'>
                        <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                            <label className='font-semibold text-[14px]'>Patient Name</label>
                            <Select
                                className="basic-single w-full h-[45px]"
                                classNamePrefix="select"
                                placeholder="Select Patient..."
                                // defaultValue={colourOptions[0]}
                                // isDisabled={isDisabled}
                                // isLoading={isLoading}
                                // isClearable={isClearable}
                                // isRtl={isRtl}
                                // isSearchable={isSearchable}
                                name="color"
                            // options=""
                            />
                        </div>
                        <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                            <label className='font-semibold text-[14px]'>Address</label>
                            <input type="text" name="lastname" className="input input-bordered w-full h-[48px]" placeholder="Address" />
                        </div>
                    </div>
                    <div className='flex mb-3'>
                        <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                            <label className='font-semibold text-[14px]'>Appointment Date</label>
                            <input type="date" name="lastname" className="input input-bordered w-full h-[48px]" placeholder="Address" />
                        </div>
                        <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                            <label className='font-semibold text-[14px]'>Appointment Time</label>
                            <input type="time" name="lastname" className="input input-bordered w-full h-[48px]" placeholder="Address" />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                            <label className='font-semibold text-[14px]'>Contact No.</label>
                            <input type="text" name="lastname" className="input input-bordered w-full h-[48px]" placeholder="Contact No." />
                        </div>
                        <div className='md:w-[49%] lg:w-[49%] w-full px-5'>
                            <label className='font-semibold text-[14px]'>Type of Consultation</label>
                            <select className="select select-bordered w-full max-h-none h-[42px]">
                                <option disabled selected>Type of Consultation</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>
                    </div>
                    <div className='px-5 mt-3'>
                        <button className='btn btn-primary h-[20px] flex bg-[#219EBC] border-0'>
                            Create Appointment
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateAppointments
