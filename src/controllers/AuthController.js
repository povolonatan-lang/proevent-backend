import AuthService from '../services/AuthService.js';

const AuthController = {
    register: async (req, res, next) => {
        console.log('Registering user:', req.body.email);
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json({
                message: 'User registered successfully. Please check your email to verify your account.',
                verificationToken: user.verificationToken,
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error('Registration Error:', error.message);
            res.status(400).json({ message: error.message });
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { user, token } = await AuthService.login(email, password);
            res.json({
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
                token
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },

    verifyEmail: async (req, res, next) => {
        try {
            const { token } = req.query;
            await AuthService.verifyEmail(token);
            res.json({ message: 'Email verified successfully. You can now login.' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    clearAll: async (req, res, next) => {
        try {
            const User = (await import('../models/User.js')).default;
            const Event = (await import('../models/Event.js')).default;
            await User.deleteMany({});
            await Event.deleteMany({});
            res.json({ message: 'Database cleared successfully (Users and Events deleted).' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    testEmail: async (req, res, next) => {
        try {
            const EmailService = (await import('../services/EmailService.js')).default;
            const info = await EmailService.sendVerificationEmail(process.env.SMTP_USER, 'test-token');
            res.json({ message: 'Email sent successfully!', info });
        } catch (error) {
            console.error('Test email error:', error);
            res.status(500).json({ 
                message: 'Failed to send email', 
                error: error.message,
                stack: error.stack
            });
        }
    }
};

export default AuthController;
