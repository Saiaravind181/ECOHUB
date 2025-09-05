import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createBulkWasteOrder, getBulkWasteOrders, getBulkWasteOrderById, updateBulkWasteOrder  } from '../controllers/bulkWasteOrdersControllers.js';

const bulkWasteOrdersRouter = Router();

bulkWasteOrdersRouter.post('/', authMiddleware, createBulkWasteOrder);
bulkWasteOrdersRouter.get('/', authMiddleware, getBulkWasteOrders);
bulkWasteOrdersRouter.get('/:id', authMiddleware, getBulkWasteOrderById);
bulkWasteOrdersRouter.put('/:id', authMiddleware, updateBulkWasteOrder);

export default bulkWasteOrdersRouter; 