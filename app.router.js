"use strict";

// Import required modules
const express       = require("express"),
      createError   = require("http-errors");

// include routers
const indexRouter   = require("./routes/index"),
      newsRouter    = require("./routes/news"),
      serviceRouter = require("./routes/services");

module.exports = function(app) {
  
  app.use("/",          indexRouter);
  app.use("/home",      indexRouter);
  app.use("/news",      newsRouter);
  app.use("/services",  serviceRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}