const {validationResult}  = require('express-validator/check');

const validateTask = check => {
    return [
        check('title').not().isEmpty().withMessage('The title of the task is required')
        .isLength({max:30}).withMessage("The title of the task can not be more than 30 characters"),
        check('description').not().isEmpty().withMessage('The description of the task is required')
    ]
}

const validateSearch = check => {
    return [
        check('title').not().isEmpty().withMessage('The title of the task is required')
    ]
}

const validatorErrors = req => {
    return !validationResult(req).isEmpty() ? validationResult(req).array() : [];
}

module.exports = { validateTask, validateSearch, validatorErrors }