import patients from "../data/patients";
import { NewEntry, NewPatient, Patient } from "../types";
import { v4 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getOnePatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): NewPatient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): NewPatient => {
  const newEntry = {
    ...entry,
    id: uuid()
  }

  patient.entries = patient.entries.concat(newEntry);

  return patient;
};

export default {
  getPatients,
  getOnePatient,
  addPatient,
  addEntry
};  