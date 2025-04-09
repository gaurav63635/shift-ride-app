const dotenv = require('dotenv'); // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file

const express = require('express'); // Import Express to create the app
const cors = require('cors'); // Import CORS middleware for cross-origin requests
const app = express(); // Create an Express app

const cookieParser = require('cookie-parser'); // Import cookie-parser to handle cookies
const connectToDb = require('./db/db'); // Import function to connect to the database

// Import route files for users, captains, maps, and rides
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

// Connect to the database
connectToDb();

// CORS setup to allow requests from your frontend
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If cookies or authorization headers are used
};

// Use middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data (for form submissions)
app.use(cookieParser()); // Parse cookies from incoming requests

// Test route
app.get('/', (req, res) => {
    res.send('Hello World'); // Simple response for testing
});

// Set up routes for users, captains, maps, and rides
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app; // Export the app for use in server.js
