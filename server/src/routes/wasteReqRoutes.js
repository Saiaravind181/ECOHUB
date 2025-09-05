import { Router } from "express";
import { uploadWasteReq, getWasteReq, getWasteReqById, getUnsatisfiedWasteReq, getSatisfiedWasteReq } from "../controllers/wasteReqControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const wasteReqRouter = Router();

wasteReqRouter.post('/', authMiddleware, uploadWasteReq);
wasteReqRouter.get('/', getWasteReq);
wasteReqRouter.get('/unsatisfied', getUnsatisfiedWasteReq);
wasteReqRouter.get('/satisfied', authMiddleware, getSatisfiedWasteReq);
wasteReqRouter.get('/:id', authMiddleware, getWasteReqById);


export default wasteReqRouter; 