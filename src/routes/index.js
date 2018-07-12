const auth = require('./auth');
const users = require('./users');
const account = require('./account');
const getTransaction = require('./transaction');
const findAllRewards = require('./rewards');

module.exports = {
  auth,
  users,
  account,
  getTransaction,
  findAllRewards,
};
