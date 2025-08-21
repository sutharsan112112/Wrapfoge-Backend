import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};



// Role check: only admin or partner
export const isAdminOrPartner = (req, res, next) => {
  console.log('User role:', req.user.role);
  if (req.user && (req.user.role === 'admin' || req.user.role === 'partner')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Only Admin or Partner allowed' });
  }
};