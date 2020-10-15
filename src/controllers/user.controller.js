const User = require('../models/user.model');

const getAllUsers = (req, rpl) => {
  User.find(
    {},
    '_id email firstName lastName createdAt updatedAt',
    (err, users) => {
      if (err) {
        console.log(`DB Error: ${err.message}`);
        rpl.status(500).send({
          status: false,
          message: 'some error occured',
          error: err
        });
      }
      if (users) {
        rpl
          .status(200)
          .send({ status: true, data: users, message: 'List of all users' });
      } else {
        rpl
          .status(200)
          .send({ status: false, data: null, message: 'No users found' });
      }
    }
  );
};

module.exports = {
  getAllUsers
};
