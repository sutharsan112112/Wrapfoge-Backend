import express from 'express';
import multer from 'multer';
import {
  createSticker,
  getAllStickers,
  getStickerById,
  updateSticker,
  deleteSticker
} from '../controllers/stickerController.js';

import { isAdminOrPartner } from '../middleware/stickerMiddleware.js';
import { protect} from '../middleware/authMiddleware.js';

const router = express.Router();

// Setup Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes

// Anyone can GET stickers
router.get('/', getAllStickers);

// getting single sticker by ID
router.get('/:id', getStickerById);

// Admin/Partner can POST stickers with image
router.post(
  '/',
  protect,
  isAdminOrPartner,
  upload.single('image'),
  createSticker
);

// Admin/Partner can UPDATE (can include image in body or new upload logic later)
router.put(
  '/:id',
  protect,
  isAdminOrPartner,
  upload.single('image'),  // ✅ Add multer for PUT
  updateSticker
);


// ⬅️ Admin/Partner can DELETE
router.delete(
  '/:id',
  protect,
  isAdminOrPartner,
  deleteSticker
);

export default router;