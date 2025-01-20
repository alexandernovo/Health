import { MaternalModel } from "./MaternalType";
import { AppointmentModel } from "./appointmentType";
import { HypertensiveModel } from "./hypertensive";
export interface UserModel {
    id?: number;
    token?: string;
    firstname?: string;
    lastname?: string;
    extension?: string;
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
    region?: string;
    reg_code?: string;
    province?: string;
    prov_code?: string;
    municipality?: string;
    mun_code?: string;
    brgy?: string;
    position?: string;
    password?: string;
    gender?: string;
    userstatus?: number;
    confirmPassword?: string;
    dateFrom?: string;
    dateTo?: string;
    // [key: string]: string | number | boolean | undefined;
    maternal?: MaternalModel[];
    appointment?: AppointmentModel[];
    hypertensive?: HypertensiveModel
}


export const userInitialValue = () => {
    return {
        id: undefined,
        token: "",
        firstname: "",
        lastname: "",
        extension: "",
        birthdate: "",
        age: undefined,
        occupation: "",
        education: "",
        religion: "",
        username: "",
        usertype: undefined,
        civil_status: "",
        isSignedIn: true,
        contact_number: "",
        address: "",
        region: "",
        reg_code: "06",
        province: "",
        prov_code: "",
        municipality: "",
        brgy: "Igpalge",
        password: "",
        gender: "",
        userstatus: undefined,
        dateFrom: "",
        dateTo: "",
        confirmPassword: "",
        maternal: [],
        appointment: [],
    }
}
