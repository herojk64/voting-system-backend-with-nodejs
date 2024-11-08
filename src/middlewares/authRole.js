const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (userRole !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};


module.exports = checkRole;