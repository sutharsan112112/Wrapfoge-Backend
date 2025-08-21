import express from 'express';
import { createOrder, getMyOrders, getAllOrders ,getUserOrders} from '../controllers/orderController.js';
import { protect, isAdminOrPartner } from '../middleware/authMiddleware.js';
// import { isAdminOrPartner } from '../middleware/serviceMiddleware.js';

const router = express.Router();

// Create new order
router.post('/', protect, createOrder);

// Get my orders
router.get('/my-orders', protect, getMyOrders);

// Admin: get all orders
router.get('/', protect, isAdminOrPartner, getAllOrders);
router.get('/user', protect, getUserOrders);

export default router;

