const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

/**
 * Checks whether user with same unique fiels already exist or not
 * @returns User object on success and null if not found
 */
userSchema.statics.findOneUser = function (field, cb) {
  this.findOne({ email: field }, function (err, foundUser) {
    if (err) {
      console.error(`DB Error: ${err.message}`);
      return cb(err);
    }
    if (!foundUser) {
      return cb(null, null);
    }

    return cb(null, foundUser);
  });
};
module.exports = new mongoose.model('User', userSchema);
