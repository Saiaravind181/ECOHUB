import { InnovativeProduct } from '../models/InnovativeProduct.js';
import { UploadInnovativeProductSchema } from "@abhiram2k03/punarnavah-common";
import { z } from 'zod';

// Using Mongoose models

export const uploadInnovativeProd = async (req, res) => {
    try {
        const { image, name, description, price, quantity, materialsUsed } = req.body;   

        const userId = req.user?.id;

        const validatedInnovativeProd = UploadInnovativeProductSchema.omit({ userId: true }).parse({
            image,
            name,
            description,
            price,
            quantity,
            materialsUsed
        })

        const existingProduct = await InnovativeProduct.findOne({ name, userId });

        if (existingProduct) {
            return res.status(409).json({ 
                message: "A Product with this name already exists for the user" 
            });
        }

        const newProduct = await InnovativeProduct.create({
            image: validatedInnovativeProd.image,
            name: validatedInnovativeProd.name,
            description: validatedInnovativeProd.description,
            price: validatedInnovativeProd.price,
            quantity: validatedInnovativeProd.quantity,
            materialsUsed: validatedInnovativeProd.materialsUsed,
            userId
        })

        return res.status(201).json({
            message: "Product Uploaded successfully!!",
            newProduct
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

export const getInnovativeProd = async (req, res) => {
    try {
        const getProducts = await InnovativeProduct.find({}).lean();

        return res.status(200).json({
            message: "All Products are",
            products: getProducts
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

export const getInnovativeProdById = async (req, res) => {
    try{

        const id = req.params.id;


        const getProdById = await InnovativeProduct.findById(id).lean();

        if (!getProdById) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Innovative Product Fetched Successfully",
            product: getProdById
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