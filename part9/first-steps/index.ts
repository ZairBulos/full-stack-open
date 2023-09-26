import { calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
import express from 'express';

const app = express();
app.use(express.json()); 

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).send({ error: 'missing parameters' });
  }

  const bmiResult = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi: bmiResult,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExercises = req.body.daily_exercises;
  const target = req.body.target;

  if (!dailyExercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }

  if (!Array.isArray(dailyExercises) || !dailyExercises.every(Number.isFinite) || !Number.isFinite(target)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const dailyExercisesParsed: Array<number> = dailyExercises.map(Number);
  const targetParsed = Number(target);
  const result = calculateExercises(dailyExercisesParsed, targetParsed);

  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});