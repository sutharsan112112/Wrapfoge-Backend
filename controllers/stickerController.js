import Sticker from '../models/Sticker.js';
import jwt from 'jsonwebtoken';

// Create a new sticker
export const createSticker = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { name, design } = req.body;

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : '';

    const newSticker = new Sticker({ name, design, imageUrl });
    await newSticker.save();

    res.status(201).json({ message: 'Sticker created successfully', sticker: newSticker });
  } catch (error) {
    console.error("Upload error:", error); // 🟥 log actual error
    res.status(500).json({ message: 'Failed to create sticker', error });
  }
};


// Get all stickers
export const getAllStickers = async (req, res) => {
  try {
    const stickers = await Sticker.find();
    res.status(200).json(stickers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stickers', error });
  }
};

// Getting single sticker by ID
export const getStickerById = async (req, res) => {
  try {
    const sticker = await Sticker.findById(req.params.id);
    if (!sticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }
    res.status(200).json(sticker);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid sticker ID" });
  }
};

// Update sticker
export const updateSticker = async (req, res) => {
  try {
    const { name, design } = req.body;

    const updateData = { name, design };

    // ✅ If new image uploaded, update imageUrl
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedSticker = await Sticker.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedSticker) {
      return res.status(404).json({ message: 'Sticker not found' });
    }

    res.status(200).json({ message: 'Sticker updated', sticker: updatedSticker });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: 'Failed to update sticker', error });
  }
};

// Delete sticker
export const deleteSticker = async (req, res) => {
  try {
    const deletedSticker = await Sticker.findByIdAndDelete(req.params.id);
    if (!deletedSticker) {
      return res.status(404).json({ message: 'Sticker not found' });
    }
    res.status(200).json({ message: 'Sticker deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete sticker', error });
  }
};