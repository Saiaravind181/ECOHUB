import { InnovativeProduct } from '../models/InnovativeProduct.js';
import { InnovativeProdOrder } from '../models/InnovativeProdOrder.js';
import { CreateInnovativeProdOrderSchema, InnovativeProdOrderSchema } from "@abhiram2k03/punarnavah-common";
import{ z } from 'zod';

export const createInnovativeOrder = async (req, res) => {
    try {
        const { innovativeProductId, amount, mobile, address, city, state, pincode } = req.body;
        const userId = req.user.id;

        // Validate only the request body data (without userId)
        const validatedOrder = CreateInnovativeProdOrderSchema.parse({
            amount,
            mobile,
            address,
            city,
            state,
            pincode,
            innovativeProductId
        });

        const product = await InnovativeProduct.findById(validatedOrder.innovativeProductId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.quantity <= 0) {
            return res.status(400).json({
                message: "Product is out of stock"
            });
        }

        const newOrder = await InnovativeProdOrder.create({ 
            amount: validatedOrder.amount,
            mobile: validatedOrder.mobile,
            address: validatedOrder.address,
            city: validatedOrder.city,
            state: validatedOrder.state,
            pincode: validatedOrder.pincode,
            userId: userId,
            innovativeProductId: validatedOrder.innovativeProductId
        });
        const updatedProduct = await InnovativeProduct.findByIdAndUpdate(
            validatedOrder.innovativeProductId,
            { $inc: { quantity: -1 } },
            { new: true }
        );

        return res.status(201).json({
            message: "Ordered Successfully!!",
            newOrder,
            updatedProduct
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
};


export const getInnovativeOrders = async (req, res) => {
    try {
        const allOrders = await InnovativeProdOrder.find({}).lean();

        const validatedOrders = InnovativeProdOrderSchema.array().parse(allOrders);

        return res.status(200).json({
            message: "All Orders fetched successfully!",
            validatedOrders
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

export const getInnovativeOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const gettingOrderById = await InnovativeProdOrder.findById(id).lean()

        const validatedOrder = InnovativeProdOrderSchema.parse(gettingOrderById)

        return res.status(200).json({
            message: "Order fetched successfully!",
            validatedOrder
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

export const updateInnovativeOrder = async (req, res) => {
    try {

        const {id} = req.params;
        const {status} = req.body;

        const changingStatus = await InnovativeProdOrder.findByIdAndUpdate(id, { status }, { new: true }).lean()

        const validatedOrder = InnovativeProdOrderSchema.parse(changingStatus);

        return res.status(200).json({
            message: "Status Changed Successfully!",
            validatedOrder
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