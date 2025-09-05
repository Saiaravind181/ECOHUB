import { Router } from "express";
import { uploadInnovativeProd, getInnovativeProd, getInnovativeProdById } from "../controllers/innovativeProdsControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const innovativeProdsRouter = Router();

innovativeProdsRouter.post('/', authMiddleware, uploadInnovativeProd);
innovativeProdsRouter.get('/', getInnovativeProd);
innovativeProdsRouter.get('/:id', authMiddleware, getInnovativeProdById);

export default innovativeProdsRouter; 