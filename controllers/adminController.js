import User from '../models/User.js'; // Make sure this path is correct

// In-memory items array for demonstration
let items = [];

// ===== ITEM CONTROLLERS =====
export const getItems = (req, res) => {
  res.json({ items });
};

export const createItem = (req, res) => {
  const item = { id: items.length + 1, ...req.body };
  items.push(item);
  res.status(201).json({ message: 'Item created', item });
};

export const updateItem = (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  items[index] = { ...items[index], ...req.body };
  res.json({ message: 'Item updated', item: items[index] });
};

export const deleteItem = (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  items.splice(index, 1);
  res.json({ message: 'Item deleted' });
};

// ===== USER CONTROLLERS =====
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({ role: 'user' }).select('-password');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to get users', error });
//   }
// };

// export const updateUser = async (req, res) => {
//   try {
//     const user = await User.findOneAndUpdate(
//       { _id: req.params.id, role: 'user' },
//       req.body,
//       { new: true }
//     ).select('-password');

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ message: 'User updated successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update user', error });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findOneAndDelete({ _id: req.params.id, role: 'user' });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete user', error });
//   }
// };


// import User from '../models/User.js';

// Fetch all users (only for admin)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users', error });
  }
};

// Update a user's details
export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'user' },
      req.body,
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id, role: 'user' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};


// ===== PARTNER CONTROLLERS =====
export const getPartners = async (req, res) => {
  try {
    const partners = await User.find({ role: 'partner' }).select('-password');
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get partners', error });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const partner = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'partner' },
      req.body,
      { new: true }
    ).select('-password');

    if (!partner) return res.status(404).json({ message: 'Partner not found' });

    res.json({ message: 'Partner updated successfully', partner });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update partner', error });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const partner = await User.findOneAndDelete({ _id: req.params.id, role: 'partner' });
    if (!partner) return res.status(404).json({ message: 'Partner not found' });

    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete partner', error });
  }
};

