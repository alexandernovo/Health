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
    civil_status?: string;
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


export const userInitialValue = () => {
    return {
        id: undefined,
        token: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        age: undefined,
        occupation: "",
        education: "",
        religion: "",
        username: "",
        usertype: undefined,
        civil_status: "",
        isSignedIn: 0,
        contact_number: "",
        address: "",
        password: "",
        gender: "",
        userstatus: undefined,
        confirmPassword: "",
        maternal: [],
        appointment: [],
    }
}
