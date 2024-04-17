import { MaternalModel } from "./MaternalType";
import { AppointmentModel } from "./appointmentType";

export interface UserModel {
    id?: number;
    token?: string;
    firstname?: string;
    lastname?: string;
    birthdate?: string;
    age?: number;
    occupation?: string;
    education?: string;
    religion?: string;
    username?: string;
    usertype?: number;
    isSignedIn?: boolean;
    contact_number?: string;
    address?: string;
    password?: string;
    gender?: string;
    userstatus?: number;
    confirmPassword?: string;
    // [key: string]: string | number | boolean | undefined;
    maternal?: MaternalModel[];
    appointment?: AppointmentModel[];
}
