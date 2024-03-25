function Validation(valuesStepTwo) {
    let error = {}

    if (valuesStepTwo.age === "") {
        error.age = "Age should not be empty";
    }
    else if (valuesStepTwo.age > 117) {
        error.age = "Age must be smaller than 117";
    }
    else {
        error.age = ""
    }

    if (valuesStepTwo.weight === "") {
        error.weight = "Weight should not be empty";
    }
    else if (valuesStepTwo.weight <= 0) {
        error.weight = "Weight must be greater than 0";
    }
    else {
        error.weight = ""
    }

    if (valuesStepTwo.height === "") {
        error.height = "Height should not be empty";
    }
    else if (valuesStepTwo.height <= 0) {
        error.height = "Height must be greater than 0";
    }
    else {
        error.height = ""
    }

    if(valuesStepTwo.gender === "") {
        error.gender = "Gender should not be empty"
    }
    else {
        error.gender = ""
    }
    return error;
}

export default Validation