const Todo = require('../models/todoModel');

exports.listTodos = (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  Todo.getAll(req.session.userId, (err, todos) => {
    if (err) {
      console.error('Database error in listTodos:', err);
      return res.status(500).send('Database error');
    }
    res.render('index', { todos, username: req.session.username });
  });
};

exports.addTodo = (req, res) => {
  const text = req.body.text;
  if (!req.session.userId) return res.redirect('/login');

  if (!text || text.trim() === '') {
    return res.redirect('/');
  }
  Todo.add(text.trim(), req.session.userId, (err, id) => {
    if (err) {
      console.error('Failed to add todo:', err);
      return res.status(500).send('Failed to add todo');
    }
    res.redirect('/');
  });
};

exports.completeTodo = (req, res) => {
  if (!req.session.userId) return res.redirect('/login');

  const id = req.params.id;
  Todo.complete(id, req.session.userId, (err) => {
    if (err) {
      console.error('Failed to update todo:', err);
      return res.status(500).send('Failed to update todo');
    }
    res.redirect('/');
  });
};

exports.deleteTodo = (req, res) => {
  if (!req.session.userId) return res.redirect('/login');

  const id = req.params.id;
  Todo.delete(id, req.session.userId, (err) => {
    if (err) {
      console.error('Failed to delete todo:', err);
      return res.status(500).send('Failed to delete todo');
    }
    res.redirect('/');
  });
};

