const fastify = require('fastify')({ logger: true });
require('dotenv').config();

const apiRoutes = require('./src/routes');

const PORT = process.env.PORT || 3003;

fastify.register(apiRoutes, { prefix: '/api' })

// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();