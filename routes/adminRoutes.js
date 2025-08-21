import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

import {
  getItems, createItem, updateItem, deleteItem,
  getUsers, updateUser, deleteUser,
  getPartners, updatePartner, deletePartner
} from '../controllers/adminController.js';

const router = express.Router();

// ===== Item Routes (Admin Only) =====
router.get('/items', protect, isAdmin, getItems);
router.post('/items', protect, isAdmin, createItem);
router.put('/items/:id', protect, isAdmin, updateItem);
router.delete('/items/:id', protect, isAdmin, deleteItem);

// ===== User Routes (Admin Only) =====
router.get('/users', protect, isAdmin, getUsers);
router.put('/users/:id', protect, isAdmin, updateUser);
router.delete('/users/:id', protect, isAdmin, deleteUser);

// ===== Partner Routes =====
// ✅ Any authenticated user can view partners
router.get('/partners', protect, getPartners);

// 🔒 Only admin can update/delete partner
router.put('/partners/:id', protect, isAdmin, updatePartner);
router.delete('/partners/:id', protect, isAdmin, deletePartner);

export default router;
