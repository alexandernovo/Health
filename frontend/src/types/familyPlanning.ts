import { UserModel } from "./userType";
import { FamilyAssessmentModel } from "./familyAssessment";

export interface FamilyPlanningModel extends UserModel {
    familyId?: number;
    appointment_id?: string;
    user_id?: number;
    clientId?: string;
    philhealth?: string;
    NHTS?: number;
    pantawid4ps?: number;
    spouseName?: string;
    spouseDateofBirth?: string;
    spouseAge?: number;
    spouseOccupation?: string;
    noLivingChildren?: number;
    planToHaveMoreChildren?: number;
    averageIncome?: string;
    typeOfClient?: string;
    typeCurrentUser?: string;
    typeReason?: string;
    methodUsed?: string;
    methodOthers?: string;
    medicalHeadache?: number;
    medicalhistoryStroke?: number;
    medicalHematoma?: number;
    medicalBreastCancer?: number;
    medicalsevereChestPain?: number;
    medicalcough14Days?: number;
    medicalJaundice?: number;
    medicalVaginalBleeding?: number;
    medicalVaginalDischarge?: number;
    medicalIntake?: number;
    medicalClientSmoker?: number;
    medicalDisability?: number;
    disabilitySpecify?: string;
    numberPregnanciesG?: number;
    numberPregnanciesP?: number;
    fullItem?: string;
    premature?: string;
    abortion?: number;
    livingChildren?: number;
    dateLastDelivery?: string;
    typeOfLastDelivery?: string;
    lastMenstrualPeriod?: string;
    previousMenstrualPeriod?: string;
    menstrualFlow?: string;
    dysmenorrhea?: number;
    hydatidiform?: number;
    historyEctopicPregnancy?: number;

    abnormalDischarge?: number;
    indicateGenital?: string;
    scoresOrUlcer?: number;
    painOrBurningSensation?: number;
    historySexuallyTransmitted?: number;
    HivAids?: number;

    unPleasantRelationshipPartner?: number;
    partnerDoesNotApprove?: number;
    VAW?: number;
    referedTo?: string;
    referedToOther?: string;

    weight?: string;
    height?: string;
    bp?: string;
    pulseRate?: string;

    skin?: string;
    extremities?: string;
    conjunctiva?: string;

    pelvicExamination?: string;
    cervicalAbnormal?: string;
    cervicalConsistency?: string;
    uterinePosition?: string;
    uterineDepth?: string;

    neck?: string;
    breast?: string;
    abdomen?: string;
    babyLessThan6Months?: number;
    abstain?: number;
    babyLessThan4Weeks?: number;
    menstrualPast7Days?: number;
    abortionPast7Days?: number;
    usingContraceptives?: number;
    familyAssessment?: FamilyAssessmentModel[];
    removeFamilyAssessment?: FamilyAssessmentModel[];
}

export const FamilyPlanningModelInitialValue = () => {
    return {
        familyId: undefined,
        appointment_id: "",
        user_id: undefined,
        clientId: "",
        philhealth: "",
        NHTS: undefined,
        pantawid4ps: undefined,
        spouseName: "",
        spouseDateofBirth: "",
        spouseAge: undefined,
        spouseOccupation: "",
        noLivingChildren: undefined,
        planToHaveMoreChildren: undefined,
        averageIncome: "",
        typeOfClient: "",
        typeCurrentUser: "",
        typeReason: "",
        methodUsed: "",
        methodOthers: "",
        medicalHeadache: undefined,
        medicalhistoryStroke: undefined,
        medicalHematoma: undefined,
        medicalBreastCancer: undefined,
        medicalsevereChestPain: undefined,
        medicalcough14Days: undefined,
        medicalJaundice: undefined,
        medicalVaginalBleeding: undefined,
        medicalVaginalDischarge: undefined,
        medicalIntake: undefined,
        medicalClientSmoker: undefined,
        medicalDisability: undefined,
        disabilitySpecify: "",
        numberPregnanciesG: undefined,
        numberPregnanciesP: undefined,
        fullItem: "",
        premature: "",
        abortion: undefined,
        livingChildren: undefined,
        dateLastDelivery: "",
        typeOfLastDelivery: "",
        lastMenstrualPeriod: "",
        previousMenstrualPeriod: "",
        menstrualFlow: "",
        dysmenorrhea: undefined,
        hydatidiform: undefined,
        historyEctopicPregnancy: undefined,
        abnormalDischarge: 0,
        indicateGenital: "",
        scoresOrUlcer: 0,
        painOrBurningSensation: 0,
        historySexuallyTransmitted: 0,
        HivAids: 0,
        unPleasantRelationshipPartner: undefined,
        partnerDoesNotApprove: undefined,
        VAW: undefined,
        referedTo: "",
        referedToOther: "",
        weight: "",
        height: "",
        bp: "",
        pulseRate: "",
        skin: "",
        extremities: "",
        conjunctiva: "",
        pelvicExamination: "",

        cervicalAbnormal: "",
        cervicalConsistency: "",
        uterinePosition: "",
        uterineDepth: "",

        neck: "",
        breast: "",
        abdomen: "",
        babyLessThan6Months: undefined,
        abstain: undefined,
        babyLessThan4Weeks: undefined,
        menstrualPast7Days: undefined,
        abortionPast7Days: undefined,
        usingContraceptives: undefined,
        familyAssessment: [],
        removeFamilyAssessment: []
    }
}