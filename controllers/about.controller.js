"use strict";

const pageTitle = "Lohnunternehmen Nielen";
const pagePath = "/about";

exports.index = function(req, res, next) {
  res.render("about", { 
    title: pageTitle,
    path: pagePath
  });
}