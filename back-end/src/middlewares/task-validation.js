const {validationResult}  = require('express-validator/check');

//Function to validate de fields title and description
const validateTask = check => {
    return [
        check('title').not().isEmpty().withMessage('The title of the task is required')
        .isLength({max:30}).withMessage("The title of the task can not be more than 30 characters"),
        check('description').not().isEmpty().withMessage('The description of the task is required')
    ]
}

//Function to validate only the title of task
const validateSearch = check => {
    return [
        check('title').not().isEmpty().withMessage('The title of the task is required')
    ]
}

//Obtain the errors of validations, is an array, if not exists errors will be empty
const validatorErrors = req => {
    return !validationResult(req).isEmpty() ? validationResult(req).array() : [];
}

//Export functions to validate an errors founds
module.exports = { validateTask, validateSearch, validatorErrors }