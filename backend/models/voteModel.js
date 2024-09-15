const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    candidate: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
