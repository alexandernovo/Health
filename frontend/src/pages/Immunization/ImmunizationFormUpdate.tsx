import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AppointmentModel } from '@/types/appointmentType';
import { DateToString, calculateAge } from '@/utils/DateFunction';
import { Immunization, ImmunizationInitialValue } from '@/types/Immunization';
import { ImmunizationResult, ImmunizationResultInitialValue } from '@/types/immunizationResult';
import { generateRandomId, getMiddleInitial } from '@/utils/CommonFunctions';
import { useDispatch } from 'react-redux';
import { setToastState } from '@/store/common/global';
import axios from 'axios';

const ImmunizationFormUpdate: React.FC = () => {
  const { appointment_id } = useParams<{ appointment_id: string }>();
  const [appointment, setAppointment] = useState<AppointmentModel>({});
  const token: string | null = localStorage.getItem("token");
  const [immunization, setImmunization] = useState<Immunization>(ImmunizationInitialValue);
  const [immunizationResult, setImmunizationResult] = useState<ImmunizationResult>(ImmunizationResultInitialValue);
  const [immunizationResultList, setImmunizationResultList] = useState<ImmunizationResult[]>([]);
  const [removeImmunizationResultList, setRemoveImmunizationResultList] = useState<ImmunizationResult[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentDetails();
    fetchImmunizationData();
  }, []);

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

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type == "checkbox") {
      setImmunization(prevState => {
        const prevValue = prevState[name as keyof Immunization]; // Type assertion to keyof HypertensiveModel
        return {
          ...prevState,
          [name]: !prevValue
        };
      });
    }
    else {
      setImmunization(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleInputChangeResult = (e: any) => {
    const { name, value } = e.target;
    setImmunizationResult(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addForm = () => {
    immunizationResult.keyId = generateRandomId();
    immunizationResult.immunizationResultId = 0;
    immunizationResult.immunizationId = immunization.immunizationId;
    setImmunizationResultList(prevState => {
      return [...prevState, immunizationResult];
    });
    setImmunizationResult(ImmunizationResultInitialValue);
  }

  const updateImmunization = async () => {
    immunization.immunizationResult = immunizationResultList;
    immunization.removeImmunizationResult = removeImmunizationResultList;
    immunization.user_id = appointment.user_id;
    if (appointment_id != null) {
      immunization.appointment_id = appointment_id;
    }
    const response = await axios.put("/api/immunization/updateImmunization", immunization, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data.status == "success") {
      dispatch(setToastState({ toast: true, toastMessage: "Immunization Record Update Successfully", toastSuccess: true }));
      navigate(`/immunization_record/${appointment.user_id}`);
    }
  }

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

  const removeResult = (keyIdToRemove?: string) => {
    const indexToRemove = immunizationResultList.findIndex((item) => item.keyId == keyIdToRemove);
    if (indexToRemove !== -1) {
      const resultToremove = immunizationResultList[indexToRemove];
      if (resultToremove.immunizationId != 0) {
        setRemoveImmunizationResultList((prev) => [...prev, resultToremove]);
      }
      const updatedAssessment = [...immunizationResultList];
      updatedAssessment.splice(indexToRemove, 1);
      setImmunizationResultList(updatedAssessment);
    }
  };
  return (
    <div className='m-3'>
      <div className="card border border-gray-100 rounded-md bg-base-100 shadow-md mb-3">
        <div className="card-body p-0">
          <div className='flex justify-between p-4 px-5 pb-0'>
            <h1 className='flex text-[20px] items-center gap-1 font-semibold'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
              </svg>
              Immunization Record
            </h1>
          </div>
          <div className='flex px-5 gap-2 mt-4'>
            <div className='w-1/3'>
              <div className='flex flex-col w-full'>
                <label className='font-semibold text-[14px]'>Patient Name</label>
                <input type="text" readOnly value={`${appointment.firstname} ${getMiddleInitial(appointment.middlename || '')} ${appointment.lastname} ${appointment.extension || ''}`} placeholder="Patient Name" className="input input-bordered w-full" />
              </div>
            </div>
            <div className='w-1/3'>
              <div className='flex flex-col w-full'>
                <label className='font-semibold text-[14px]'>Date of Birth</label>
                <input type="text" readOnly value={DateToString(appointment.birthdate)} placeholder="Patient Name" className="input input-bordered w-full" />
              </div>
            </div>
            <div className='w-1/3'>
              <div className='flex flex-col w-full'>
                <label className='font-semibold text-[14px]'>Age</label>
                <input type="text" readOnly value={calculateAge(appointment.birthdate)} placeholder="Patient Name" className="input input-bordered w-full" />
              </div>
            </div>
          </div>
          <div className='p-4 px-5 pt-1 flex'>
            <div className='w-[50%] pr-5'>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="VitK" checked={immunization.VitK} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">VIT. K</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="eyeOintment" checked={immunization.eyeOintment} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">EYE OINTMENT</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="hepaAtBirth" checked={immunization.hepaAtBirth} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">HEPA AT BIRTH</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="BCG" checked={immunization.BCG} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">BCG</span>
                </label>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="Penta1" checked={immunization.Penta1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PENTA1</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="Penta2" checked={immunization.Penta2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PENTA2</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="Penta3" checked={immunization.Penta3} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PENTA3</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="opv1" checked={immunization.opv1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">OPV1</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="opv2" checked={immunization.opv2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">OPV2</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="opv3" checked={immunization.opv3} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">OPV3</span>
                  </label>
                </div>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="ipv" checked={immunization.ipv} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">IPV</span>
                </label>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pcv1" checked={immunization.pcv1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PCV1</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pcv2" checked={immunization.pcv2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PCV2</span>
                  </label>
                </div>
                <div className="form-control flex-1">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pcv3" checked={immunization.pcv3} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PCV3</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="mv0" checked={immunization.mv0} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">MV0</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="mv1" checked={immunization.mv1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">MV1</span>
                  </label>
                </div>
                <div className="form-control flex-1">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="mv2" checked={immunization.mv2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">MV2</span>
                  </label>
                </div>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="fic" checked={immunization.fic} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">FIC</span>
                </label>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[40%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="grade1Td" checked={immunization.grade1Td} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">GRADE 1 TD</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="MR" checked={immunization.MR} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">MR</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[40%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="grade4Hpv1" checked={immunization.grade4Hpv1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">GRADE IV HPV 1</span>
                  </label>
                </div>
                <div className="form-control w-[30%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="hpv2" checked={immunization.hpv2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">HPV 2</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className="form-control w-[40%]">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="grade7Td" checked={immunization.grade7Td} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">GRADE 7 TD</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pneumonia1" checked={immunization.pneumonia1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PNEUMONIA1</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pneumonia2" checked={immunization.pneumonia2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PNEUMONIA2</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pneumonia3" checked={immunization.pneumonia3} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PNEUMONIA3</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="pneumonia4" checked={immunization.pneumonia4} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">PNEUMONIA4</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu1" checked={immunization.flu1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">FLU1</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu2" checked={immunization.flu2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">FLU2</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu3" checked={immunization.flu3} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">FLU3</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu4" checked={immunization.flu4} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">FLU4</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="flu5" checked={immunization.flu5} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">FLU5</span>
                  </label>
                </div>
              </div>
              <div className='flex gap-4 justify-between'>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt1" checked={immunization.tt1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">TT1</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt2" checked={immunization.tt2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">TT2</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt3" checked={immunization.tt3} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">TT3</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt4" checked={immunization.tt4} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">TT4</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="tt5" checked={immunization.tt5} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">TT5</span>
                  </label>
                </div>
              </div>

              <div className='flex gap-4 items-center'>
                <label className='text-[13px] font-semibold'>RABIES IMMUNIZATION</label>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="rabiesImmunization1" checked={immunization.rabiesImmunization1} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">1</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="rabiesImmunization2" checked={immunization.rabiesImmunization2} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">2</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="rabiesImmunization3" checked={immunization.rabiesImmunization3} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">3</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex gap-2 justify-start">
                    <input type="checkbox" name="rabiesImmunization4" checked={immunization.rabiesImmunization4} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                    <span className="label-text text-[13px]">4</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='w-[50%] pl-4'>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="initiatedBreastFeeding" checked={immunization.initiatedBreastFeeding} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Initiated Breast Feeding</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="mixedFeeding" checked={immunization.mixedFeeding} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Mixed Feeding</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="initiatedComplementaryFeeding" checked={immunization.initiatedComplementaryFeeding} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Initiated Complementary Meeting</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="vitAat6To11Mos" checked={immunization.vitAat6To11Mos} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Vit. A at 6 to 11 mos.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="vitAat12To59Mos" checked={immunization.vitAat12To59Mos} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Vit. A at 12 to 59 mos.</span>
                </label>
              </div>
              <div className="form-control mt-4">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="deworming12To23Mos" checked={immunization.deworming12To23Mos} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Deworming 12-23 mos.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="deworming24To59Mos" checked={immunization.deworming24To59Mos} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Deworming 24-59 mos.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="deworming5To9YO" checked={immunization.deworming5To9YO} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Deworming 5-9 y.o.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="deworming10To19YO" checked={immunization.deworming10To19YO} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Deworming 10-19 y.o.</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-2 justify-start">
                  <input type="checkbox" name="ferrousSulfate" checked={immunization.ferrousSulfate} onChange={handleInputChange} className="checkbox checkbox-primary checkbox-xs" />
                  <span className="label-text text-[13px]">Ferrous Sulfate Drops 1mos. 3mos.</span>
                </label>
              </div>
            </div>
          </div>
          <div className='px-5 mb-2'>
            <table className='w-[80%] border'>
              <thead>
                <tr>
                  <th className='text-start p-2 border text-[13px] font-semibold border-black'>Age in Months</th>
                  <th className='text-start p-2 border text-[13px] font-semibold border-black'>WEIGHT A</th>
                  <th className='text-start p-2 border text-[13px] font-semibold border-black'>WEIGHT B</th>
                  <th className='text-start p-2 border text-[13px] font-semibold border-black'></th>
                </tr>
              </thead>
              <tbody>
                {immunizationResultList.map(md => (
                  <tr key={md.keyId}>
                    <td className='text-start p-2 border text-[13px] font-semibold border-black'>{md.ageInMos}</td>
                    <td className='text-start p-2 border text-[13px] font-semibold border-black'>{md.weightA}</td>
                    <td className='text-start p-2 border text-[13px] font-semibold border-black'>{md.weightN}</td>
                    <td className='border border-r-1 border-black text-black text-center'>
                      <div className='flex justify-center items-center'>
                        <button onClick={() => removeResult(md.keyId)} className='btn btn-ghost rounded-full px-3 active:bg-red-400 hover:bg-red-300'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 active:text-white ">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
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
          <div className='border p-4 rounded mx-5 mb-5 w-[77.4%] shadow'>
            <div className='flex gap-4'>
              <div className='w-1/3'>
                <div className='flex flex-col w-full'>
                  <label className='font-semibold text-[14px]'>Age in Months</label>
                  <input type="number" name='ageInMos' value={immunizationResult?.ageInMos} onChange={handleInputChangeResult} className="input input-bordered input-xs w-full" />
                </div>
              </div>
              <div className='w-1/3'>
                <div className='flex flex-col w-full'>
                  <label className='font-semibold text-[14px]'>Weight A</label>
                  <input name='weightA' value={immunizationResult?.weightA} onChange={handleInputChangeResult} type="number" className="input input-bordered input-xs w-full" />
                </div>
              </div>
              <div className='w-1/3'>
                <div className='flex flex-col w-full'>
                  <label className='font-semibold text-[14px]'>Weight B</label>
                  <input type="number" name='weightN' value={immunizationResult?.weightN} onChange={handleInputChangeResult} className="input input-bordered input-xs w-full" />
                </div>
              </div>
            </div>
            <button onClick={addForm} className="btn btn-sm btn-primary btn-outline mt-4" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
              </svg>
              Add
            </button>
          </div>
        </div>
        <div className='flex justify-end mr-3 mb-4'>
          <button onClick={() => updateImmunization()} className="btn btn-sm btn-primary mt-2 text-white">Save Immunization Record</button>
        </div>
      </div>
    </div>
  )
}
export default ImmunizationFormUpdate;