const Todo = require('../models/todoModel');

exports.listTodos = (req, res) => {
  Todo.getAll((err, todos) => {
    if (err) return res.status(500).send('Database error');
    res.render('index', { todos });
  });
};

exports.addTodo = (req, res) => {
  const text = req.body.text;
  if (!text || text.trim() === '') {
    return res.redirect('/');
  }
  Todo.add(text.trim(), (err, id) => {
    if (err) return res.status(500).send('Failed to add todo');
    res.redirect('/');
  });
};

exports.completeTodo = (req, res) => {
  const id = req.params.id;
  Todo.complete(id, (err) => {
    if (err) return res.status(500).send('Failed to update todo');
    res.redirect('/');
  });
};

exports.deleteTodo = (req, res) => {
  const id = req.params.id;
  Todo.delete(id, (err) => {
    if (err) return res.status(500).send('Failed to delete todo');
    res.redirect('/');
  });
};
