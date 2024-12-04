const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/userRoutes');


// Load environment variables
dotenv.config();

// Check if required environment variables are set
if (!process.env.URI_MONGODB || !process.env.JWT_SECRET) {
    console.error('Please ensure that URI_MONGODB and JWT_SECRET are set in your .env file');
    process.exit(1); // Exit if required variables are missing
}

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/user', authRoutes); // User-related routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
