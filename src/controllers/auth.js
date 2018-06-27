const jwt = require('jsonwebtoken');
const request = require('request-promise');
const User = require('../models/user');

const createJWT = (user, callback) => {
  const payload = {
    id: user._id,
  };
  
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, callback);
};

const monzo = (req, res) => {
  request.post('https://api.monzo.com/oauth2/token', {
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.MONZO_CLIENT_ID,
      client_secret: process.env.MONZO_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URL,
      code: req.body.code,
    },
  })
  .then((response) => {

  })
  // .then(response => request.get('https://api.monzo.com/accounts', {
  //   headers: {
  //     'Authorization': `token ${response.access_token}`,
  //     // 'User-Agent': `authentication-example`
  //   },
  // }))
  .then((user) => {
    console.log(user);
    
    createJWT(user, (err, token) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).json({ token }); 
      }
    });
  })
  .catch((error) => {
    console.log(error.message);
    res.sendStatus(200);
  })
}

module.exports = {
  monzo,
};
