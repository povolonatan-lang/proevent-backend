import express from 'express';
import AuthController from '../controllers/AuthController.js';
import validate from '../middlewares/validationMiddleware.js';
import { registerSchema, loginSchema } from '../utils/validations.js';

const router = express.Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/verify', AuthController.verifyEmail);

export default router;
