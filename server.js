const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
require('dotenv').config();

const apiRoutes = require('./src/routes');

const PORT = process.env.PORT || 3003;
const MONGO_CONN = process.env.MONGO_URI;
fastify.register(apiRoutes, { prefix: '/api' });

// Mongo connection
mongoose
  .connect(MONGO_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    fastify.log.info('Mongo connected succesfully');
  })
  .catch((err) => {
    fastify.log.error(`Error in mongo connection: ${err}`);
  });

// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
