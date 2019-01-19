"use strict";

const Service     = require("../models/service.model"),
      createError = require("http-errors");

const pageTitle = "Lohnunternehmen Nielen";
const pagePath = "/services";

exports.index = function(req, res, next) {
  Service.find({}, "displayName description thumbnail_url url")
    .exec((err, services) => {
      if (err) { return next(err); }

      res.render("services", { 
        title: pageTitle,
        path: pagePath,
        serviceList: services
       });
    });
};

exports.show = function(req, res, next) {
  const serviceName = req.params.serviceName;
  console.log(serviceName);
  Service.findOne({ name: serviceName })
    .exec((err, service) => {
      if (err) { return next(err); }
      if (!service) { return next(createError(404)); }

      res.render(service.url, {
        title: pageTitle,
        path: pagePath,
        service: service
      });
    });
};