const router = require('express').Router();
const userController = require('./../controllers/user-controller');
const {check} = require('express-validator/check');
const validator = require('../middlewares/user-validation');

router.post('/',  validator.validateUsers(check), userController.createUser);
router.get('/',userController.getUsers);
router.get('/:id', userController.findById);
router.put('/:id', validator.validateUsers(check), userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;