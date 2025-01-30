import React, { useState, useEffect, useRef } from 'react'
import { Immunization, ImmunizationInitialValue } from '@/types/Immunization';
import { ImmunizationResult } from '@/types/immunizationResult';
import ReactToPrint from "react-to-print";
import { AppointmentModel } from '@/types/appointmentType';
import logoMaternal from '@assets/images/logo-maternal.png'
import logDepartment from '@assets/images/departmenthealth_logo.png'
import axios from 'axios';
import { DateToString, calculateAge } from '@/utils/DateFunction';
import { getMiddleInitial } from '@/utils/CommonFunctions';

interface ImmunizationReportProps {
  appointment_id?: string
}

export const ImmunizationReport: React.FC<ImmunizationReportProps> = ({ appointment_id }: ImmunizationReportProps) => {
  const [immunization, setImmunization] = useState<Immunization>(ImmunizationInitialValue);
  const [immunizationResultList, setImmunizationResultList] = useState<ImmunizationResult[]>([]);
  const token: string | null = localStorage.getItem("token");
  const [appointment, setAppointment] = useState<AppointmentModel>({});
  const contentToPrint = useRef(null);

  useEffect(() => {
    fetchImmunizationData();
    fetchAppointmentDetails();
  }, [])

  const fetchImmunizationData = async () => {
    const response = await axios.get(`/api/immunization/getImmunizationOneRecord/${appointment_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.data.status = "success") {
      setImmunization(response.data.immunization);
      setImmunizationResultList(response.data.immunization.immunization_result);
    }
  }
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
  return (
    <>
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
      <div className='flex justify-center my-3 mb-5'>
        <div className='report-card border-[0.5px] w-[8.5in] bg-white p-5 pt-[30px] px-[40px] rounded-[4px] shadow-sm mb-3' ref={contentToPrint}>
          <div className='flex justify-center items-center gap-5'>
            <img src={logoMaternal} className='w-[70px] h-[70px]' />
            <div className='text-center font-semibold'>
              <h1>BARBAZA RURAL HEALTH UNIT</h1>
              <h2>Barbaza, Antique</h2>
            </div>
            <img src={logDepartment} className='w-[70px] h-[70px]' />
          </div>
          <div className='bg-gray-700 text-center mt-[40px] py-1 text-white'>
            <h1>IMMUNIZATION RECORD</h1>
          </div>

          <div className='mt-4'>
            <div className='flex gap-3'>
              <p className='text-[11px] flex flex-col w-[30%]  font-semibold gap-1 table'>
                <span className='table-cell w-[40px]'>Name:</span>
                <span className='table-cell border-b-[1px] font-semibold border-black'>{appointment.firstname} {getMiddleInitial(appointment.middlename || '')} {appointment.lastname} {appointment.extension || ''}</span>
              </p>
              <p className='text-[11px] flex flex-col w-[30%]  font-semibold gap-1 table'>
                <span className='table-cell w-[60px]'>Birthdate:</span>
                <span className='table-cell border-b-[1px] font-semibold border-black'>{DateToString(appointment.birthdate)}</span>
              </p>
              <p className='text-[11px] flex flex-col w-[15%]  font-semibold gap-1 table'>
                <span className='table-cell w-[30px]'>Age:</span>
                <span className='table-cell border-b-[1px] font-semibold border-black'>{calculateAge(appointment.birthdate)}</span>
              </p>
            </div>
          </div>
          <div className='flex text-[11px]'>
            <div className='mt-4 w-[50%] pr-5'>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="VitK" checked={immunization.VitK} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">VIT. K</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="eyeOintment" checked={immunization.eyeOintment} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">EYE OINTMENT</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="hepaAtBirth" checked={immunization.hepaAtBirth} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">HEPA AT BIRTH</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="BCG" checked={immunization.BCG} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">BCG</span>
                </label>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="Penta1" checked={immunization.Penta1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PENTA1</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="Penta2" checked={immunization.Penta2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PENTA2</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="Penta3" checked={immunization.Penta3} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PENTA3</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="opv1" checked={immunization.opv1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">OPV1</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="opv2" checked={immunization.opv2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">OPV2</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="opv3" checked={immunization.opv3} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">OPV3</span>
                  </label>
                </div>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="ipv" checked={immunization.ipv} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">IPV</span>
                </label>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pcv1" checked={immunization.pcv1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PCV1</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pcv2" checked={immunization.pcv2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PCV2</span>
                  </label>
                </div>
                <div className="form-control flex-1">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pcv3" checked={immunization.pcv3} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PCV3</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="mv0" checked={immunization.mv0} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">MV0</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="mv1" checked={immunization.mv1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">MV1</span>
                  </label>
                </div>
                <div className="form-control flex-1">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="mv2" checked={immunization.mv2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">MV2</span>
                  </label>
                </div>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="fic" checked={immunization.fic} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">FIC</span>
                </label>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[40%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="grade1Td" checked={immunization.grade1Td} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">GRADE 1 TD</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="MR" checked={immunization.MR} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">MR</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[40%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="grade4Hpv1" checked={immunization.grade4Hpv1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">GRADE IV HPV 1</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="hpv2" checked={immunization.hpv2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">HPV 2</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[40%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="grade7Td" checked={immunization.grade7Td} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">GRADE 7 TD</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pneumonia1" checked={immunization.pneumonia1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PNEUMONIA1</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pneumonia2" checked={immunization.pneumonia2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PNEUMONIA2</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pneumonia3" checked={immunization.pneumonia3} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PNEUMONIA3</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pneumonia4" checked={immunization.pneumonia4} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">PNEUMONIA4</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu1" checked={immunization.flu1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">FLU1</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu2" checked={immunization.flu2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">FLU2</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu3" checked={immunization.flu3} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">FLU3</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu4" checked={immunization.flu4} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">FLU4</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu5" checked={immunization.flu5} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">FLU5</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt1" checked={immunization.tt1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">TT1</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt2" checked={immunization.tt2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">TT2</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt3" checked={immunization.tt3} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">TT3</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt4" checked={immunization.tt4} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">TT4</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt5" checked={immunization.tt5} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">TT5</span>
                  </label>
                </div>
              </div>

              <div className='flex gap-4 items-center'>
                <label className='text-[11px] font-semibold'>RABIES IMMUNIZATION</label>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="rabiesImmunization1" checked={immunization.rabiesImmunization1} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">1</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="rabiesImmunization2" checked={immunization.rabiesImmunization2} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">2</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="rabiesImmunization3" checked={immunization.rabiesImmunization3} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">3</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="rabiesImmunization4" checked={immunization.rabiesImmunization4} className="checkbox checbox-default checkbox-xs" />
                    <span className="label-text text-[11px]">4</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='w-[50%] mt-4'>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="initiatedBreastFeeding" checked={immunization.initiatedBreastFeeding} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Initiated Breast Feeding</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="mixedFeeding" checked={immunization.mixedFeeding} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Mixed Feeding</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="initiatedComplementaryFeeding" checked={immunization.initiatedComplementaryFeeding} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Initiated Complementary Meeting</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="vitAat6To11Mos" checked={immunization.vitAat6To11Mos} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Vit. A at 6 to 11 mos.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="vitAat12To59Mos" checked={immunization.vitAat12To59Mos} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Vit. A at 12 to 59 mos.</span>
                </label>
              </div>
              <div className="form-control mt-4">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="deworming12To23Mos" checked={immunization.deworming12To23Mos} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Deworming 12-23 mos.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="deworming24To59Mos" checked={immunization.deworming24To59Mos} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Deworming 24-59 mos.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="deworming5To9YO" checked={immunization.deworming5To9YO} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Deworming 5-9 y.o.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="deworming10To19YO" checked={immunization.deworming10To19YO} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Deworming 10-19 y.o.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="ferrousSulfate" checked={immunization.ferrousSulfate} className="checkbox checbox-default checkbox-xs" />
                  <span className="label-text text-[11px]">Ferrous Sulfate Drops 1mos. 3mos.</span>
                </label>
              </div>
            </div>

          </div>
          <div className='mb-2 mt-4'>
            <table className='w-[80%] border'>
              <thead>
                <tr>
                  <th className='text-start p-2 border text-[13px] font-semibold border-black'>Age in Months</th>
                  <th className='text-start p-2 border text-[13px] font-semibold border-black'>WEIGHT A</th>
                  <th className='text-start p-2 border text-[13px] font-semibold border-black'>WEIGHT B</th>
                </tr>
              </thead>
              <tbody>
                {immunizationResultList.map(md => (
                  <tr key={md.keyId}>
                    <td className='text-start p-2 border text-[13px] font-semibold border-black'>{md.ageInMos}</td>
                    <td className='text-start p-2 border text-[13px] font-semibold border-black'>{md.weightA}</td>
                    <td className='text-start p-2 border text-[13px] font-semibold border-black'>{md.weightN}</td>
                  </tr>
                ))}
                {immunizationResultList.length == 0 && (
                  <tr className='border border-black'>
                    <td colSpan={3}>
                      <p className='text-[12px] text-gray-400 text-center'>No Data</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
