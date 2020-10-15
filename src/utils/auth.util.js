/* eslint-disable consistent-return */
const JWT = require('jsonwebtoken');

const ValidateJWT = (req, rpl, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token) {
    return rpl.status(400).send({ status: false, message: 'Token required' });
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(`JWT: ${err.message}`);
      return rpl
        .status(401)
        .send({ status: false, message: 'Token is not valid', error: err });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  ValidateJWT
};
