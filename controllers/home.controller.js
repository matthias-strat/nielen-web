"use strict";

const pageTitle = "Lohnunternehmen Nielen";
const pagePath = "/";

exports.index = function(req, res, next) {
  res.render("index", { 
    title: pageTitle,
    path: pagePath
  });
}