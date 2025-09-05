import { z } from "zod";
import { ContributionSchema } from "./contributionsSchema.js";

export const UploadWasteRequestSchema = z.object({
    image: z.string({message :"Image is required"}).url({ message: "Invalid image URL" }),
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    requiredQuantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    remainingQuantity: z.number().int({ message: "Quantity must be a positive integer" }).min(0, { message: "Quantity must be equal to or greater than 0" }),
    quantityUnit: z.string().min(1, { message: "Quantity unit is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    userId: z.string().min(1, { message: "User ID is required" }).optional(),
});
  
export const WasteRequestSchema = UploadWasteRequestSchema.extend({
    id: z.string().min(1, { message: "Invalid waste request ID format" }),
    contributions: z.array(ContributionSchema, { message: "Contributions Array is Required" }),
});

// inferred type
export const UploadWasteRequestType = UploadWasteRequestSchema;
export const WasteRequestType = WasteRequestSchema;
