"use strict";

exports.auth = function(req, res, next) {
  res.render("admin/auth", {
    title: "Lohnunternehmen Nielen"
  });
};