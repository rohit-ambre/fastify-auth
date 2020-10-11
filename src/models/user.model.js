const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
 * encrypt password before save
 */
userSchema.pre('save', function (next) {
  const user = this;
  // don't rehash if it's an old user
  if (!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(
      user.password,
      parseInt(process.env.SALT, 10),
      (err, hashed) => {
        if (err) {
          next(err);
        }
        user.password = hashed;
        next();
      }
    );
  }
});

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
