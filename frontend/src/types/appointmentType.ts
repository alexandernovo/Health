export interface AppointmentModel {
    appointmentId?: number;
    firstname?: string;
    lastname?: string;
    birthdate?: string;
    occupation?: string;
    education?: string;
    religion?: string;
    contact_number?: string;
    address?: string;
    consultationTypeId?: number;
    consultationTypeName?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    appointmentStatus?: number;
    isActive?: number;
    user_id?: number
}