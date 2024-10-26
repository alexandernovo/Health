<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ekonsulta extends Model
{
    protected $primaryKey = 'ekonsultaId';
    protected $table = 'ekonsulta';
    protected $fillable = [
        "ekonsultaId",
        "appointment_id",
        "user_id",
        "patientType",
        "familySerialNo",
        "NHTSNo",
        "NHTSClass",
        "PHICNo",
        "PHICClass",
        "bodyLength",
        "headCircumference",
        "skinfoldThickness",
        "weight",
        "BMI",
        "waistCircumference",
        "midUpperArmCircumference",
        "BP",
        "RR",
        "HR",
        "PR",
        "Temp",
        "chiefComplaints",
        "hospitalization",
        "asthma",
        "cancer",
        "cancerSpecify",
        "cerebrovascular",
        "coronary",
        "diabetes",
        "minorsurgeries",
        "emphysema",
        "epilepsy",
        "hepatitis",
        "liverDisease",
        "hepatitisSpecify",
        "hyperlipidemia",
        "hypertension",
        "pepticUlcer",
        "COPD",
        "pneumonia",
        "thyroid",
        "UTI",
        "TB",
        "TBSpecify",
        "ifPTB",
        "ifPTBSpecify",
        "Others",
        "operation1",
        "operationDate1",
        "operation2",
        "operationDate2",
        "visualAcuity",
        "mothersName",
        "mothersBirthday",
        "ethnicity",
        "purok",
        "zipCode",
        "maidenLastname",
        "newbornHearingTest",
        "allergySpecify",
        "allergyDrugs",
        "Disability",
        "Drug",
        "Handicap",
        "Impairment",
        "maidenMiddleName",
        "basicHearingTest",
        "cervicalCancerScreeningDone",
        "prostateCancerScreeningDone",
        "hivAidsScreeningDone",
        "developmentalAndMentalEvaluation",
        "expandedNewbornScreening",
        "CBC2",
        "bloodType",
        "bloodTypeSpecify",
        "FBS",
        "sputumMicroscopy",
        "slitSkinSmear",
        "totalCholesterol",
        "hdlCholesterol",
        "serumandBun",
        "routineUrinalysis",
        "katoKatz",
        "rapidPlasma",
        "igmAndIgG",
        "nonStructure",
        "hepaB",
        "fecalysis",
        "malarialSmear",
        "nucleicAndAmplification",
        "allergy",
        "disability",
        "drug",
        "handicap",
        "impairment",
        "smoking",
        "number_of_sticks",
        "alcohol",
        "number_of_bottles",
        "illicit_drugs",
        "no_of_packs",
        "skinPallor",
        "skinRashes",
        "skinJaundice",
        "skinGoodSkinTurgor",
        "heentAnicteric",
        "heentIntactTympanic",
        "heentExudates",
        "heentPupils",
        "allergyDrugsBl",
        "DisabilityBl",
        "DrugBl",
        "HandicapBl",
        "ImpairmentBl",
        "heentTonsil",
        "heentAuralDischarge",
        "heentNasalDischarge",
        "heentPalpableMass",
        "chestSymmetrical",
        "chestClearBreath",
        "chestRetractions",
        "chestCrackles",
        "chestWheeze",
        "heartAdynamic",
        "heartMurmurs",
        "heartNormalRate",
        "heartHeaves",
        "abdomenFlat",
        "abdomenGlobular",
        "abdomenFlabby",
        "abdomenMuscleGuarding",
        "abdomenTenderness",
        "abdomenPalpableMass",
        "extremetiesGrossDeformity",
        "extremetiesNormalGait",
        "extremetiesFullEqualPulse",
        "neurologicalNormal",
        "neurologicalDevelopmental",
        "neurologicalSeizures",
        "neurologicalMotorDeficit",
        "neurologicalSensoryDeficit",
        "diagnosis",
        "treatment",
        "healthcareProvider",
        "administeredBy",
        "maidenLastname",
        "maidenMiddleName",
        "patientType",
        "familySerialNo",
        "mothersName",
        "mothersBirthday",
        "ethnicity",
        "purok",
        "zipCode",
        "hepatitisSpecify",
        "liverDisease",
        "newbornHearingTest",
        "allergySpecify",
        "allergyDrugs",
        "Disability",
        "Drug",
        "Handicap",
        "Impairment",
        "allergyDrugsBl",
        "DisabilityBl",
        "DrugBl",
        "HandicapBl",
        "ImpairmentBl"
    ];
}