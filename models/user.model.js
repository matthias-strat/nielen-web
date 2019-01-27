"use strict";

const mongoose = require("mongoose"),
      bcrypt   = require("bcrypt"),
      Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

// Pre-save of user to database, hash if password is modified or new.
UserSchema.pre("save", function(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified("password")) { return next(); }

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(pwd, cb) {
  bcrypt.compare(pwd, this.password, (err, isMatch) => {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);