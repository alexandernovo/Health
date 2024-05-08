export interface ImmunizationResult {
    keyId?: string;
    immunizationResultId?: number;
    immunizationId?: number;
    ageInMos?: number;
    weightA?: number;
    weightN?: number;
}

export const ImmunizationResultInitialValue = () => {
    return {
        keyId: "",
        immunizationResultId: undefined,
        immunizationId: undefined,
        ageInMos: undefined,
        weightA: undefined,
        weightN: undefined,
    }
}