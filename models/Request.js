// models/Request.js
import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customization',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

export default Request;
