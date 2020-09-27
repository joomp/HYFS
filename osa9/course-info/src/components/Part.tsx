import React from 'react';
import {CoursePart} from '../types/coursePart';

const Part: React.FC<{part: CoursePart}> = ( {part} ) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          Description: {part.description} <br/>
          Exercises:  {part.exerciseCount} <br/>
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          Exercises:  {part.exerciseCount} <br/>
          Group projects : {part.groupProjectCount} <br/>
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          Description: {part.description} <br/>
          Exercises:  {part.exerciseCount} <br/>
          Exercise submission link: {part.exerciseSubmissionLink} <br/>
        </p>
      );
    case "Final part":
      return (
        <p>
          Description: {part.description} <br/>
          Exercises:  {part.exerciseCount} <br/>
          Grading: {part.grading} <br/>
        </p>
      )
    default:
      return assertNever(part);
      
  }
};

export default Part;