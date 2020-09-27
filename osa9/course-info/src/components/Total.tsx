import React from 'react';
import {CoursePart} from '../types/coursePart';

const Total: React.FC<{courseParts: CoursePart[]}> = ( {courseParts} ) => {
  return (
    <p>
    Exercises in total{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  );
};

export default Total;