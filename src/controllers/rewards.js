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


const getRewardbyMerchant = (merchants) => {
  // console.log('getRewardbyMerchant: ', merchants);
  // return all rewards from db
  // console.log(merchants, typeof merchants)
  const merchantIds = merchants.map(merchant => merchant[0]);
  // console.log('where am I?', merchantIds);

  // ['merch_00009PscnXnWOXxkHl7TGL', 'merch_00009B4ag3ALK4Y6LnZRNh'];
  return Rewards.find({
    merchant_id: { $in: merchantIds },
  }).then((rewards) => {
    // console.log('These are the rewards:  ' + rewards);
    // const unfilteredGroupTwo = merchants.find(merchant => merchant[0] === rewards[2]);
    // console.log('Chocloate?', rewards[2]);
    // console.log('where am I Two?', unfilteredGroupTwo);
    const activeRewards = rewards.map(reward => reward.toObject()).map((reward) => {
      // find merchant in merchants array where merchant[0] === reward.merchant_id
      const merchant = merchants.find(m => m[0] === reward.merchant_id);
      // set count property on reward to merchant[1]
      // Object.defineProperty(reward, 'count', {
      //   value: merchant[1],
      //   enumerable: true,
      // });
      reward.count = merchant[1];
      // return updated reward
      return reward;
    });
    // console.log(activeRewards);
    return activeRewards;
  // })
  });
};


module.exports = {
  findAllRewards,
  getRewardbyMerchant,
};
