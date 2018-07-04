const jwt = require('jsonwebtoken');
const request = require('request-promise');
const User = require('../models/user');

const createJWT = (user, callback) => {
  const payload = {
    user_id: user.user_id,
    // access_token: user.access_token,
  };
  // console.log(payload)
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, callback);
};

const monzo = (req, res) => {
  // exchange authorization code for access token
  request.post('https://api.monzo.com/oauth2/token', {
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.MONZO_CLIENT_ID,
      client_secret: process.env.MONZO_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URL,
      code: req.body.code,
    },
    json: true,
  })

//   // create a user (if one doesn't exist) using the retrieved data from Monzo
//   .then(response => request.get('http://localhost:3000/api/v1/UserListing', {  
//     body: {
//       user_id: request.user_id,
//        },
//        json: true,
//     }))
//  .then(({ user_id }) => User.findOneOrCreate({ user_id }, {
//     user_id,
//   }))

  // add access token and initial response to User collection
  .then(response => User.updateOrCreate({ user_id: response.user_id }, {
    access_token: response.access_token,
    client_id: response.client_id,
    expires_in: response.expires_in,
    token_type: response.token_type,
    user_id: response.user_id,
  }))

  // .then((response) => {
  //   console.log(response);
  //   return request.post('http://localhost:3000/api/v1/UserListing', {
  //    body: {
  //         _id: 'testingtesting123',
  //         access_token: response.access_token,
  //      },
  //      json: true,
  //    });
  // })

  // return a JWT to the user (we don't want to reveal the access_token to the client)
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
