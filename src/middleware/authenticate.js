const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, authorizer) => {
      // console.log(authorizer);
      if (error) {
        res.status(401).json({ message: 'Unable to authenticate token' });
      } else {
        req.authorizer = { user_id: authorizer.user_id };
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
}

module.exports = authenticate;
