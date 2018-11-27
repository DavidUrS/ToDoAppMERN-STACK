//Importing the controller of tasks, validations and router
const router = require('express').Router();
const toDoController = require('./../controllers/to-do-controller');
const {check} = require('express-validator/check');
const validator = require('../middlewares/task-validation');

//Endpoint for get all tasks
router.get('/', toDoController.getToDos);
//Endpoint for get all status (enum list)
router.get('/status', toDoController.getStatus);
//Endpoint for create a new task
router.post('/', validator.validateTask(check), toDoController.createToDo);
//Endpoint for dele a task
router.delete('/:id', toDoController.deleteTodo);
//Endpoit for get by id one task
router.get('/:id', toDoController.getToDoById);
//Endpoint for edit a task
router.put('/:id', validator.validateTask(check), toDoController.editToDo);
//Endpoint for asign task to a user
router.post('/asign', toDoController.assignUser);
//Endpoint for remove user from a task
router.post('/remove', toDoController.removeUserToDo);
//Endpoint for filter tasks by status
router.get('/status/:status', toDoController.getToDosByStatus);
//Endoint for filter tasks by title
router.post('/search', validator.validateSearch(check), toDoController.getToDoByName);
//Endpoint for change status to a task
router.post('/status', toDoController.chageStatus);

//Exporting the router
module.exports = router;