const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Show login page
router.get('/login', authController.showLogin);

// Handle login form submission
router.post('/login', authController.login);

// Show registration page
router.get('/register', authController.showRegister);

// Handle registration form submission
router.post('/register', authController.register);

// Handle logout request
router.post('/logout', authController.logout);

module.exports = router;
