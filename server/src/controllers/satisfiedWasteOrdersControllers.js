import { SatisfiedWasteReqOrder } from '../models/SatisfiedWasteReqOrder.js';
import { WasteRequest } from '../models/WasteRequest.js';
import { CreateSatisfiedWasteReqOrderSchema, SatisfiedWasteReqOrderSchema } from "@abhiram2k03/punarnavah-common";
import{ z } from 'zod';


export const createSatisfiedOrder = async (req, res) => {
    try {
        
        const { satisfiedWasteReqId, amount, mobile, address, city, state, pincode } = req.body;

        const userId = req.user.id;

        // Validate only the request body data (without userId)
        const validatedOrder = CreateSatisfiedWasteReqOrderSchema.parse({
            amount,
            mobile,
            address,
            city,
            state,
            pincode,
            satisfiedWasteReqId
        })

        const newOrder = await SatisfiedWasteReqOrder.create({
            satisfiedWasteReqId: validatedOrder.satisfiedWasteReqId,
            amount: validatedOrder.amount,
            mobile: validatedOrder.mobile,
            address: validatedOrder.address,
            city: validatedOrder.city,
            state: validatedOrder.state,
            pincode: validatedOrder.pincode,
            userId: userId
        })

        return res.status(201).json({
            message: "Ordered Successfully!!",
            newOrder
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

export const getSatisfiedOrders = async (req, res) => {
    try {
        const allOrders = await SatisfiedWasteReqOrder.find({}).lean();

        const validatedOrders = SatisfiedWasteReqOrderSchema.array().parse(allOrders);

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

export const getSatisfiedOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const gettingOrderById = await SatisfiedWasteReqOrder.findById(id).lean()

        const validatedOrder = SatisfiedWasteReqOrderSchema.parse(gettingOrderById)

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

export const updateSatisfiedOrder = async (req, res) => {
    try {

        const {id} = req.params;
        const {status} = req.body;

        const changingStatus = await SatisfiedWasteReqOrder.findByIdAndUpdate(id, { status }, { new: true }).lean()

        const validatedOrder = SatisfiedWasteReqOrderSchema.parse(changingStatus);

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