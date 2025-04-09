const express = require('express'); // Importing Express to create routes
const router = express.Router(); // Creating a router instance
const { body } = require("express-validator"); // Importing body validator from express-validator
const userController = require('../controllers/user.controller'); // Importing user controller for handling user-related logic
const authMiddleware = require('../middlewares/auth.middleware'); // Importing authentication middleware to protect routes

// Route for user registration
router.post('/register', [
    // Validate email: must be a valid email format
    body('email').isEmail().withMessage('Invalid Email'),
    // Validate first name: must be at least 3 characters long
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    // Validate password: must be at least 6 characters long
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser // Call the registerUser method from userController
);

// Route for user login
router.post('/login', [
    // Validate email: must be a valid email format
    body('email').isEmail().withMessage('Invalid Email'),
    // Validate password: must be at least 6 characters long
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser // Call the loginUser method from userController
);

// Route to fetch the user profile
router.get('/profile', 
    authMiddleware.authUser, // Middleware to check if the user is authenticated
    userController.getUserProfile // Call the getUserProfile method from userController
);

// Route to logout the user
router.get('/logout', 
    authMiddleware.authUser, // Middleware to check if the user is authenticated
    userController.logoutUser // Call the logoutUser method from userController
);

module.exports = router; // Export the router to be used in other parts of the application
