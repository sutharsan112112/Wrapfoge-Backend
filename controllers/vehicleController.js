import Vehicle from '../models/Vehicle.js';
import Sticker from '../models/Sticker.js';


// Create a new vehicle
export const createVehicle = async (req, res) => {
  try {
    const { name, model, year } = req.body;

    // Determine if the uploaded file is an image or a 3D model (GLB or GLTF)
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';  // Full URL of image or 3D model

    const newVehicle = new Vehicle({
      name,
      model,
      year,
      image: imageUrl,  // Store the URL of the uploaded file (image or 3D model)
    });

    await newVehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', vehicle: newVehicle });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create vehicle', error: err.message });
  }
};


// Get all vehicles
// export const getAllVehicles = async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find().select('name model');
//     res.status(200).json(vehicles);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch vehicles' });
//   }
// };
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().select('name model image');
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};


// Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.vehicleId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
};


// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.vehicleId);
    if (!deletedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
};