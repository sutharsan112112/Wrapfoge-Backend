import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '30days',
  });
};

// Register
export const registerUser = async (req, res) => {
  const { name, email, password, confirmpassword, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, confirmpassword, role });

    res.status(201).json({
      message: 'Registered successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};