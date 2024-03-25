function Validation(valuesStepOne) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/

    if(valuesStepOne.name === "") {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if(valuesStepOne.email === "") {
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(valuesStepOne.email)) {
        error.email = "Email didn't match"
    }
    else {
        error.email = ""
    }

    if(valuesStepOne.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(valuesStepOne.password)) {
        error.password = "Password didn't match"
    }
    else {
        error.password = ""
    }
    return error;
}

export default Validation;