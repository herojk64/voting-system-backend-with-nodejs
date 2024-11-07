const mongoose = require('mongoose');
const { Schema } = mongoose;

const candidateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    }
});

// Registering the model as 'Candidate'
const CandidateModel = mongoose.model('Candidates', candidateSchema);
module.exports = CandidateModel;
