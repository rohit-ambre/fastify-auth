module.exports = function (fastify, opts, done) {
  fastify.get('/', (_, rpl) => {
    rpl.code(200).send('all ok here');
  });
  done();
};
