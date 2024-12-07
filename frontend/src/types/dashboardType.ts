export interface DashboardType {
  overall: number;
  vaccination: number;
  checkup: number;
  immunization: number;
  hypertensive: number;
  familyplanning: number;
  newborn: number;
  maternal: number;
}

export const initialEkonsultaModel = (): DashboardType => ({
  overall: 0,
  vaccination: 0,
  checkup: 0,
  immunization: 0,
  hypertensive: 0,
  familyplanning: 0,
  newborn: 0,
  maternal: 0,
});