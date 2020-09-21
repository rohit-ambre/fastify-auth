const { signup } = require('../controllers/auth.controller');

module.exports = function (fastify, opts, done) {
  fastify.post('/signup', signup);
  done();
};
