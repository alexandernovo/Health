import React, { useState, useEffect } from 'react'
import { UserModel } from '@/types/userType';
import { regions, getProvincesByRegion, getCityMunByProvince, getBarangayByMun } from 'phil-reg-prov-mun-brgy'
import Select from 'react-select';
interface HypertensivefilterProps {
    Toggle: () => void,
    Show: boolean;
    Filter: (user: UserModel) => void
}
const Hypertensivefilter: React.FC<HypertensivefilterProps> = (props: HypertensivefilterProps) => {
    const [brgyFiltered, setBrgyFiltered] = useState([]);
    const [provincesFiltered, setProvincesFiltered] = useState([]);
    const [municipalityFiltered, setMunicipalityFiltered] = useState([]);


    const [filter, setFilter] = useState<UserModel>({
        reg_code: '06',
        region: regions
            .filter((region: any) => region.reg_code === '06')
            .map((region: any) => region.name)[0],
        prov_code: '0606',
        mun_code: '060602',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFilter(prevState => ({
            ...prevState,
            [name as keyof UserModel]: value
        })
        );
    };
    useEffect(() => {
        const filteredProvinces = getProvincesByRegion(filter.reg_code);
        const filteredMunicipalities = getCityMunByProvince(filter.prov_code);
        const filteredBrgy = getBarangayByMun(filter.mun_code);

        setProvincesFiltered(filteredProvinces);
        setMunicipalityFiltered(filteredMunicipalities);
        setBrgyFiltered(filteredBrgy);
    }, [filter.reg_code, filter.prov_code, filter.mun_code]);

    useEffect(() => {
        const selectedProvince: any = provincesFiltered.find((province: any) => province.prov_code === filter.prov_code);
        if (selectedProvince) {
            setFilter(prevState => ({
                ...prevState,
                province: selectedProvince.name,
            }));
        }
    }, [filter.prov_code, provincesFiltered]);

    useEffect(() => {
        const selectedMunicipality: any = municipalityFiltered.find((mun: any) => mun.mun_code === filter.mun_code);
        if (selectedMunicipality) {
            setFilter(prevState => ({
                ...prevState,
                municipality: selectedMunicipality.name,
            }));
        }
    }, [filter.mun_code, municipalityFiltered]);
    const handleSelectChangeRegion = (selectedOption: any) => {
        const { label, value } = selectedOption;
        setFilter(prevState => ({
            ...prevState,
            region: label,
            reg_code: value,
            prov_code: '',
            province: '',
            mun_code: '',
            municipality: '',
            brgy: ''
        }));
    }
    const handleSelectChangeProvince = (selectedOption: any) => {
        const { label, value } = selectedOption;
        setFilter(prevState => ({
            ...prevState,
            province: label,
            prov_code: value,
            mun_code: '',
            municipality: '',
            brgy: ''
        }));
    }
    const handleSelectChangeMunicipality = (selectedOption: any) => {
        const { label, value } = selectedOption;
        setFilter(prevState => ({
            ...prevState,
            municipality: label,
            mun_code: value,
            brgy: ''
        }));
    }
    const handleSelectChangeBrgy = (selectedOption: any) => {
        const { label } = selectedOption;
        setFilter(prevState => ({
            ...prevState,
            brgy: label,
        }));
    }
    return (
        <dialog className={`modal ${props.Show && 'modal-open'}`} >
            <div className="modal-box rounded-md p-0 overflow-hidden">
                <div className='bg-[#219EBC] p-4 px-5 sticky top-0 z-10 text-white flex justify-between'>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                        </svg>
                        Filter Hypertensive/Diabetic Records
                    </h3>
                    <button className="btn btn-ghost btn-sm rounded-full p-1" onClick={() => props.Toggle()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className='modal-body px-5 pt-4 max-h-[96vh] pb-[90px] overflow-scroll'>
                    <div className='w-full mx-auto h-full pb-[60px]'>
                        <div className='w-full flex flex-col items-center'>
                            <div className='md:w-full lg:w-full'>
                                <Select
                                    className="basic-single w-full h-[45px] mt-2 hidden"
                                    classNamePrefix="select"
                                    placeholder="Select Region"
                                    onChange={handleSelectChangeRegion}
                                    name='region'
                                    value={{ value: filter.reg_code, label: filter.region }}
                                    options={regions.map((region: any) => ({ value: region.reg_code, label: region.name }))}
                                />

                                <Select
                                    className="basic-single w-full h-[45px] mt-3 hidden"
                                    classNamePrefix="select"
                                    placeholder="Select Province"
                                    onChange={handleSelectChangeProvince}
                                    name='province'
                                    value={{ value: filter.prov_code, label: filter.province }}
                                    options={provincesFiltered.map((province: any) => ({ value: province.prov_code, label: province.name }))}
                                />

                                <Select
                                    className="basic-single w-full h-[45px] mt-3 hidden"
                                    classNamePrefix="select"
                                    placeholder="Select Municipality"
                                    onChange={handleSelectChangeMunicipality}
                                    name='province'
                                    value={{ value: filter.mun_code, label: filter.municipality }}
                                    options={municipalityFiltered.map((municipality: any) => ({ value: municipality.mun_code, label: municipality.name }))}
                                />

                                {/* <Select
                                    className="basic-single w-full h-[45px] mt-3"
                                    classNamePrefix="select"
                                    placeholder="Select Baranggay"
                                    onChange={handleSelectChangeBrgy}
                                    name='municipality'
                                    options={brgyFiltered.map((brgy: any) => ({ value: brgy.mun_code, label: brgy.name }))}
                                /> */}
                                <label className='text-[13px] font-semibold mb-0 mt-3'>Baranggay</label>
                                <select name="brgy" value={filter.brgy} onChange={handleChange} className="select select-bordered select-md w-full ">
                                    <option value="Capoyuan" selected={filter.brgy === "Capoyuan"}>Capoyuan</option>
                                    <option value="Palma" selected={filter.brgy === "Palma"}>Palma</option>
                                    <option value="Igpalge" selected={filter.brgy === "Igpalge"}>Igpalge</option>
                                </select>
                                <div className='w-full mt-3'>
                                    <div className='flex flex-col w-full'>
                                        <label className='font-semibold text-[14px]'>Date From:</label>
                                        <input type="date" value={filter.dateFrom} onChange={handleChange} name='dateFrom' className="input input-bordered w-full" />
                                    </div>
                                </div>
                                <div className='w-full mt-3'>
                                    <div className='flex flex-col w-full'>
                                        <label className='font-semibold text-[14px]'>Date To:</label>
                                        <input value={filter.dateTo} onChange={handleChange} type="date" name='dateTo' className="input input-bordered w-full" />
                                    </div>
                                </div>
                                <button className='btn btn-primary mt-5 w-full py-2' onClick={() => props.Filter(filter)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                    </svg>
                                    Generate Hypertensive / Diabetic Records
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Hypertensivefilter
