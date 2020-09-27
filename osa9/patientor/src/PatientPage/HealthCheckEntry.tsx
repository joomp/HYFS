import { useStateValue } from "../state";
import { HealthCheckEntry as EntryType} from "../types";
import React from 'react';
import { Segment } from 'semantic-ui-react';
import HealthRatingBar from '../components/HealthRatingBar';

const HealthCheckEntry: React.FC<{entry: EntryType}> = ({entry}) => {
  const [{ diagnoses }, ] = useStateValue();
  return (
  <Segment>
    <h3>Health check</h3>
    <p>
      {'Healt check rating: '}
    </p>
      <HealthRatingBar showText={false} rating={entry.healthCheckRating}/>
    <p>
      <b>{entry.date}</b> &nbsp; {entry.description}
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

export default HealthCheckEntry;