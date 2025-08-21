import express from 'express';
import { createRequest, getRequestsForPartner } from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔘 User sends a customization request to a partner
router.post('/send', protect, createRequest);

// 🔍 Partner views requests sent to them
router.get('/partner', protect, getRequestsForPartner);

export default router;