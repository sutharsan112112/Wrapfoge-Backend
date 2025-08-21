// // middleware/contactMiddleware.js
// import jwt from 'jsonwebtoken';
// const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// export const isAuthenticated = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1]; // Get the token part from "Bearer <token>"

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // Attach the decoded user data to the request object
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// export const isAdmin = (req, res, next) => {
//     if (req.user?.role === 'admin') return next();
//     res.status(403).json({ message: 'Admins only' });
// };


import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Admin only middleware
export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  return res.status(403).json({ message: 'Access denied: Admins only' });
};

// Partner or Admin middleware
export const isPartnerOrAdmin = (req, res, next) => {
  const role = req.user?.role;
  if (role === 'partner' || role === 'admin') return next();
  return res.status(403).json({ message: 'Access denied: Only admin or partner allowed' });
};
