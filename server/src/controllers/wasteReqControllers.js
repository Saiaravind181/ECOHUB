import { WasteRequest } from '../models/WasteRequest.js';
import { UploadWasteRequestSchema, WasteRequestSchema } from "@abhiram2k03/punarnavah-common";
import { z } from 'zod';

// Mongoose models used in place of Prisma client

export const uploadWasteReq = async (req, res) => {
    try {
        const { image, name, description, requiredQuantity, remainingQuantity, quantityUnit, price } = req.body;

        const userId = req.user?.id;

        // Validate request body fields only; userId comes from auth and may be a MongoDB ObjectId
        const validatedWasteReq = UploadWasteRequestSchema.omit({ userId: true }).parse({
            image,
            name,
            description,
            requiredQuantity,
            remainingQuantity,
            quantityUnit,
            price
        });

        const existingRequest = await WasteRequest.findOne({ name, userId });

        if (existingRequest) {
            return res.status(409).json({ 
                message: "A request with this name already exists for the user" 
            });
        }

        const newWasteRequest = await WasteRequest.create({
            image: validatedWasteReq.image,
            name: validatedWasteReq.name,
            description: validatedWasteReq.description,
            requiredQuantity: validatedWasteReq.requiredQuantity,
            remainingQuantity: validatedWasteReq.remainingQuantity,
            quantityUnit: validatedWasteReq.quantityUnit,
            price: validatedWasteReq.price,
            userId
        });

        return res.status(201).json({
            message: "Successfully Uploaded!",
            newWasteRequest,
        });
    }
    catch(error) { 
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors
            });
        }
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

export const getWasteReq = async (req, res) => {
    try {
        const wasteRequests = await WasteRequest.find({}).lean();

        return res.status(200).json({
            wasteRequests
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors
            });
        }
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

export const getWasteReqById = async (req, res) => {
    try {
        const { id } = req.params;

        const wasteRequest = await WasteRequest.findById(id).lean();

        if (!wasteRequest) {
            return res.status(404).json({
                message: "Waste request not found"
            });
        }

        return res.status(200).json({
            wasteRequest
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors
            });
        }
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

export const getUnsatisfiedWasteReq = async (req, res) => {
    try {
        const wasteRequests = await WasteRequest.find({ remainingQuantity: { $gt: 0 } }).lean();

        return res.status(200).json({
            unsatisfiedRequests: wasteRequests
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors
            });
        }
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}


export const getSatisfiedWasteReq = async (req, res) => {
    try {
        const wasteRequests = await WasteRequest.find({ remainingQuantity: 0 }).lean();

        return res.status(200).json({
            unsatisfiedRequests: wasteRequests
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors
            });
        }
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
} 