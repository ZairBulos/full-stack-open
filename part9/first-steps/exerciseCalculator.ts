interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(dailyExercises: Array<number>, target: number): Result {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(h => h > 0).length;
  const average = dailyExercises.reduce((a, b) => a += b) / dailyExercises.length;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;

  const difference = Math.abs(average - target);
  if (difference <= 0.5) {
    rating = 3;
    ratingDescription = 'excellent';
  } else if (difference <= 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

/*
interface ExerciseValues {
  dailyExercises: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const target = parseFloat(args[2]);
  if (isNaN(target)) {
    throw new Error('Target value must be a number');
  }

  const dailyExercises = args.slice(3).map(Number);

  if (dailyExercises.some(isNaN)) {
    throw new Error('Provided values for daily hours were not numbers');
  }

  return {
    dailyExercises,
    target,
  };
};

try {
  const { dailyExercises, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: any) {
  console.log('Error, something bad happened, message: ', error.message);
}
*/