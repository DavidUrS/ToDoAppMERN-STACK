//Importing the controller of users, validations and router
const router = require('express').Router();
const userController = require('./../controllers/user-controller');
const {check} = require('express-validator/check');
const validator = require('../middlewares/user-validation');

//Enpoint for create a new user
router.post('/',  validator.validateUsers(check), userController.createUser);
//Endpoint to get all users
router.get('/',userController.getUsers);
//Endpoint to get a user by id
router.get('/:id', userController.findById);
//Endpoint to edit a user
router.put('/:id', validator.validateUsers(check), userController.editUser);
//Endpoint to delete a user
router.delete('/:id', userController.deleteUser);

//Exporting the router
module.exports = router;