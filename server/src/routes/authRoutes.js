import { Router } from 'express';
import { forgotPassword, logout, signin, signup, profile, resetPassword } from '../controllers/authControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/forgot-password', forgotPassword);
authRouter.get('/profile', authMiddleware, profile);
authRouter.post('/reset-password/:token', authMiddleware, resetPassword);
authRouter.post('/logout', logout);

export default authRouter; 