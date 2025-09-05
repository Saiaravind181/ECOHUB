import { UploadBulkWasteSchema } from "@abhiram2k03/punarnavah-common";
import { z } from 'zod';
import { BulkWaste } from '../models/BulkWaste.js';

// Using Mongoose models

export const uploadBulkWaste = async (req, res) => {
    try {
       const { image, name, description, price, quantityAvailable, quantityUnit } = req.body;

       const validatedBulkWaste = UploadBulkWasteSchema.parse({
            image,
            name,
            description,
            price,
            quantityAvailable,
            quantityUnit,
       });
    
       const newBulkWaste = await BulkWaste.create({
            image: validatedBulkWaste.image,
            name: validatedBulkWaste.name,
            description: validatedBulkWaste.description,
            price: validatedBulkWaste.price,
            quantityAvailable: validatedBulkWaste.quantityAvailable,
            quantityUnit: validatedBulkWaste.quantityUnit,
       })

       return res.status(201).json({
            message: "Waste Uploaded Successfully!!",
            newBulkWaste
       })
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

export const getBulkWaste = async (req, res) => {
    try {
        const getWaste = await BulkWaste.find({}).lean();

        return res.status(200).json({
            message: "Wastes received Successfully!",
            waste: getWaste
        })
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

export const getBulkWasteById = async (req, res) => {
    try {
        const { id } = req.params;

        const getWasteById = await BulkWaste.findById(id).lean();

        return res.status(200).json({
            message: "Successfully retrieved Waste ",
            waste: getWasteById
        })
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