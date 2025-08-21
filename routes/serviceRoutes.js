import express from 'express';
import { 
  getAllServices, 
  createService, 
  updateServiceStatus, 
  deleteService 
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdminOrPartner } from '../middleware/serviceMiddleware.js';
import upload from '../middleware/multerMiddleware.js'; // Import multer

const router = express.Router();

// Public route to get all services
router.get('/', getAllServices);

// Protected route to create a service (requires authentication and authorization)
router.post('/', protect, isAdminOrPartner, upload.single('image'), createService); // Use upload.single() for file handling
router.put('/:id/status', protect, isAdminOrPartner, updateServiceStatus);
router.delete('/:id', protect, isAdminOrPartner, deleteService);

export default router;
