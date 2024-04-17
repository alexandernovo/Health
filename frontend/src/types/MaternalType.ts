import { MedicalAssessmentModel } from "./MedicalAssessment";
import { UserModel } from "./userType";

export interface MaternalModel extends UserModel {
    maternal_id?: number,
    fNo?: string,
    philhealth?: string,
    appointment_id?: string;
    husbandName?: string;
    user_id?: number;
    husbandbirthdate?: string;
    husbandage?: number;
    husbandAddress?: string,
    husbandEducation?: string,
    husbandOccupation?: string,
    dateofmarriage?: string;
    religion?: string;
    dateAdmitted?: string;
    dateDischarge?: string
    timeAdmitted?: string,
    timeDischarge?: string,
    pastPTB?: boolean;
    pastHeartDisease?: boolean;
    pastDiabetes?: boolean;
    pastAsthma?: boolean;
    pastGoiter?: boolean;
    familyHistoryPTB?: boolean;
    familyHistoryHeartDisease?: boolean;
    familyHistoryDiabetes?: boolean;
    familyHistoryHypertension?: boolean;
    familyHistoryGoiter?: boolean;
    LMP?: string;
    EDC?: string;
    GRAVIDA?: string;
    PARA?: string;
    OBScore?: string;
    below18ORabove35?: boolean;
    pregnancyMore4?: boolean;
    poorObstetrical?: boolean;
    Below2YearsBirthInterval?: boolean;
    lessThan145cm?: boolean;
    moreThan145cm?: boolean;
    antePostPartrum?: boolean;
    prematureLabor?: boolean;
    abnormalPresentation?: boolean;
    preEnclampsia?: boolean;
    STD?: boolean;
    TT1?: boolean;
    TT2?: boolean;
    TT3?: boolean;
    TT4?: boolean;
    TT5?: boolean;
    medicalAssessment?: MedicalAssessmentModel[];
    removeMedicalAssessment?: MedicalAssessmentModel[];
}