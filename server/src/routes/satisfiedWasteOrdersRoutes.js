import { Router } from 'express';
import { createSatisfiedOrder, getSatisfiedOrderById, getSatisfiedOrders, updateSatisfiedOrder } from '../controllers/satisfiedWasteOrdersControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const satisfiedWasteOrdersRouter = Router();

satisfiedWasteOrdersRouter.post('/', authMiddleware, createSatisfiedOrder);
satisfiedWasteOrdersRouter.get('/', authMiddleware, getSatisfiedOrders);
satisfiedWasteOrdersRouter.get('/:id', authMiddleware, getSatisfiedOrderById);
satisfiedWasteOrdersRouter.put('/:id', authMiddleware, updateSatisfiedOrder);

export default satisfiedWasteOrdersRouter; 