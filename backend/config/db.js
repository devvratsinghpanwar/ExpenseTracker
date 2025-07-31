const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log('MongoDB already connected');
        return mongoose.connection;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not set');
        }

        console.log('Connecting to MongoDB...');
        
        // Disconnect if there's an existing connection in a bad state
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
            bufferMaxEntries: 0,
            maxPoolSize: 10,
            minPoolSize: 5,
        });

        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            isConnected = false;
        });

        return conn;
        
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        isConnected = false;
        throw error;
    }
};

module.exports = connectDB;
