const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const todoRoutes = require('./routes/todoRoutes');

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse POST data
app.use(express.urlencoded({ extended: true }));

// To support HTTP verbs like PUT and DELETE via forms (method override)
app.use(methodOverride('_method'));

// Use your todo routes
app.use('/', todoRoutes);

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
