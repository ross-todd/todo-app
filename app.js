require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use(authRoutes);
app.use(todoRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
