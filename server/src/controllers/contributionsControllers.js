import { WasteRequest } from '../models/WasteRequest.js';
import { Contribution } from '../models/Contribution.js';
import { z } from 'zod';
import { UploadContributionSchema } from "@abhiram2k03/punarnavah-common";

// Using Mongoose models

export const contribute = async (req, res) => {
    try {
        const { mobile, address, city, state, pincode, quantity } = req.body;
        const { wasteRequestId } = req.params;

        const userId = req.user?.id;

        // Validate only the request body data (without userId)
        const validateContribute = UploadContributionSchema.parse({
            mobile,
            address,
            city,
            state,
            pincode,
            quantity,
            wasteRequestId
        });

        const wasteRequest = await WasteRequest.findById(wasteRequestId).select('remainingQuantity');

        if (!wasteRequest) {
            return res.status(404).json({
                message: "Waste request not found."
            });
        }

        if (validateContribute.quantity > wasteRequest.remainingQuantity) {
            return res.status(400).json({
                message: `You can contribute a maximum of ${wasteRequest.remainingQuantity} units.`
            });
        }

        // Without transactions (single-node/non-replica), perform sequential operations
        const updatedRequest = await WasteRequest.findByIdAndUpdate(
            wasteRequestId,
            { $inc: { remainingQuantity: -validateContribute.quantity } },
            { new: true }
        );
        const newContribute = await Contribution.create({ 
            mobile: validateContribute.mobile,
            address: validateContribute.address,
            city: validateContribute.city,
            state: validateContribute.state,
            pincode: validateContribute.pincode,
            quantity: validateContribute.quantity,
            wasteRequestId: validateContribute.wasteRequestId,
            userId: userId
        });

        return res.status(201).json({
            message: "Contribution added successfully!",
            newContribute,
            updatedRequest
        });
    } catch (error) {
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