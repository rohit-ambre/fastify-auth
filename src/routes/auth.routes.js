const { signup, login } = require('../controllers/auth.controller');

module.exports = function (fastify, opts, done) {
  fastify.post('/signup', signup);
  fastify.post('/login', login);
  done();
};
