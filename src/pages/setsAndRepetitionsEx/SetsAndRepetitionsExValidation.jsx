function SetsAndRepetitionsExValidation(SetsAndRepetitionsEx) {
    let errors = {};

    if(SetsAndRepetitionsEx.sets === "" && SetsAndRepetitionsEx.sets >= 0) {
        errors.sets = "Sets should not be empty or less than 0";
    }

}

export default SetsAndRepetitionsExValidation