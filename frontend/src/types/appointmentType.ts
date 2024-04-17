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
}