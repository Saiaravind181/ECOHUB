import { BulkWaste } from '../models/BulkWaste.js';
import { BulkWasteOrder } from '../models/BulkWasteOrder.js';
import { CreateBulkWasteOrderSchema, BulkWasteOrderSchema } from "@abhiram2k03/punarnavah-common";
import{ z } from 'zod';


export const createBulkWasteOrder = async (req, res) => {
    try {
        const { bulkWasteId, amount, mobile, address, city, state, pincode } = req.body;

        const userId = req.user?.id;

        // Validate only the request body data (without userId)
        const validatedOrder = CreateBulkWasteOrderSchema.parse({
            amount,
            mobile,
            address,
            city,
            state,
            pincode,
            bulkWasteId
        });
        
        const newOrder = await BulkWasteOrder.create({ 
            amount: validatedOrder.amount,
            mobile: validatedOrder.mobile,
            address: validatedOrder.address,
            city: validatedOrder.city,
            state: validatedOrder.state,
            pincode: validatedOrder.pincode,
            bulkWasteId: validatedOrder.bulkWasteId,
            userId: userId
        });
        const updatedBulkWaste = await BulkWaste.findByIdAndUpdate(
            validatedOrder.bulkWasteId,
            { $inc: { quantityAvailable: -1 } },
            { new: true }
        );

        return res.status(201).json({
            message: "Ordered Successfully!!",
            newOrder,
            updatedBulkWaste
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


export const getBulkWasteOrders = async (req, res) => {
    try {
        const allOrders = await BulkWasteOrder.find({}).lean();

        const validatedOrders = BulkWasteOrderSchema.array().parse(allOrders);

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

export const getBulkWasteOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const gettingOrderById = await BulkWasteOrder.findById(id).lean()

        const validatedOrder = BulkWasteOrderSchema.parse(gettingOrderById)

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

export const updateBulkWasteOrder = async (req, res) => {
    try {

        const {id} = req.params;
        const {status} = req.body;

        const changingStatus = await BulkWasteOrder.findByIdAndUpdate(id, { status }, { new: true }).lean()

        const validatedOrder = BulkWasteOrderSchema.parse(changingStatus);

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