"use strict";

const pageTitle = "Lohnunternehmen Nielen";
const pagePath = "/contact";

exports.index = function(req, res, next) {
  res.render("contact", { 
    title: pageTitle,
    path: pagePath
  });
}