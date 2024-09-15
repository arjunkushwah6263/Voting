// backend/routes/voteRoutes.js
const express = require('express');
const { castVote, getResults } = require('../controllers/voteController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, castVote);
router.route('/results').get(getResults);

module.exports = router;
