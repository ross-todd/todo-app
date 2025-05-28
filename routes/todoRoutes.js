const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Middleware to require login before accessing routes
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Show list of todos
router.get('/', requireLogin, todoController.listTodos);

// Add a new todo
router.post('/todos', requireLogin, todoController.addTodo);

// Mark a todo as complete
router.put('/todos/:id/complete', requireLogin, todoController.completeTodo);

// Delete a todo
router.delete('/todos/:id', requireLogin, todoController.deleteTodo);

module.exports = router;
