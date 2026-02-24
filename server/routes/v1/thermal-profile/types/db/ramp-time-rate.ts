export interface RampTimeRateParameterData {
  _id: string;
  _rev: string;
  parameter: string;
  profileName: string;
  profileTag: string;
  upFrom: number;
  upTo: number;
  upMinDuration: number;
  downFrom: number;
  downTo: number;
  downMinDuration: number;
}
