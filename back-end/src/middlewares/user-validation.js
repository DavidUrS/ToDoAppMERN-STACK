const {validationResult}  = require('express-validator/check');

//Middleware para validar el nombre de la ciudad, recibe el check, de la ruta y lo retorna
const validateUsers = check => {
    return [
        check('name').not().isEmpty().withMessage('The name of the user is required')
        .isLength({max:30}).withMessage("The user's name must not be more than 30 characters"),
        check('lastname').not().isEmpty().withMessage('The lastname of the user is required')
    ]
}

//Se utiliza en el controlador, para encontrar errores de validación, y asi decidir que accion realizar
const validatorErrors = req => {
    return !validationResult(req).isEmpty() ? validationResult(req).array() : [];
}

// Exportando el middleware para validaciones, se usaran en los controladores y en las rutas
module.exports = { validateUsers, validatorErrors }