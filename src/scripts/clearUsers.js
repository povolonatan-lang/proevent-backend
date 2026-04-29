import mongoose from 'mongoose';
import User from '../models/User.js';
import Event from '../models/Event.js';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

dotenv.config();

const clearUsers = async () => {
    try {
        await connectDB();

        // Delete all users
        const userResult = await User.deleteMany({});
        console.log(`Deleted ${userResult.deletedCount} users.`);

        // Also delete all events to avoid broken references
        const eventResult = await Event.deleteMany({});
        console.log(`Deleted ${eventResult.deletedCount} events.`);

        console.log('Database cleared successfully (Users and Events).');
        process.exit();
    } catch (error) {
        console.error('Error clearing database:', error);
        process.exit(1);
    }
};

clearUsers();
