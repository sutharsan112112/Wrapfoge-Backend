const isAdmin = (req, res, next) => {
    try {
        // Checking if the user has admin privileges in the user object from the JWT token
        if (req.user && req.user.role === 'admin') {
            next(); // Proceed to controller
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error in admin middleware.' });
    }
};

export default isAdmin;