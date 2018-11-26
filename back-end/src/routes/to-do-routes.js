const router = require('express').Router();
const toDoController = require('./../controllers/to-do-controller');
const {check} = require('express-validator/check');
const validator = require('../middlewares/task-validation');

router.get('/', toDoController.getToDos);
router.get('/status', toDoController.getStatus);
router.post('/', validator.validateTask(check), toDoController.createToDo);
router.delete('/:id', toDoController.deleteTodo);
router.get('/:id', toDoController.getToDoById);
router.put('/:id', validator.validateTask(check), toDoController.editToDo);
router.post('/asign', toDoController.assignUser);
router.post('/remove', toDoController.removeUserToDo);
router.get('/status/:status', toDoController.getToDosByStatus);
router.post('/search', validator.validateSearch(check), toDoController.getToDoByName);
router.post('/status', toDoController.chageStatus);

module.exports = router;