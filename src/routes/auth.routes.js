const User = require('../models/user.model');

module.exports = function (fastify, opts, done) {
  fastify.post('/signup', (req, rpl) => {
    const user = new User(req.body);
    user.save((err, newUser) => {
      if (err) {
        fastify.log.error(err);
      }
      rpl.code(200).send(newUser);
    });
  });
  done();
};
