import express from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicleController.js';
import upload from '../middleware/upload.js';

import { vehicleMiddleware } from '../middleware/vehiclemiddleware.js'

const router = express.Router();

// GET all vehicles
router.get('/', getAllVehicles);

// GET single vehicle
router.get('/:vehicleId', vehicleMiddleware, getVehicleById);

// POST new vehicle
router.post('/', upload.single('image'), createVehicle); // image = field name

// PUT update vehicle
router.put('/vehicles/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,   // <- id என்று மாற்றினேன்
      {
        name: req.body.name,
        model: req.body.model,
        year: req.body.year,
        ...(req.file && { image: `/uploads/${req.file.filename}` })
      },
      { new: true, runValidators: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle updated', vehicle: updatedVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update vehicle', error: error.message });
  }
});

// DELETE vehicle
router.delete('/:vehicleId', vehicleMiddleware, deleteVehicle);

export default router;