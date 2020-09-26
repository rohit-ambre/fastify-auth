const User = require('../models/user.model');

const signup = (req, rpl) => {
  User.findOneUser(req.body.email, (err, data) => {
    if (err) {
      console.log(err);
      rpl.code(500).send({
        staus: false,
        data: null,
        error: err,
        message: 'server error occurred'
      });
    }
    if (data) {
      rpl.code(200).send({
        status: false,
        error: null,
        data: null,
        message: 'user already exist'
      });
    } else {
      const user = new User(req.body);
      user.save((error, newUser) => {
        if (error) {
          console.log(error);
          // fastify.log.error(error);
        }
        rpl.code(200).send(newUser);
      });
    }
  });
};

module.exports = {
  signup
};
