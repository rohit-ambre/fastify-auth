const User = require('../models/user.model');

const signup = (req, rpl) => {
  const user = new User(req.body);
  user.save((err, newUser) => {
    if (err) {
      console.log(err);
      // fastify.log.error(err);
    }
    rpl.code(200).send(newUser);
  });
};

module.exports = {
  signup
};
