import { Router } from 'express';
import { uploadBulkWaste, getBulkWaste, getBulkWasteById } from '../controllers/bulkWasteControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const bulkWasteRouter = Router();

bulkWasteRouter.post('/', authMiddleware, uploadBulkWaste);
bulkWasteRouter.get('/', getBulkWaste);
bulkWasteRouter.get('/:id', authMiddleware, getBulkWasteById);

export default bulkWasteRouter; 