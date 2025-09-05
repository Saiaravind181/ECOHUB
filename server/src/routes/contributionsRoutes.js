import {Router} from 'express';
import { contribute } from '../controllers/contributionsControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const contributionsRouter = Router();

contributionsRouter.post('/:wasteRequestId', authMiddleware, contribute);

export default contributionsRouter; 