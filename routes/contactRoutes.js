import express from 'express';
const router = express.Router();

import {
  sendMessage,
  getAllMessages,
  replyToMessage,
  updateContactMessage,
  deleteContactMessage
} from '../controllers/contactController.js';

import { isAdmin } from '../middleware/contactMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

// Send message (user/partner)
router.post('/send',protect, sendMessage);

// Get all messages (admin)
router.get('/', protect, isAdmin, getAllMessages);

// Reply to a message (admin)
router.post('/reply/:id', protect, isAdmin, replyToMessage);

// Update own message (user/partner)
router.put('/:id', protect, updateContactMessage);

// Delete a message (admin)
router.delete('/:id', protect, isAdmin, deleteContactMessage);

export default router;