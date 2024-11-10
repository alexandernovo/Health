import { UserModel } from "./userType";

export interface AppointmentModel extends UserModel {
    appointment_id?: number;
    consultationTypeId?: number;
    consultationTypeName?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    appointmentStatus?: number;
    isActive?: number;
    user_id?: number
    remarks?: string
}


export const AppointmentModelInitialValuue = () => {
    return {
        appointment_id: 0,
        consultationTypeId: 0,
        consultationTypeName: "",
        appointmentDate: "",
        appointmentTime: "",
        appointmentStatus: 0,
        isActive: 0,
        user_id: 0,
        remarks: ""
    }
}