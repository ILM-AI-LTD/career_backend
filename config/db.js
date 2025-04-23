const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    ssl: true,
    tls: true
})
.then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

// Handle process termination
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('Mongoose connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error closing mongoose connection:', err);
        process.exit(1);
    }
});

module.exports = mongoose.connection; 