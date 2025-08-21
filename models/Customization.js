import mongoose from 'mongoose';

const stickerSchema = new mongoose.Schema({
  src: String,
  x: Number,
  y: Number,
});

const customizationSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  stickers: [stickerSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Customization', customizationSchema);