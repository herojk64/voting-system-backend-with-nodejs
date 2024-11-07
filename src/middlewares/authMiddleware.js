const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const crypto = require('crypto');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Invalid Action' });
    }

    try {
        // Verify the token with the secret key
        const secretKey = process.env.JWT_SECRET || crypto.randomBytes(20).toString('hex');
        const decoded = jwt.verify(token, secretKey);

        // Find the user associated with the decoded token
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user info to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

module.exports = authMiddleware;
