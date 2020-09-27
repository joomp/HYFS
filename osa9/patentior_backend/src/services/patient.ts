import patients from '../../data/patients';
import { Patient, PatientNonSensitive, NewPatient, Entry, NewEntry } from '../types';
import {v4 as uuid} from 'uuid';

const getPatientInformation = (): Patient[] => patients;

const getNonSensitivePatientInformation = ():PatientNonSensitive[] => {
  return patients.map( ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name, 
    dateOfBirth,
    gender,
    occupation 
    })
  );
};

const getPatientById = (id: string): Patient|undefined => {
  return patients.find( patient => patient.id === id);
};

const addEntry = (patientID: string, entry: NewEntry): Entry => {
  const newEntry = {
    ...entry,
    id: uuid(),
  } as Entry;
  const patient = patients.find( patient => patient.id === patientID);
  if (!patient) {
    throw new Error('Patient with given id not found');
  }
  if (patient.entries) {
    patient.entries = patient.entries.concat(newEntry);
  } else {
    patient.entries = [newEntry];
  }
  //patients.map(p => p.id === patientID ? patient : p);
  return newEntry;
};

const addPatient = (patient:NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientInformation,
  getNonSensitivePatientInformation,
  addPatient,
  getPatientById,
  addEntry
 };