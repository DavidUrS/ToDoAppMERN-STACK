const {validationResult}  = require('express-validator/check');

const validateUsers = check => {
    return [
        check('name').not().isEmpty().withMessage('The name of the user is required')
        .isLength({max:30}).withMessage("The user's name must not be more than 30 characters"),
        check('lastname').not().isEmpty().withMessage('The lastname of the user is required')
    ]
}

const validatorErrors = req => {
    return !validationResult(req).isEmpty() ? validationResult(req).array() : [];
}

module.exports = { validateUsers, validatorErrors }