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

        // Send email in background - don't make the user wait for SMTP connection
        EmailService.sendVerificationEmail(user.email, verificationToken)
            .then(() => console.log('Verification email sent successfully in background to:', user.email))
            .catch(error => console.error('CRITICAL: Background email error:', error));

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
