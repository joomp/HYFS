export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NewPatient = Omit<Patient, 'id'| 'entries'>;

export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;

export interface Diagnose {
  name: string;
  code: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface sickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: sickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type:'Hospital';
  discharge: Discharge;
}

export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

export type NewEntry = Omit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}