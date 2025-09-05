import mongoose from 'mongoose';

const innovativeProductSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  materialsUsed: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const InnovativeProduct = mongoose.models.InnovativeProduct || mongoose.model('InnovativeProduct', innovativeProductSchema);


