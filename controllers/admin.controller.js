"use strict";

const User = require("../models/user.model");

exports.index = function(req, res, next) {
  res.render("admin/admin-index", {
    title: "Lohnunternehmen Nielen"
  });
};

exports.login = function(req, res, next) {
  res.render("admin/admin-login", {
    title: "Lohnunternehmen Nielen",
    errorMessage: req.flash("error")
  });
};

exports.logout = function(req, res, next) {
  req.logout();
  res.redirect("/admin/login");
};

exports.userCreate = function(req, res, next) {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({
    username: username,
    name: {
      firstName: firstName,
      lastName: lastName
    },
    email: email,
    password: password
  });

  user.save((err, user) => {
    if (err) { return next(err); }

    console.log("created");
  })
}