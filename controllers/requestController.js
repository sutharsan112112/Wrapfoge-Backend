// controllers/requestController.js
import mongoose from 'mongoose';
import Request from '../models/Request.js';
import User from '../models/User.js';
import Customization from '../models/Customization.js';

// ✅ User creates request
export const createRequest = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("User from token:", req.user);

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { partnerId, customizationId } = req.body;

    if (!partnerId || !customizationId) {
      return res.status(400).json({ message: 'partnerId and customizationId are required' });
    }

    const newRequest = new Request({
  userId,
  partnerId: new mongoose.Types.ObjectId(partnerId),
  customizationId: new mongoose.Types.ObjectId(customizationId),
  status: 'pending',
});


    await newRequest.save();

    res.status(201).json({ message: 'Request sent successfully', request: newRequest });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Server error while creating request' });
  }
};

// ✅ Partner fetches received requests
export const getRequestsForPartner = async (req, res) => {
  try {
    console.log("User from token:", req.user);  // Check user object
    const partnerId = new mongoose.Types.ObjectId(req.user.id);
    console.log("partnerId:", partnerId);
    console.log("User from token in getRequestsForPartner:", req.user);

    const requests = await Request.find({ partnerId })
      .populate('userId', 'name email')
      .populate({
        path: 'customizationId',
        populate: { path: 'vehicleId', select: 'name' }
      })
      .exec();

    console.log("Requests found:", requests.length);
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
