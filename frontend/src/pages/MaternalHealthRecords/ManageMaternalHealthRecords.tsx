import React, { useState } from 'react'

const ManageMaternalHealthRecords: React.FC = () => {

    const [checkboxes, setCheckboxes] = useState({
        PTB: false,
        HeartDisease: false,
        Diabetes: false,
        Asthma: false,
        Goiter: false
    });

    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setCheckboxes(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    return (
        <div className='m-3'>
            <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
                <div className="card-body p-0">
                    <div className='flex justify-between p-4 px-5'>
                        <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                            </svg>
                            Maternal Health Record
                        </h1>
                    </div>
                    <div className="overflow-x-auto px-5 pb-[30px] h-[73vh] w-full mt-3">
                        <h1 className='font-bold mb-4'>1. General Data</h1>
                        <div className='flex justify-between gap-4'>
                            <div className='w-1/3'>
                                <div className='flex flex-col w-full'>
                                    <label className='font-semibold text-[14px]'>Patient Name</label>
                                    <input type="text" placeholder="Patient Name" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px] w-full'>Date of Birth</label>
                                    <input type="text" placeholder="Date of Birth" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Patient Age</label>
                                    <input type="text" placeholder="Age" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 justify-between gap-4'>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Address</label>
                                    <input type="text" placeholder="Address" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Education</label>
                                    <input type="text" placeholder="Education" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Occupation</label>
                                    <input type="text" placeholder="Occupation" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 gap-4'>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Husband</label>
                                    <input type="text" placeholder="Husband's name" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Date of Birth</label>
                                    <input type="text" placeholder="Education" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Age</label>
                                    <input type="text" placeholder="Age" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 w-full gap-5'>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Date of Marriage</label>
                                    <input type="text" placeholder="Date of Marriage" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Religion</label>
                                    <input type="text" placeholder="Religion" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 gap-5'>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Date Admitted</label>
                                    <input type="text" placeholder="Husband's name" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Date Discharge</label>
                                    <input type="text" placeholder="Education" className="input input-bordered w-full" />
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold mb-4 mt-5'>2. Medical History</h1>

                        <div className='ml-3'>
                            <h2 className='font-semibold text-[14px]'>1. Past History (Please Check)</h2>

                            <div className='flex w-1/2 justify-between'>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="PTB" checked={checkboxes.PTB} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">PTB</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="HeartDisease" checked={checkboxes.HeartDisease} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Heart Disease</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Diabetes" checked={checkboxes.Diabetes} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Asthma</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Goiter" checked={checkboxes.Goiter} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Goiter</span>
                                    </label>
                                </div>
                            </div>
                            <h2 className='font-semibold text-[14px] mt-2'>2. Family History (Please Check)</h2>
                            <div className='flex w-1/2 justify-between'>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <span className="label-text text-[13px]">PTB</span>
                                        <input type="checkbox" name="PTB" checked={checkboxes.PTB} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="HeartDisease" checked={checkboxes.HeartDisease} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Heart Disease</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Diabetes" checked={checkboxes.Diabetes} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Diabetes</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Hypertension</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Goiter" checked={checkboxes.Goiter} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">Goiter</span>
                                    </label>
                                </div>
                            </div>
                            <h2 className='font-semibold text-[14px] mt-2'>3. Menstrual History</h2>
                            <div className='flex gap-3'>
                                <div className='flex flex-col mt-2 w-1/4'>
                                    <label className='font-semibold text-[12px]'>LMP (Last Menstrual Period)</label>
                                    <input type="date" placeholder="LMP" className="input input-bordered w-full input-sm" />
                                </div>
                                <div className='flex flex-col mt-2 w-1/4'>
                                    <label className='font-semibold text-[12px]'>EDC (Estimated Date of Confinement)</label>
                                    <input type="date" placeholder="LMP" className="input input-bordered w-full input-sm" />
                                </div>
                                <div className='flex flex-col mt-2 w-1/4'>
                                    <label className='font-semibold text-[12px]'>GRAVIDA</label>
                                    <input type="text" placeholder="GRAVIDA" className="input input-bordered w-full input-sm" />
                                </div>
                                <div className='flex flex-col mt-2 w-1/4'>
                                    <label className='font-semibold text-[12px]'>PARA</label>
                                    <input type="number" placeholder="PARA" className="input input-bordered w-full input-sm" />
                                </div>
                            </div>
                            <h2 className='font-semibold text-[14px] mt-4'>OB GYNE HISTORY</h2>
                            <div className='flex w-1/3 justify-between items-center'>
                                <label className='text-[12px]'>OB SCORE</label>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="HeartDisease" checked={checkboxes.HeartDisease} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">F</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Diabetes" checked={checkboxes.Diabetes} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">P</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">A</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer flex gap-2">
                                        <input type="checkbox" name="Goiter" checked={checkboxes.Goiter} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                        <span className="label-text text-[13px]">L</span>
                                    </label>
                                </div>
                            </div>
                            <h2 className='font-semibold text-[14px] mt-3'>RISK FACTOR</h2>
                            <div className='flex'>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="HeartDisease" checked={checkboxes.HeartDisease} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Below 18 - above 35 yrs.</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Diabetes" checked={checkboxes.Diabetes} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Pregnancy more than 4</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Poor Obstetrical Condition</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="HeartDisease" checked={checkboxes.HeartDisease} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Below 2 yrs. Birth Interval</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Diabetes" checked={checkboxes.Diabetes} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Less Than 145 cm. Height</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">More than 145 cm. Height</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex '>
                                <h2 className='font-semibold text-[13px] mt-3 w-1/3'>Present S/s</h2>
                                <h2 className='font-semibold text-[14px] mt-3 w-1/3'>TETANUS TOXOID IMMUNIZATION</h2>
                            </div>
                            <div className='flex'>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="HeartDisease" checked={checkboxes.HeartDisease} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Ante and post partrum hemmorrhage.</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Diabetes" checked={checkboxes.Diabetes} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Premature labor</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Abnormal Presentation</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Pre Enclampsia</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">STD</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='w-1/3'>
                                    <div className="form-control my-1">
                                        <label className="cursor-pointer flex gap-2 items-center">
                                            <input type="checkbox" name="HeartDisease" checked={checkboxes.HeartDisease} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT1</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Diabetes" checked={checkboxes.Diabetes} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT2</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT3</span>
                                        </label>
                                    </div>
                                    <div className="form-control mb-1">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT4</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="Asthma" checked={checkboxes.Asthma} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">TT5</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <h1 className='font-semibold text-[15px] mt-3'>MEDICAL ASSESSMENTS</h1>
                            <table className="table table-bordered border mt-1">
                                <thead>
                                    <tr>
                                        <th className="font-semibold text-black">Date</th>
                                        <th className="font-semibold text-black">B/P</th>
                                        <th className="font-semibold text-black">WT.</th>
                                        <th className="font-semibold text-black">HR</th>
                                        <th className="font-semibold text-black">RR</th>
                                        <th className="font-semibold text-black">TEMP</th>
                                        <th className="font-semibold text-black">AOG</th>
                                        <th className="font-semibold text-black">FH</th>
                                        <th className="font-semibold text-black">FHB Pres.</th>
                                        <th className="font-semibold text-black">REMARKS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tbody>
                            </table>
                            <div className='border p-3 mt-3 rounded-md mb-3'>
                                <h1 className='font-semibold text-[15px] mt-3 mb-2'>MEDICAL ASSESSMENTS FORM</h1>
                                <div className='flex gap-3'>
                                    <div className='w-1/3'>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Date</label>
                                            <input type="date" placeholder="Type here" className="input w-full input-bordered input-sm" />
                                        </div>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Heart Rate(HR)</label>
                                            <input type="text" placeholder="Heart Rate" className="input w-full input-bordered input-sm" />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='font-semibold text-[14px]'>Age of Gestation (AOG)</label>
                                            <input type="number" placeholder="AOG" className="input w-full input-bordered input-sm" />
                                        </div>
                                    </div>
                                    <div className='w-1/3'>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Blood Pressure (BP)</label>
                                            <input type="string" placeholder="Blood Pressure" className="input w-full input-bordered input-sm" />
                                        </div>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Respiratory Rate(RR)</label>
                                            <input type="text" placeholder="Respiratory Rate" className="input w-full input-bordered input-sm" />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='font-semibold text-[14px]'>Fundal Height(FH)</label>
                                            <input type="number" placeholder="Fundal Height" step={0.01} className="input w-full input-bordered input-sm" />
                                        </div>
                                    </div>
                                    <div className='w-1/3'>
                                        <div className='flex flex-col mb-1'>
                                            <label className='font-semibold text-[14px]'>Weight (WT)</label>
                                            <input type="number" placeholder="Weight" step={0.01} className="input w-full input-bordered input-sm" />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='font-semibold text-[14px]'>Temperature (TEMP)</label>
                                            <input type="number" placeholder="Temperature" step={0.01} className="input w-full input-bordered input-sm" />
                                        </div>
                                        <label className="cursor-pointer flex gap-2 items-center items-end mt-[30px]">
                                            <input type="checkbox" name="HeartDisease" checked={checkboxes.HeartDisease} onChange={handleCheckboxChange} className="checkbox checkbox-primary checkbox-xs" />
                                            <span className="label-text text-[13px]">Fetal Heartbeat Present (FHB Pres.)</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='mt-2 flex flex-col'>
                                    <label className='font-semibold text-[14px]'>Remarks</label>
                                    <textarea className="textarea textarea-bordered w-full" placeholder="Remarks"></textarea>
                                </div>
                                <button className="btn btn-sm btn-primary btn-outline mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                    </svg>
                                    Add
                                </button>
                            </div>
                            <div className='flex justify-end'>
                                <button className="btn btn-sm btn-primary mt-2 text-white">Save Medical Health Record</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageMaternalHealthRecords
