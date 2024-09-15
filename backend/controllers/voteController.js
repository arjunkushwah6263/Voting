// backend/controllers/voteController.js
const Vote = require('../models/Vote');

const castVote = async (req, res) => {
    const { candidate } = req.body;
    const user = req.user.id; // Use req.user.id to get the authenticated user's ID

    try {
        const alreadyVoted = await Vote.findOne({ user });
        if (alreadyVoted) {
            return res.status(400).json({ message: 'User has already voted' });
        }

        const vote = await Vote.create({
            user,
            candidate,
        });

        res.status(201).json(vote);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getResults = async (req, res) => {
    try {
        const votes = await Vote.aggregate([
            { $group: { _id: '$candidate', votes: { $sum: 1 } } },
            { $project: { candidate: '$_id', votes: 1, _id: 0 } }
        ]);
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { castVote, getResults };
