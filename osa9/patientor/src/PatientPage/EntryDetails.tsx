import { Entry } from "../types";
import React from 'react';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcare from './OccupationalHealthcareEntry';

const PatientPage: React.FC<{entry: Entry}> = ({entry}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type){
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry}/>;
    case 'Hospital':
      return <HospitalEntry entry={entry}/>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry}/>;
    default: 
      return assertNever(entry);
  }
};

export default PatientPage;