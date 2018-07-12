const express = require('express');
const RewardsController = require('../controllers/rewards');

const router = express.Router();

router.get('/', RewardsController.findAllRewards);

module.exports = router;
