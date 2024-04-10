export interface MedicalAssessmentModel {
    keyId?: string;
    medicalAssessmentID?: number,
    Date?: string;
    BP?: string;
    HR?: string;
    AOG?: number;
    RR?: string;
    FH?: number;
    WT?: number;
    TEMP?: number;
    FHBPres: boolean;
    Remarks?: string;
}