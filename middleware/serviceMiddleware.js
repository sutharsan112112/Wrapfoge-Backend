export const isAdminOrPartner = (req, res, next) => {
  try {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'partner')) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied. Admin or Partner only.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error in role middleware.' });
  }
};
