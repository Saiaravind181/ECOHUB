import mongoose from 'mongoose';

const innovativeProdOrderSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  status: { type: String, default: 'processing' },
  innovativeProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'InnovativeProduct', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const InnovativeProdOrder = mongoose.models.InnovativeProdOrder || mongoose.model('InnovativeProdOrder', innovativeProdOrderSchema);


