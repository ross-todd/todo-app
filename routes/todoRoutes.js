const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

router.get('/', requireLogin, todoController.listTodos);
router.post('/todos', requireLogin, todoController.addTodo);
router.put('/todos/:id/complete', requireLogin, todoController.completeTodo);
router.delete('/todos/:id', requireLogin, todoController.deleteTodo);

module.exports = router;
