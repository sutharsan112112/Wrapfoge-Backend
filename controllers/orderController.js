import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware
    const { items, totalAmount, paymentMethod, shippingDetails } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order items required' });
    }

    const order = new Order({
      userId,
      items,
      totalAmount,
      paymentMethod,
      shippingDetails,
      status: 'Pending', // default or based on logic
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};


// Get all orders for logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id; // req.user set by auth middleware
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

