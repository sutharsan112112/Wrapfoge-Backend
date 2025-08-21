import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true }, // ✅ NEW FIELD
  status: {
    type: String,
    enum: ['Pending', 'Available', 'Unavailable'],
    default: 'Pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });


export default mongoose.model('Service', serviceSchema);