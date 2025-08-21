import mongoose from 'mongoose';

export const vehicleMiddleware = (req, res, next) => {
  const { vehicleId } = req.params;
  
  if (!vehicleId) {
    return res.status(400).json({ error: 'Vehicle ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ error: 'Invalid vehicle ID format' });
  }

  next();
};