import mongoose from 'mongoose';

const bulkWasteOrderSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  status: { type: String, default: 'processing' },
  bulkWasteId: { type: mongoose.Schema.Types.ObjectId, ref: 'BulkWaste', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const BulkWasteOrder = mongoose.models.BulkWasteOrder || mongoose.model('BulkWasteOrder', bulkWasteOrderSchema);


