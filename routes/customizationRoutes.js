import express from 'express';
import {
  createCustomization,
  getCustomizationByVehicleId,
  getAllCustomizations
} from '../controllers/customizationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCustomization);
router.get('/:vehicleId', protect, getCustomizationByVehicleId);
router.get('/', protect, getAllCustomizations);
export default router;