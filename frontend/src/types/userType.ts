
export interface UserModel {
    id?: number;
    token?: string;
    firstname?: string;
    lastname?: string;
    birthdate?: string;
    occupation?: string;
    education?: string;
    religion?: string;
    username?: string;
    usertype?: number;
    isSignedIn?: boolean;
    contact_number?: string;
    address?: string;
    password?: string;
    gender?: string,
    userstatus?: number,
    confirmPassword?: string;
    [key: string]: string | number | boolean | undefined;
}
