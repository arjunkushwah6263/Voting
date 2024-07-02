const Vote = require('../models/Vote');

const castVote = async (req, res) => {
    const { candidate } = req.body;
    const user = req.user._id;

    const alreadyVoted = await Vote.findOne({ user });
    if (alreadyVoted) {
        return res.status(400).json({ message: 'User has already voted' });
    }

    const vote = await Vote.create({
        user,
        candidate,
    });

    res.status(201).json(vote);
};

const getResults = async (req, res) => {
    const votes = await Vote.aggregate([
        { $group: { _id: '$candidate', count: { $sum: 1 } } },
    ]);
    res.json(votes);
};

module.exports = { castVote, getResults };
