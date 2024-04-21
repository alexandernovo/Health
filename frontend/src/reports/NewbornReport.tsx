import React, { useRef, useState, useEffect } from 'react'
import logoMaternal from '@assets/images/logo-maternal.png'
import logDepartment from '@assets/images/departmenthealth_logo.png'
import { NewBornModel } from '@/types/newBornType'
import axios from 'axios'
import { DateToString, StringToDate } from '@/utils/DateFunction'
import { DateTimeToString } from '@/utils/DateFunction'
import { PostPartrumModel } from '@/types/PostPartrum'
import ReactToPrint from "react-to-print";

interface NewbornReportProps {
    appointment_id?: string
}

const NewbornReport: React.FC<NewbornReportProps> = (props: NewbornReportProps) => {
    const [newborn, setNewBorn] = useState<NewBornModel>();
    const [postpartrum, setPosPartrum] = useState<PostPartrumModel[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const token: string | null = localStorage.getItem("token");

    useEffect(() => {
        fetchNewbornRecord();
    }, [])

    const fetchNewbornRecord = async () => {
        const response = await axios.get(`/api/newborn/getNewbornOneRecord/${props.appointment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status == "success") {
            setNewBorn(response.data.newborn);
            setPosPartrum(response.data.newborn.postpartrum);
            setLoading(false);
            console.log(postpartrum);
        }
    }
    const contentToPrint = useRef(null);
    return (
        <div >
            <div className='flex justify-center my-3'>
                <div className='w-[8.5in] flex justify-end'>
                    <ReactToPrint
                        trigger={() =>
                            <button className='btn btn-primary btn-sm text-white px-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
                                </svg>
                                Print
                            </button>
                        }
                        content={() => contentToPrint.current}
                    />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[8.5in] flex justify-end'>
                    <div className='flex justify-center'>
                        <div className='report-card border-[0.5px] w-[8.5in] bg-white p-5 pt-[30px] px-[40px] rounded-[4px] shadow-sm' ref={contentToPrint}>
                            <div className='flex justify-center items-center gap-5'>
                                <img src={logoMaternal} className='w-[70px] h-[70px]' />
                                <div className='text-center font-semibold'>
                                    <h1>BARBAZA RURAL HEALTH UNIT</h1>
                                    <h2>Barbaza, Antique</h2>
                                </div>
                                <img src={logDepartment} className='w-[70px] h-[70px]' />
                            </div>
                            <div className='bg-gray-700 text-center mt-[40px] py-1 text-white'>
                                <h1>NEWBORN DELIVERY RECORD</h1>
                            </div>

                            <div className='mt-[30px]'>
                                <div className='flex gap-1'>
                                    <div className='w-[50%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[95px]'>Infants Name:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{newborn?.infantsName}</span>
                                        </p>
                                    </div>
                                    <div className='w-[50%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[175px]'>Date and Time of Delivery:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{DateTimeToString(newborn?.dateTimeDelivery)}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-1 mt-5'>
                                    <div className='w-[20%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[30px]'>Sex:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{newborn?.infantsSex}</span>
                                        </p>
                                    </div>
                                    <div className='w-[40%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[100px]'>Length at Birth:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{newborn?.lengthAtBirth}</span>
                                        </p>
                                    </div>
                                    <div className='w-[40%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[50px]'>Weight:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{newborn?.infantWeight}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-1 mt-5'>
                                    <div className='w-[50%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[170px]'>Newborn Screening Code:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{newborn?.newBornScreeningCode}</span>
                                        </p>
                                    </div>
                                    <div className='w-[50%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[183px]'>Date of Newborn Screening:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{DateToString(newborn?.dateOfNewBornScreening)}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-1 mt-5'>
                                    <div className='w-[100%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[185px]'>Date and Time of Discharge:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{DateTimeToString(newborn?.dateAndTimeOfDischarge)}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-1 mt-5'>
                                    <div className='w-[50%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[90px]'>APGAR Score:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{newborn?.APGARScore}</span>
                                        </p>
                                    </div>
                                    <div className='w-[50%]'>
                                        <p className='text-[13px] flex w-[100%] gap-1 table'>
                                            <span className='table-cell w-[85px]'>Presentation:</span>
                                            <span className='table-cell border-b-[1px] border-black'>{newborn?.Presentation}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='bg-gray-700 text-center mt-[40px] py-1 text-white'>
                                    <h1>POST PARTRUM FOLLOW-UP</h1>
                                </div>
                                <table className="table border mt-5 mb-3">
                                    <thead>
                                        <tr className='text-center font-semibold text-[13px] text-black'>
                                            <th className='border font-semibold py-1'>DATE</th>
                                            <th className='border font-semibold py-1'>BODY <br></br> TEMPERATURE </th>
                                            <th className='border font-semibold py-1'>BP</th>
                                            <th className='border font-semibold py-1'>FUNDUS</th>
                                            <th className='border font-semibold py-1'>BREAST</th>
                                            <th className='border font-semibold py-1'>LOCHIA</th>
                                            <th className='border font-semibold py-1'>REMARKS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {postpartrum && postpartrum
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
                                                </tr>
                                            ))}
                                        {postpartrum && postpartrum.length == 0 && (
                                            <tr>
                                                <td colSpan={7}>
                                                    <p className='text-[12px] text-gray-400 text-center'>No Data</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div className='bg-gray-700 text-center mt-[30px] py-1 text-white'>
                                    <h1>PELVIC EXAMINATION</h1>
                                </div>

                                <div className='text-[13px] mt-3'>
                                    <p className='font-semibold'>UTERUS POSITION</p>
                                    <div className='flex gap-5 mt-2'>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="uterusPosition" value="ANTEFLEXED" checked={newborn?.uterusPosition === 'ANTEFLEXED'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">ANTEFLEXED</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="uterusPosition" value="RETROFLEXED" checked={newborn?.uterusPosition === 'RETROFLEXED'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">RETROFLEXED</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="uterusPosition" value="MIDPOSITION" checked={newborn?.uterusPosition === 'MIDPOSITION'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">MIDPOSITION</span>
                                        </label>
                                    </div>

                                    <p className='font-semibold mt-3'>SIZE</p>
                                    <div className='flex gap-5 mt-2'>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="size" value="SMALL" checked={newborn?.size === 'SMALL'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">SMALL</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="size" value="NORMAL" checked={newborn?.size === 'NORMAL'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">NORMAL</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="size" value="LARGE" checked={newborn?.size === 'LARGE'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">LARGE</span>
                                        </label>
                                    </div>

                                    <p className='font-semibold mt-3'>SHAPE</p>
                                    <div className='flex gap-5 mt-2'>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="shape" value="REGULAR" checked={newborn?.shape === 'REGULAR'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">REGULAR</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="shape" value="IRREGULAR" checked={newborn?.shape === 'IRREGULAR'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">IRREGULAR</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="shape" value="FIBROID" checked={newborn?.shape === 'FIBROID'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">FIBROID</span>
                                        </label>
                                    </div>

                                    <p className='font-semibold mt-3'>ADNEXAE</p>
                                    <div className='flex gap-5 mt-2'>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="adnexae" value="NORMAL" checked={newborn?.adnexae === 'NORMAL'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">NORMAL</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="adnexae" value="ENLARGE" checked={newborn?.adnexae === 'ENLARGE'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">ENLARGE</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="adnexae" value="TENDER" checked={newborn?.adnexae === 'TENDER'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">TENDER</span>
                                        </label>
                                    </div>

                                    <p className='font-semibold mt-3'>LACERATION</p>
                                    <div className='flex gap-5 mt-2'>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="laceration" value="YES" checked={newborn?.laceration === 'YES'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">YES</span>
                                        </label>
                                        <label className="items-center cursor-pointer flex gap-2">
                                            <input type="checkbox" name="laceration" value="NO" checked={newborn?.laceration === 'NO'} className="checkbox checkbox-default checkbox-xs" />
                                            <span className="label-text text-[13px]">NO</span>
                                        </label>
                                    </div>

                                    <p className='font-semibold mt-3'>DISCHARGE</p>
                                    <div className='flex gap-5 mt-2 items-center mb-4'>
                                        <div className='flex flex-col'>
                                            <div className='flex gap-5'>
                                                <label className="items-center cursor-pointer flex gap-2">
                                                    <input type="checkbox" name="discharge" value="YES" checked={newborn?.discharge === 'YES'} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[13px]">YES</span>
                                                </label>
                                                <label className="items-center cursor-pointer flex gap-2">
                                                    <input type="checkbox" name="discharge" value="NO" checked={newborn?.discharge === 'NO'} className="checkbox checkbox-default checkbox-xs" />
                                                    <span className="label-text text-[13px]">NO</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='flex w-[60%] flex-cp; items-center gap-2'>
                                            <label className='font-semibold text-[13px]'>If Yes, please specify:</label>
                                            <input type="text" placeholder="If Yes, please specify:" required={newborn?.discharge === 'YES'} disabled={newborn?.discharge === 'NO' || newborn?.discharge === '' || newborn?.discharge === null || newborn?.discharge === undefined} name='specify' value={newborn?.specify} className="input input-bordered input-sm flex-1" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewbornReport
