export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
export {exerciseCalc}
const exerciseCalc = (dailyExerciseHours: Array<number>, target: number): Result => {
  const hoursTotal: number = dailyExerciseHours.reduce( (sum: number, d: number) => {
    return sum + d;
  }, 0);
  const trainingDays: number = dailyExerciseHours.reduce( (total: number, d: number) => {
    return d === 0 ? total : total + 1;
  }, 0);
  const average: number = trainingDays ?
    hoursTotal / dailyExerciseHours.length
    :
    0;
  const success: boolean = average >= target;
  const periodLength = dailyExerciseHours.length;
  let rating: number;
  let ratingDescription: string;
  if (average <= 0.5) {
    rating = 1;
    ratingDescription = 'pretty bad';
  } else if (average <= 2) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'pretty good';
  }
  return {
    trainingDays, average, success, rating, ratingDescription, periodLength, target
  };
};


interface exerciseValues {
  target: number;
  dailyExercisehours: Array<number>;
}

const parseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !([...args].splice(3).map(h=>Number(h)).some(isNaN))) {
    return {
      target: Number(args[2]),
      dailyExercisehours: [...args].splice(3).map(h=>Number(h))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { target, dailyExercisehours } = parseArguments(process.argv);
  console.log(exerciseCalc(dailyExercisehours, target));
} catch (e) {
  console.log(`Error: ${e.message}` );
}
