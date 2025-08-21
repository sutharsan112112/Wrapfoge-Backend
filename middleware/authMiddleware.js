import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Stripe from 'stripe';

// ✅ Protect route: verifies JWT token and loads user info
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next(); // ✅ Always allow, role check happens in separate middleware
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};




// 🛡️ Admin only access
export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  return res.status(403).json({ message: 'Access denied: Admins only.' });
};

// 👥 Admin or Partner access
export const isAdminOrPartner = (req, res, next) => {
  const role = req.user?.role;
  if (role === 'admin' || role === 'partner') return next();
  return res.status(403).json({ message: 'Access denied: Only admin or partner allowed' });
};

// 👥 User or Partner access
export const isUserOrPartner = (req, res, next) => {
  const role = req.user?.role;
  if (role === 'user' || role === 'partner') return next();
  return res.status(403).json({ message: 'Access denied: Users or Partners only.' });
};

// 💳 Stripe payment verification middleware
export const verifyStripePayment = async (req, res, next) => {
  const { paymentIntentId } = req.body;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status === 'succeeded') {
      req.payment = paymentIntent;
      return next();
    } else {
      return res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Payment verification failed', error: err.message });
  }
};
