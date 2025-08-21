import mongoose from 'mongoose';

const stickerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Sticker = mongoose.model('Sticker', stickerSchema);

export default Sticker;