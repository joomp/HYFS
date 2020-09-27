import { useStateValue } from "../state";
import { OccupationalHealthcareEntry as EntryType} from "../types";
import React from 'react';
import { Segment } from 'semantic-ui-react';

const OccupationalHealthCareEntry: React.FC<{entry: EntryType}> = ({entry}) => {
  const [{ diagnoses }, ] = useStateValue();
  return (
  <Segment>
    <h3>Occupational health care</h3>
    <p>
      {'Employer: ' + entry.employerName}
    </p>
    <p>
      <b>{entry.date}</b> &nbsp; {entry.description} <br/>
      {Boolean(entry.sickLeave) && (
        <>
          <b> Sick leave &nbsp; </b>
          from {entry.sickLeave?.startDate + ' to ' + entry.sickLeave?.endDate}
        </>
      )}
    </p>
    <ul>
      {entry.diagnosisCodes?.map( d => (
        <li key={d}>
          {d + " " + diagnoses[d].name}
        </li>
      ))}
    </ul>
  </Segment>
  );
};

export default OccupationalHealthCareEntry;