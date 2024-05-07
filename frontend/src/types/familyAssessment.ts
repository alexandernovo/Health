export interface FamilyAssessmentModel {
    keyId?: string;
    familyAssessmentId?: number;
    familyId?: number;
    dateOfVisit?: string;
    methodAccepted?: string;
    nameAndSignatureSP?: string;
    dateFollowUp?: string;
    medicalFindings?: string;
}

export const FamilyAssessmentModelInitialValue = () => {
    return {
        keyId: "",
        familyAssessmentId: 0,
        familyId: 0,
        dateOfVisit: "",
        methodAccepted: "",
        nameAndSignatureSP: "",
        dateFollowUp: "",
        medicalFindings: ""
    }
}