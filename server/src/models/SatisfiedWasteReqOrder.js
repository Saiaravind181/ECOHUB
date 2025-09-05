import mongoose from 'mongoose';

const satisfiedWasteReqOrderSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  status: { type: String, default: 'processing' },
  satisfiedWasteReqId: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteRequest', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const SatisfiedWasteReqOrder = mongoose.models.SatisfiedWasteReqOrder || mongoose.model('SatisfiedWasteReqOrder', satisfiedWasteReqOrderSchema);


