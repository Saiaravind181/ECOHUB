import { z } from "zod";

export const UploadContributionSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),
  quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
  wasteRequestId: z.string().min(1, { message: "Waste request ID is required" }),
  userId: z.string().min(1, { message: "User ID is required" }).optional(),
});
  
export const ContributionSchema = UploadContributionSchema.extend({
  id: z.string().min(1, { message: "Invalid contribution ID format" }),
});

// inferred type
export const UploadContributionType = UploadContributionSchema;
export const ContributionType = ContributionSchema;
