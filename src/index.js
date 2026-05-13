import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';
import CategoryService from './services/CategoryService.js';

const startServer = async () => {
    // Connect to database
    await connectDB();

    // Initialize default categories if needed
    await CategoryService.initialize();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
};

startServer();
