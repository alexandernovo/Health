export interface OtherVaccinesModel {
    keyId?: string;
    otherVaccinesId?: number,
    vaccinationId?: number,
    otherType?: string,
    otherDateGiven?: string,
    otherRemarks?: string,
}


export const OtherVaccinesModelInitialValue = () => {
    return {
        keyId: "",
        otherVaccinesId: undefined,
        vaccinationId: undefined,
        otherType: "",
        otherDateGiven: "",
        otherRemarks: "",
    }
}