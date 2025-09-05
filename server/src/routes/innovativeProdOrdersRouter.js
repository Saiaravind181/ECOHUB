import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createInnovativeOrder, getInnovativeOrderById, getInnovativeOrders, updateInnovativeOrder } from '../controllers/innovativeProdOrdersControllers.js';

const innovativeProdOrdersRouter = Router();

innovativeProdOrdersRouter.post('/', authMiddleware, createInnovativeOrder);
innovativeProdOrdersRouter.get('/', authMiddleware, getInnovativeOrders);
innovativeProdOrdersRouter.get('/:id', authMiddleware, getInnovativeOrderById);
innovativeProdOrdersRouter.put('/:id', authMiddleware, updateInnovativeOrder);

export default innovativeProdOrdersRouter; 