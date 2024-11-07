const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true // fixed typo: changed 'require' to 'required'
    },
    username: {
        type: String,
        unique: true, // ensure username is unique
        required: true
    },
    email: {
        type: String, // corrected type to 'String' instead of 'Date'
        required: true,
        unique: true
    },
    voter_id: {
        type: String, // corrected type to 'String' instead of 'Date'
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator','candidate'], // User roles
        default: 'user' // default to 'user' role
    },
    createdAt: {
        type: Date,
        default: Date.now // default to current date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the 'updatedAt' field on save
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
