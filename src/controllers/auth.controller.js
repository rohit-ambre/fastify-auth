const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { createToken } = require('../utils/auth.util');

const signup = (req, rpl) => {
  User.findOneUser(req.body.email, (err, data) => {
    if (err) {
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

const login = (req, rpl) => {
  User.findOneUser(req.body.email, (error, user) => {
    if (error) {
      rpl.code(500).send({
        staus: false,
        data: null,
        error,
        message: 'server error occurred'
      });
    }
    if (user) {
      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        rpl.status(200).send({
          status: false,
          data: null,
          error: null,
          message: 'Password does not match'
        });
      }
      const payload = {
        userId: user.id
      };
      const token = createToken(payload);

      rpl.status(200).send({
        status: true,
        error: null,
        message: 'User logged in successfully',
        data: {
          user,
          token
        }
      });
    } else {
      rpl.code(200).send({
        status: false,
        error: null,
        data: null,
        message: 'user does not exist'
      });
    }
  });
};

module.exports = {
  signup,
  login
};
