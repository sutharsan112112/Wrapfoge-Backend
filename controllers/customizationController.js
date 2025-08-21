import Customization from '../models/Customization.js';

export const createCustomization = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);
    console.log("User:", req.user);

    const { vehicleId, stickers } = req.body;

    if (!vehicleId) {
      return res.status(400).json({ message: "Vehicle ID is required" });
    }
    if (!stickers || stickers.length === 0) {
      return res.status(400).json({ message: "No stickers provided" });
    }

    const customization = await Customization.create({
      vehicleId,         // ✅ now we save vehicleId
      stickers,          // ✅ stickers array
      user: req.user?._id, // Optional: Add this if you want to track user
    });

    res.status(201).json(customization);
  } catch (err) {
    console.error("Customization Save Error:", err);
    res.status(500).json({ message: "Failed to save customization" });
  }
};


export const getCustomizationByVehicleId = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const customization = await Customization.findOne({ vehicleId });

    if (!customization) {
      return res.status(404).json({ message: 'No customization found for this vehicle' });
    }

    res.status(200).json(customization);
  } catch (err) {
    console.error('Fetch Customization Error:', err);
    res.status(500).json({ error: 'Failed to fetch customization' });
  }
};

export const getAllCustomizations = async (req, res) => {
  try {
    const customizations = await Customization.find().populate('vehicleId'); // populate vehicle details

    res.status(200).json(customizations);
  } catch (err) {
    console.error('Fetch All Customizations Error:', err);
    res.status(500).json({ error: 'Failed to fetch all customizations' });
  }
};