"use strict";

const pageTitle = "Lohnunternehmen Nielen";
const pagePath = "/jobs";

exports.index = function(req, res, next) {
  res.render("jobs", { 
    title: pageTitle,
    path: pagePath
  });
}