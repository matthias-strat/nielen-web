"use strict";

const pageTitle = "Lohnunternehmen Nielen";
const pagePath = "/news";

exports.index = function(req, res, next) {
  res.render("news", { 
    title: pageTitle,
    path: pagePath
  });
}