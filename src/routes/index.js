const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

module.exports = function (fastify, opts, done) {
  fastify.register(authRoutes, { prefix: '/auth' });

  fastify.register(userRoutes, { prefix: '/user' });
  done();
};
