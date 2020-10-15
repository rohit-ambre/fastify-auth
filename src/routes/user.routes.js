const { getAllUsers } = require('../controllers/user.controller');
const { ValidateJWT } = require('../utils/auth.util');

module.exports = function (fastify, opts, done) {
  fastify.get('/users', { preHandler: ValidateJWT }, getAllUsers);
  done();
};
