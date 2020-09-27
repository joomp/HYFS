import React from 'react';
import {CoursePart} from '../types/coursePart';
import Part from './Part';

const Content: React.FC<{courseParts: CoursePart[]}> = ( {courseParts} ) => {
  return (
    <div> 
      {courseParts.map(coursePart => (
        <div key={coursePart.name}>
          <b>{coursePart.name}</b>
          <Part part={coursePart}/>
        </div>
      ))}
    </div>
  );
};

export default Content;