const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.listTodos);
router.post('/todos', todoController.addTodo);
router.put('/todos/:id/complete', todoController.completeTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
