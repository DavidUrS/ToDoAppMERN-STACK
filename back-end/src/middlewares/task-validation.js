const {validationResult}  = require('express-validator/check');

//Middleware para validar el nombre de la ciudad, recibe el check, de la ruta y lo retorna
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

//Se utiliza en el controlador, para encontrar errores de validación, y asi decidir que accion realizar
const validatorErrors = req => {
    return !validationResult(req).isEmpty() ? validationResult(req).array() : [];
}

// Exportando el middleware para validaciones, se usaran en los controladores y en las rutas
module.exports = { validateTask, validateSearch, validatorErrors }