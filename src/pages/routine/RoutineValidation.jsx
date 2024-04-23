function Validation(valuesRoutine, exerciseType) {
    const error = {};

    // Check for empty fields
    if (valuesRoutine.name === "") {
        error.name = "Routine name should not be empty";
    }
    else {
        error.name = ""
    }

    // Check for empty fields based on exercise type (sets or time)
    if(valuesRoutine.type === "") {
        error.type = "Type should be selected"
    }
    else {
        error.type = ""
    }

    if (valuesRoutine.description.size > 300) {
        error.description = "Description size should be lower than 300 characters"
    }
    else {
        error.description = ""
    }

    return error;
}

export default Validation
