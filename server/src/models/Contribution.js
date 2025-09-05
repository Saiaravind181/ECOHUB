import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  quantity: { type: Number, required: true },
  wasteRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteRequest', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Contribution = mongoose.models.Contribution || mongoose.model('Contribution', contributionSchema);


