const http = require('http'); // Node.js module to create an HTTP server
const app = require('./app'); // Import the Express app (or main application logic)
const { initializeSocket } = require('./socket'); // Import function to initialize WebSocket communication
require('dotenv').config(); // Load environment variables from a .env file

// Define the port for the server. Use the value from .env, or default to 5000
const port = process.env.PORT || 5000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize WebSocket communication for real-time features
initializeSocket(server);

// Start the server and listen on the defined port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
