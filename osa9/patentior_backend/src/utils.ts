import { NewPatient, Gender, Entry, NewEntry, Diagnose} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error('Invalid or missing string: ' + str);
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender : any) => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Invalid or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toEntry = (entry: any): Entry => {
  if (!["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(entry?.type)){
    throw new Error('Invalid entry type: ' + entry?.type);
  }
  return entry as Entry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any): NewEntry => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newEntry: any = {
    description: parseString(entry.description),
    date: parseDate(entry.date),
    specialist: parseString(entry.specialist),
    type: entry.type
  };
  const codes: Array<Diagnose['code']> = entry?.diagnosisCodes;
  if (entry.diagnosisCodes) {
    newEntry.diagnosisCodes = codes.map(code => parseString(code));
  }
  
  switch (entry.type){
    case 'HealthCheck':
      newEntry.healthCheckRating = entry.healthCheckRating;
      break;
    case 'Hospital':
      newEntry.discharge = entry.discharge;
      break;
    case 'OccupationalHealthcare':
      newEntry.employerName = entry.employerName;
      if (entry.sickleave)
        newEntry.sickleave = entry.sickleave;
      break;
    default: 
      throw new Error('Invalid entry type.');
  }
  return newEntry as NewEntry;
};