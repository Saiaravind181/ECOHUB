import { Router } from 'express';
import { getUserInfo } from '../controllers/userControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.get('/', authMiddleware, getUserInfo);

export default userRouter; 