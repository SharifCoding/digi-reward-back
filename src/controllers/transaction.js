const request = require('request-promise');
const User = require('../models/user');
// const TransactionsModel = require('../models/transaction');
const { groupMerchant } = require('../helpers/groupByMerchant');
const { getRewardbyMerchant } = require('../controllers/rewards');

const getTransaction = (req, res) => {
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: process.env.USER_ID })
    .then((user) => {
      // console.log(user);
      const accountID = user.account.id;
      // console.log(accountID);
      // request.get(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${process.env.ACCOUNT_ID}`, {
      request.get(`https://api.monzo.com/transactions?account_id=${process.env.ACCOUNT_ID}`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
        .then((data) => {
          const response = JSON.parse(data);
          // group the merchants and assign to `reduceReward`
          const reduceReward = groupMerchant(response.transactions.map(transaction => transaction.merchant));
          // console.log(reduceReward);
          // convert from object to array
          const arrayMerchant = Object.keys(reduceReward).map(key => [String(key), reduceReward[key]]);
          // console.log(arrayMerchant);
          // filter list with `getRewardbyMerchant` function
          // getRewardbyMerchant(arrayMerchant);
          getRewardbyMerchant(arrayMerchant)
            .then(rewards => {
              res.send(rewards);
            });
          // console.log('pretty please: ', finalMerchant);
          // currently passing unfiltered grouped merchants to frontend
          // res.status(201).json(finalMerchant);
        });
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error.message);
      res.sendStatus(400);
    });
};

module.exports = {
  getTransaction,
};
