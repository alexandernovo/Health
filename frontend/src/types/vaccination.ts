import { UserModel } from "./userType";
import { OtherVaccinesModel } from "./otherVaccines";

export interface VaccinationModel extends UserModel {
    vaccinationId?: number,
    appointment_id?: number,
    user_id?: number,
    seniorCitizen?: boolean,
    Diabetes?: boolean,
    Hypertension?: boolean,
    BloodType?: string,
    Allergies?: string,
    emergencyName?: string,
    nameOfVaccinator60?: string,
    dateVaccinated60?: string,
    nameOfVaccinator65?: string,
    dateVaccinated65?: string,
    emergencyContact?: string,
    otherVaccines: OtherVaccinesModel[]
}

export const VaccinationModelInitialValue = () => {
    return {
        vaccinationId: undefined,
        appointment_id: undefined,
        user_id: undefined,
        seniorCitizen: false,
        Diabetes: false,
        Hypertension: false,
        BloodType: "",
        Allergies: "",
        emergencyName: "",
        nameOfVaccinator60: "",
        dateVaccinated60: "",
        nameOfVaccinator65: "",
        dateVaccinated65: "",
        emergencyContact: "",
        otherVaccines: []
    }
}
export const vaccinationTypes = (): { value: string; label: string }[] => {
    return [
        {
            value: 'bOPV',
            label: 'bivalent Oral Polio Vaccine'
        },
        {
            value: 'MR',
            label: 'Measles-Rubella'
        },
        {
            value: 'MVC',
            label: 'Measles Containing Vaccine'
        },
        {
            value: 'MMR',
            label: 'Measles-Mumps-Rubella'
        },
        {
            value: 'Td',
            label: 'Tetanus-Diphtheria'
        },
        {
            value: 'HPV',
            label: 'Human Papillomavirus Vaccine'
        },
        {
            value: 'Others',
            label: ''
        },
    ];
};

