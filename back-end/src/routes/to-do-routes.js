const router = require('express').Router();
const toDoController = require('./../controllers/to-do-controller');

router.get('/', toDoController.getToDos);
router.get('/status', toDoController.getStatus);
router.post('/', toDoController.createToDo);
router.delete('/:id', toDoController.deleteTodo);
router.get('/:id', toDoController.getToDoById);
router.put('/:id', toDoController.editToDo);
router.post('/asign', toDoController.assignUser);
router.post('/remove', toDoController.removeUserToDo);
router.get('/status/:status', toDoController.getToDosByStatus);
router.post('/search', toDoController.getToDoByName);
router.post('/status', toDoController.chageStatus);

module.exports = router;