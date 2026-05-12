import mongoose from 'mongoose';
import User from '../models/User.js';
import Event from '../models/Event.js';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

dotenv.config();

const clearDatabase = async () => {
    try {
        await connectDB();

        // Delete all users
        const userResult = await User.deleteMany({});
        console.log(`Successfully deleted ${userResult.deletedCount} users.`);

        // Delete all events
        const eventResult = await Event.deleteMany({});
        console.log(`Successfully deleted ${eventResult.deletedCount} events.`);

        console.log('Database cleanup completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing database:', error);
        process.exit(1);
    }
};

clearDatabase();
