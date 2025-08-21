// models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  title: String,
  price: Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD', 'Card'], default: 'COD' },
  status: { type: String, enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'], default: 'Pending' },
  shippingDetails: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
