import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number },
  image: { type: String }, // New field for 3D model file path or image URL

});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;