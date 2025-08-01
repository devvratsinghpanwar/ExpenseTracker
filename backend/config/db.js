const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Mongoose buffers commands, so we don't need to wait for the connection
        // to be fully established before our app starts accepting requests.
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure on connection error
    }
};

module.exports = connectDB;