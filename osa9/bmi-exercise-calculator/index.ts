import express from 'express';
import { calculateBmi } from './bmiCalculator';
import {exerciseCalc } from './exerciseCalculator';

const app = express();
const PORT = 3000;

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello full stack :D');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(weight) || isNaN(height))
      throw new Error('Provided values were not numbers');
    res.json({weight, height, bmi:calculateBmi(height, weight)});
  } catch (e){
    res.status(400).json({error: "malformatted parameters"});
  }
});

app.get('/hello', (_req, res) => {
  res.send('Hello full stack :D');
});

app.post('/exercise', (req, res) => {
  let dailyExercises: Array<number> = req.body.daily_exercises;
  let target: number = req.body.target;
  if (target === undefined || dailyExercises === undefined){
    res.status(400).json({
      error: "parameters missing"
    })
  } else if (isNaN(Number(target)) || (dailyExercises.map(h=>Number(h)).some(isNaN))) {
    res.status(400).json({
      error: "malformatted parameters"
    })
  } else{
    res.json(exerciseCalc(dailyExercises, target))
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});