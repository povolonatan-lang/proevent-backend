import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';

dotenv.config();

const seedTestUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const email = 'test@proevent.com';
        const password = 'password123';

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Test user already exists.');
            process.exit(0);
        }

        const newUser = new User({
            name: 'Test User',
            email,
            password, // Mongoose pre-save hook will hash it
            isVerified: true,
            role: 'user'
        });

        await newUser.save();
        console.log(`Test user created successfully:
- Email: ${email}
- Password: ${password}
- Verified: true`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding test user:', error);
        process.exit(1);
    }
};

seedTestUser();
