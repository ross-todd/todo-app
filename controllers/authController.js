const Todo = require('../models/todoModel');
const bcrypt = require('bcryptjs');

// Render registration page
exports.showRegister = (req, res) => {
  res.render('register', { error: null });
};

// Handle user registration
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Username and password must be provided
  if (!username || !password) {
    return res.render('register', { error: 'Please provide username and password' });
  }

  // Validate username length
  if (username.length < 8) {
    return res.render('register', { error: 'Username must be at least 8 characters' });
  }

  // Validate password requirements
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.render('register', {
      error: 'Password must be at least 8 characters, include a capital letter and a special character'
    });
  }

  // Proceed to create user
  Todo.createUser(username, password, (err, id) => {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.render('register', { error: 'Username already taken' });
      }
      return res.render('register', { error: 'Server error' });
    }
    res.redirect('/login');
  });
};


// Render login page
exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

// Handle user login
exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('login', { error: 'Please provide username and password' });
  }

  Todo.findUserByUsername(username, (err, user) => {
    if (err) return res.render('login', { error: 'Server error' });
    if (!user) return res.render('login', { error: 'Invalid username or password' });

    bcrypt.compare(password, user.password_hash, (err, result) => {
        if (err) {
            console.error('bcrypt.compare error:', err);
            return res.render('login', { error: 'Server error during password check' });
        }
        
        // Successful login: set session and redirect
        req.session.userId = user.id;
        req.session.username = user.username;
        res.redirect('/');
    });

  });
};

// Handle user logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
