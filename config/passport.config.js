"use strict";

// import required modules
const passport      = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      User          = require("../models/user.model");
      

// Setup user serialization/deserialization
passport.serializeUser((user, done) => {
  console.log("d");
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log("e");
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local signin
const localOptions = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
};

const localLogin = new LocalStrategy(localOptions, (req, username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) { console.log("a"); return done(err); }
    if (!user) { return done(null, false, req.flash("error", "Ungültige Kontodaten")); }
      
    user.comparePassword(password, (err, isMatch) => {
      if (err) { console.log("b"); return done(err); }
      if (!isMatch) { return done(null, false, req.flash("error", "Ungültige Kontodaten")); }
     
      return done(null, user);
    });
  });
});

passport.use(localLogin);