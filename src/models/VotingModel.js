const mongoose = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User who is voting
        required: true
    },
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate', // Reference to the Candidate being voted for
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const VotingModel = mongoose.model('Voting', voteSchema);
module.exports = VotingModel;