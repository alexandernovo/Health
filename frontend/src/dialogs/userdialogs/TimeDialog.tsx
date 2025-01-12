import { AppointmentModel } from '@/types/appointmentType';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface TimeDialogProps {
    appointmentDate?: string;
    Toggle: boolean;
    SetToggle: () => void;
    SetTime: (time: string) => void;
}

const TimeDialog: React.FC<TimeDialogProps> = (props: TimeDialogProps) => {
    const token: string | null = localStorage.getItem("token");
    const [timeAvail, setTimeAvail] = useState<AppointmentModel[]>([])
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        const getAppointmentDate = async () => {
            const response = await axios.post("/api/appointment/getAppointmentSchedByDate", { appointmentDate: props.appointmentDate }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status == "success") {
                setTimeAvail(response.data.time);
            }
        }
        setSelectedTime("");
        getAppointmentDate();
    }, [props.appointmentDate]);

    const handleSelectedTime = (time: string) => {
        setSelectedTime(time);
    }

    const handleTimeSubmit = () => {
        if (selectedTime == "") {
            setShowError(true);
        }
        else {
            setShowError(false);
            props.SetTime(selectedTime);
        }
    }

    const findTimeDisabled = (time: string) => {
        // Debugging: Log the array and the time
        console.log("timeavail", timeAvail);
        console.log("time", time);

        // Correct the includes logic
        let isDisabled = timeAvail.find(x => x.appointmentTime?.includes(time));

        // Debugging: Log the result
        console.log("isDisabled", isDisabled);

        // Return true if a match is found, otherwise false
        return isDisabled ? true : false;
    };

    return (
        <>
            <div tabIndex={-1} aria-hidden="true" className={`${!props.Toggle ? 'hidden' : ''} overflow-y-auto flex justify-center items-center overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full ">
                    <div className="relative bg-white rounded-lg shadow border">
                        <p className='px-[30px] pt-[30px] font-semibold text-[17px]'>Select Time <span className='italic text-[14px]'>(red disabled time is already taken)</span></p>
                        <div className="flex items-center justify-between p-[30px] pb-0 rounded-t">
                            <div className="flex items-center mb-4">
                                <input
                                    type="radio"
                                    id="timeRadio1"
                                    checked={selectedTime === "08:30"}
                                    onChange={(e) => handleSelectedTime(e.target.value)}
                                    value="08:30"
                                    disabled={findTimeDisabled("08:30")}
                                    name="timeRadio"
                                    className={`w-4 h-4 cursor-pointer appearance-none rounded-full 
                                    ${findTimeDisabled("08:30")
                                            ? 'bg-red-500 border-red-600 hover:bg-red-600 focus:ring-red-500'
                                            : 'bg-green-500 border-green-600 hover:bg-green-600 focus:ring-green-500'} 
                                    focus:ring-2 checked:ring-2 checked:ring-offset-2`}
                                />

                                <label htmlFor="timeRadio1" className="ms-2 text-sm font-medium text-gray-400">8:30 - 9:30</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="radio"
                                    id="timeRadio1"
                                    checked={selectedTime === "09:30"}
                                    onChange={(e) => handleSelectedTime(e.target.value)}
                                    value="09:30"
                                    disabled={findTimeDisabled("09:30")}
                                    name="timeRadio"
                                    className={`w-4 h-4 cursor-pointer appearance-none rounded-full 
                                    ${findTimeDisabled("09:30")
                                            ? 'bg-red-500 border-red-600 hover:bg-red-600 focus:ring-red-500'
                                            : 'bg-green-500 border-green-600 hover:bg-green-600 focus:ring-green-500'} 
                                    focus:ring-2 checked:ring-2 checked:ring-offset-2`}
                                />
                                <label htmlFor="timeRadio2" className="ms-2 text-sm font-medium text-gray-400">9:30 - 10:30</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="radio"
                                    id="timeRadio1"
                                    checked={selectedTime === "10:30"}
                                    onChange={(e) => handleSelectedTime(e.target.value)}
                                    value="10:30"
                                    disabled={findTimeDisabled("10:30")}
                                    name="timeRadio"
                                    className={`w-4 h-4 cursor-pointer appearance-none rounded-full 
                                    ${findTimeDisabled("10:30")
                                            ? 'bg-red-500 border-red-600 hover:bg-red-600 focus:ring-red-500'
                                            : 'bg-green-500 border-green-600 hover:bg-green-600 focus:ring-green-500'} 
                                    focus:ring-2 checked:ring-2 checked:ring-offset-2`}
                                />
                                <label htmlFor="timeRadio3" className="ms-2 text-sm font-medium text-gray-400">10:30 - 11:30</label>
                            </div>
                        </div>

                        {showError && (
                            <p className='mb-0 px-[30px] pt-1 pb-1 text-red-500 text-[14px]'>Please select a time!</p>
                        )}

                        <div className="flex items-center gap-2 justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button type="button" onClick={props.SetToggle} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancel</button>
                            <button type="button" onClick={handleTimeSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Select</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimeDialog
