const authRoutes = require('./auth.routes');

module.exports = function (fastify, opts, done) {
  fastify.register(authRoutes, { prefix: '/auth' });
  done();
};
