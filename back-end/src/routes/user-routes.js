const router = require('express').Router();
const userController = require('./../controllers/user-controller');

router.post('/',userController.createUser);
router.get('/',userController.getUsers);
router.get('/:id', userController.findById);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;