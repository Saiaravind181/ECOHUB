import mongoose from 'mongoose';

const wasteRequestSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  requiredQuantity: { type: Number, required: true },
  remainingQuantity: { type: Number, required: true },
  quantityUnit: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const WasteRequest = mongoose.models.WasteRequest || mongoose.model('WasteRequest', wasteRequestSchema);


