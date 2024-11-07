const UserModel = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const login = async (req, res) => {
    const { identifier, password } = req.body; // 'identifier' could be email, username, or voter_id

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Invalid request and data!' });
    }

    try {
        const user = await UserModel.findOne({
            $or: [{ email: identifier }, { username: identifier }, { voter_id: identifier }]
        }).select("+password");

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            userId: user._id,
            username: user.username
        };
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = login;
