const request = require('request-promise');
const User = require('../models/user');

const account = (req, res) => {
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: 'user_00009OyJGmB58AqHAj2FSz' })
    .then(user => {
      console.log(user);
      return request.get('https://api.monzo.com/accounts', {
      // returns account details owned by the currently authorised user
        headers: { 'Authorization': `Bearer ${user.access_token}` }
      })
      .then((response) => {
        console.log('***', response);
        // account details posted to user database
        user.update()
      })
      .then(() => {
        res.sendStatus(200);
      })
    })
    .catch((error) => {
      console.log(error.message);
      res.sendStatus(400);
    })
}

module.exports = {
    account,
};
