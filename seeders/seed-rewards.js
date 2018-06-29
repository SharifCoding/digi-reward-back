/**
 * Seed the database with rewards
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Reward = require('../src/models/reward');

// create some rewards
const rewards = [];

dotenv.config();

// connect to db & use the reward model to insert/save
mongoose.connect(process.env.DATABASE_URL, () => {
  Promise.all(rewards.map(reward => new Reward(reward).save()))
    .then(() => {
      mongoose.connection.close();
    });
});