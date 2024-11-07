const UserModel = require('../../models/UserModel');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    const { name, username, email, voter_id, password,cpassword } = req.body;

    if (!name || !username || !email || !voter_id || !password || !cpassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if(password !== cpassword){
        return res.status(400).json({message:'Both password do not match!'});
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const existingUser = await UserModel.findOne({ 
            $or: [{ username }, { email }, { voter_id }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User with provided details already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
            username,
            email,
            voter_id,
            password:hashedPassword
        });

        const savedUser = await user.save();
        const { password: _, ...userWithoutPassword } = savedUser.toObject();
        res.status(201).json({ message: 'User created successfully', user: userWithoutPassword  });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

module.exports = addUser;
