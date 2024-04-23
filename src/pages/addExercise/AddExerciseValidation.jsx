function Validation(valuesExercise, exerciseType) {
    const error = {};

    // Check for empty fields
    if (valuesExercise.name === "") {
        error.name = "Exercise name should not be empty";
    }
    else {
        error.name = ""
    }

    // Check for empty fields based on exercise type (sets or time)
    if(valuesExercise.type === "") {
        error.type = "Type should be selected"
    }
    else {
        error.type = ""
    }

    if (valuesExercise.description.size > 300) {
        error.description = "Description size should be lower than 300 characters"
    }
    else {
        error.description = ""
    }

    return error;
}

export default Validation
