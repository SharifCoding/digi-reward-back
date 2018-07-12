// const request = require('request-promise');
const Rewards = require('../models/reward');

const findAllRewards = (req, res) => {
  // return all rewards from db
  Rewards.find()
    .then(rewards => {
      res.send(rewards);
    }).catch(err => {
      /* eslint-disable-next-line no-console */
      console.log(err.message);
      res.sendStatus(400);
    });
};

module.exports = {
  findAllRewards,
};
