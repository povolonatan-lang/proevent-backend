import mongoose from 'mongoose';
import Category from '../models/Category.js';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

dotenv.config();

const seedCategories = async () => {
    try {
        await connectDB();

        // Clear existing categories
        await Category.deleteMany();

        const categories = [
            { name: 'UFC', description: 'Ultimate Fighting Championship events' },
            { name: 'F1', description: 'Formula 1 racing events' }
        ];

        await Category.insertMany(categories);

        console.log('Categories seeded successfully: UFC and F1');
        process.exit();
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
};

seedCategories();
