const checkOwnAccount = (req, res, next) => {
    const { userId } = req.user;
    const { id } = req.params;

    if (userId !== id) {
        return res.status(403).json({ message: 'Forbidden: You can only update your own account' });
    }

    next();
};

module.exports = checkOwnAccount;
