import { UserModel } from "./userType";
import { ImmunizationResult } from "./immunizationResult";

export interface Immunization extends UserModel {
    immunizationId?: number;
    appointment_id: string;
    user_id?: number;
    VitK?: boolean;
    eyeOintment?: boolean;
    hepaAtBirth?: boolean;
    BCG?: boolean;
    Penta1?: boolean;
    Penta2?: boolean;
    Penta3?: boolean;
    opv1?: boolean;
    opv2?: boolean;
    opv3?: boolean;
    ipv?: boolean;
    pcv1?: boolean;
    pcv2?: boolean;
    pcv3?: boolean;
    mv0?: boolean;
    mv1?: boolean;
    mv2?: boolean;
    fic?: boolean;
    grade1Td?: boolean;
    MR?: boolean;
    grade4Hpv1?: boolean;
    hpv2?: boolean;
    grade7Td?: boolean;
    pneumonia1?: boolean;
    pneumonia2?: boolean;
    pneumonia3?: boolean;
    pneumonia4?: boolean;
    pneumonia5?: boolean;
    flu1?: boolean;
    flu2?: boolean;
    flu3?: boolean;
    flu4?: boolean;
    flu5?: boolean;
    tt1?: boolean;
    tt2?: boolean;
    tt3?: boolean;
    tt4?: boolean;
    tt5?: boolean;
    rabiesImmunization1?: boolean;
    rabiesImmunization2?: boolean;
    rabiesImmunization3?: boolean;
    rabiesImmunization4?: boolean;
    initiatedBreastFeeding?: boolean;
    mixedFeeding?: boolean;
    initiatedComplementaryFeeding?: boolean;
    vitAat6To11Mos?: boolean;
    vitAat12To59Mos?: boolean;
    deworming12To23Mos?: boolean;
    deworming24To59Mos?: boolean;
    deworming5To9YO?: boolean;
    deworming10To19YO?: boolean;
    ferrousSulfate?: boolean;
    immunizationResult: ImmunizationResult[];
    removeImmunizationResult: ImmunizationResult[];
}


export const ImmunizationInitialValue = () => {
    return {
        immunizationId: 0,
        appointment_id: "",
        user_id: 0,
        VitK: false,
        eyeOintment: false,
        hepaAtBirth: false,
        BCG: false,
        Penta1: false,
        Penta2: false,
        Penta3: false,
        opv1: false,
        opv2: false,
        opv3: false,
        ipv: false,
        pcv1: false,
        pcv2: false,
        pcv3: false,
        mv0: false,
        mv1: false,
        mv2: false,
        fic: false,
        grade1Td: false,
        MR: false,
        grade4Hpv1: false,
        hpv2: false,
        grade7Td: false,
        pneumonia1: false,
        pneumonia2: false,
        pneumonia3: false,
        pneumonia4: false,
        pneumonia5: false,
        flu1: false,
        flu2: false,
        flu3: false,
        flu4: false,
        flu5: false,
        tt1: false,
        tt2: false,
        tt3: false,
        tt4: false,
        tt5: false,
        rabiesImmunization1: false,
        rabiesImmunization2: false,
        rabiesImmunization3: false,
        rabiesImmunization4: false,
        initiatedBreastFeeding: false,
        mixedFeeding: false,
        initiatedComplementaryFeeding: false,
        vitAat6To11Mos: false,
        vitAat12To59Mos: false,
        deworming12To23Mos: false,
        deworming24To59Mos: false,
        deworming5To9YO: false,
        deworming10To19YO: false,
        ferrousSulfate: false,
        immunizationResult: [],
        removeImmunizationResult: [],
    }
}