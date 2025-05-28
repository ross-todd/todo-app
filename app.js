require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

// Set up the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to support HTTP verbs like PUT and DELETE via query parameter
app.use(methodOverride('_method'));

// Session middleware setup for user login sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Mount authentication routes (login, register, logout)
app.use(authRoutes);

// Mount todo routes (CRUD operations on todos)
app.use(todoRoutes);

// Start the server on port 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
