export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewPatient = Omit<Patient, "id" | "entries">;
export type PublicPatient = Omit<Patient, "ssn" | "entries">;