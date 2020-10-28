/* eslint-disable consistent-return */
const JWT = require('jsonwebtoken');

/**
 * middleware to validate JWT token
 */
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

/**
 * creates token with passed payload
 * @param {object} payload object for token data
 * @returns token string
 */
const createToken = (payload) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m'
  });
  return token;
}

module.exports = {
  ValidateJWT,
  createToken
};
