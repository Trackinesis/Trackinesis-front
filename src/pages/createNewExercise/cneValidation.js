function Validation(valuesExercise, exerciseType) {
    const errors = {};

    // Check for empty fields
    if (!valuesExercise.exerciseName.trim()) {
        errors.name = 'Exercise name is required.';
    }

    // Check for empty fields based on exercise type (sets or time)
    if (exerciseType === 'sets') {
        if (!valuesExercise.exerciseSets.trim()) {
            errors.sets = 'Number of sets is required.';
        }
        if (!valuesExercise.exerciseReps.trim()) {
            errors.reps = 'Number of reps is required.';
        }
        if (!valuesExercise.exerciseWeight.trim()) {
            errors.weight = 'Weight is required.';
        }
    } else if (exerciseType === 'time') {
        if (!valuesExercise.exerciseTime.trim()) {
            errors.time = 'Duration is required.';
        }
    }

    if (valuesExercise.exerciseSets.trim() && valuesExercise.exerciseReps.trim() && valuesExercise.exerciseWeight.trim() && valuesExercise.exerciseTime.trim()) {
        errors.general = 'Please choose either sets/reps/weight or time, not both.';
    }

    return errors;
}

export default Validation
