import { Router } from 'express';
import { payment, verifyPayment } from '../controllers/paymentControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const paymentRouter = Router();

paymentRouter.get('/', authMiddleware, payment);
paymentRouter.post('/', authMiddleware, verifyPayment);

export default paymentRouter; 