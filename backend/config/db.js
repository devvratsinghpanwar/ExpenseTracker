const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check if already connected
        if (mongoose.connections[0].readyState) {
            console.log('MongoDB already connected');
            return;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
