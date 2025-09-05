import { z } from 'zod';
import { User } from '../models/User.js';
import { WasteRequest } from '../models/WasteRequest.js';
import { Contribution } from '../models/Contribution.js';
import { InnovativeProduct } from '../models/InnovativeProduct.js';
import { SatisfiedWasteReqOrder } from '../models/SatisfiedWasteReqOrder.js';
import { InnovativeProdOrder } from '../models/InnovativeProdOrder.js';
import { BulkWasteOrder } from '../models/BulkWasteOrder.js';



// export const getUserInfo = async (req, res) => {
//     try {
//         const userId =  req.user?.id;

//         const user = await prisma.user.findFirst({
//             include: {
//                 wasteRequests: true,
//                 contributions: true,
//                 innovativeProducts: true,
//                 wasteReqOrders: true,
//                 innovativeProdOrders: true,
//                 bulkWasteOrders: true,
//             },
//             where: {
//                 id: userId
//             },  
//         })
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const validatedUserData = UserSchema.parse(user);

//         return res.status(200).json({
//             message: "User details fetched successfully",
//             validatedUserData
//         })
//     }
//     catch(error) { 
//         if (error instanceof z.ZodError) {
//             return res.status(400).json({
//                 message: "Validation Error",
//                 errors: error.errors
//             });
//         }
//         return res.status(500).json({
//             message: "Server Error",
//             error: error.message
//         });
//     }
// }




export const getUserInfo = async (req, res) => {
    try {
        const userId = req.user?.id;

        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const wasteRequests = await WasteRequest.find({ userId }).lean();
        const contributions = await Contribution.find({ userId }).lean();
        const innovativeProducts = await InnovativeProduct.find({ userId }).lean();
        const wasteReqOrders = await SatisfiedWasteReqOrder.find({ userId }).lean();
        const innovativeProdOrders = await InnovativeProdOrder.find({ userId }).lean();
        const bulkWasteOrders = await BulkWasteOrder.find({ userId }).lean();

        // Prepare plain response without strict cuid-based validation
        const responseUser = {
            id: user._id?.toString(),
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            wasteRequests,
            contributions,
            innovativeProducts,
            wasteReqOrders,
            innovativeProdOrders,
            bulkWasteOrders
        };

        return res.status(200).json({
            message: "User details fetched successfully",
            user: responseUser
        });
    } catch(error) {
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