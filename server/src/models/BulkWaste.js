import mongoose from 'mongoose';

const bulkWasteSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantityAvailable: { type: Number, required: true },
  quantityUnit: { type: String, required: true },
}, { timestamps: true });

export const BulkWaste = mongoose.models.BulkWaste || mongoose.model('BulkWaste', bulkWasteSchema);


