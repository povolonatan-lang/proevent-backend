import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import UserRepository from '../repositories/UserRepository.js';
import EmailService from './EmailService.js';

class AuthService {
    async register(userData) {
        const { email } = userData;
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) throw new Error('User already exists');

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const user = await UserRepository.create({
            ...userData,
            verificationToken
        });

        // Send email in background to avoid blocking the registration process
        EmailService.sendVerificationEmail(user.email, verificationToken)
            .then(info => console.log('Email sent successfully:', info.messageId))
            .catch(error => {
                console.warn('Email sending failed. Fallback to terminal link.');
                console.log('--- VERIFICATION LINK ---');
                console.log(`${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`);
                console.log('-------------------------');
            });

        return user;
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        if (!user.isVerified) throw new Error('Please verify your email first');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return { user, token };
    }

    async verifyEmail(token) {
        const user = await UserRepository.findByVerificationToken(token);
        if (!user) throw new Error('Invalid or expired token');

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        return user;
    }
}

export default new AuthService();
