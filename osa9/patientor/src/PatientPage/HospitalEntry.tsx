import { useStateValue } from "../state";
import { HospitalEntry as EntryType} from "../types";
import React from 'react';
import { Segment } from 'semantic-ui-react';

const HospitalEntry: React.FC<{entry: EntryType}> = ({entry}) => {
  const [{ diagnoses }, ] = useStateValue();
  return (
  <Segment>
    <h3>Hospital entry</h3>
    <b>{entry.date}</b> &nbsp; {entry.description}
    <p>
      Disharged {entry.discharge.date} <br/>
      Criteria {entry.discharge.criteria}
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

export default HospitalEntry;