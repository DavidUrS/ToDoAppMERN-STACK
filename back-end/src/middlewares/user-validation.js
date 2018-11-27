const {validationResult}  = require('express-validator/check');

//Function to validate the name and lastname
const validateUsers = check => {
    return [
        check('name').not().isEmpty().withMessage('The name of the user is required')
        .isLength({max:30}).withMessage("The user's name must not be more than 30 characters"),
        check('lastname').not().isEmpty().withMessage('The lastname of the user is required')
    ]
}

//Obtain the errors of validations, is an array, if not exists errors will be empty
const validatorErrors = req => {
    return !validationResult(req).isEmpty() ? validationResult(req).array() : [];
}

//Export functions to validate an errors founds
module.exports = { validateUsers, validatorErrors }