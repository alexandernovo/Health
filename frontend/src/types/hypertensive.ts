import { UserModel } from "./userType";

export interface HypertensiveModel extends UserModel {
    hypertensiveId?: number,
    appointment_id?: string,
    user_id?: number,
    amlodipine?: boolean,
    losartan?: boolean,
    metroprolol?: boolean,
    simvastatin?: boolean,
    gliclazide?: boolean,
    metformin?: boolean,
    insulin?: boolean,
    others?: boolean,
    othersDescription?: string,
}

export const HypertensiveModelInitialValue = () => {
    return {
        hypertensiveId: 0,
        appointment_id: "",
        user_id: 0,
        amlodipine: false,
        losartan: false,
        metroprolol: false,
        simvastatin: false,
        gliclazide: false,
        metformin: false,
        insulin: false,
        others: false,
        othersDescription: "",
    }
}