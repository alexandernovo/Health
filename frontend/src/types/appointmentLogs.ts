import { UserModel } from "./userType";

export interface AppointmentLogsModel extends UserModel {
    appointment_id?: number;
    status_desc?: string;
    consultationTypeName?: string;
    patfirst?: string;
    patmiddle?: string;
    patlast?: string;
    patext?: string;
    appointmentDate?: string;
    appointmentStatus?: number,
    created_at: string
}