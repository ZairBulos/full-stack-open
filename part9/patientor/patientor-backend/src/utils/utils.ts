import { Diagnosis, Discharge, Gender, HealthCheckRating, NewEntry, NewPatient, SickLeave } from "../types";

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string: ' + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isStringArray = (arr: any): arr is Array<string> => {
  if (arr.every((i: string) => typeof i === "string")) {
    return arr;
  } else {
    throw new Error("Incorrect or missing Entry");
  }
};

const parseDiagnosisCode = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes || !isStringArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
  }

  return diagnosisCodes;
};

const isDischarge = (param: any): param is Discharge => {
  return Object.keys(param).includes('date' && 'criteria');
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  return discharge;
};

const isSickLeave = (param: any): param is SickLeave => {
  return Object.values(param).includes('startDate' && 'endDate');
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }

  return sickLeave;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }

  return healthCheckRating;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };
};

export const toNewEntry = (object: any): NewEntry => {
  switch (object.type) {
    case "Hospital":
      return {
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        description: parseString(object.description),
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
        type: "Hospital",
        discharge: parseDischarge(object.discharge)
      };
    case "OccupationalHealthcare":
      return {
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        description: parseString(object.description),
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    case "HealthCheck":
      return {
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        description: parseString(object.description),
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    default:
      throw new Error("Incorrect or missing Entry");
  }
};