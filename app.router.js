"use strict";

// Import required modules
import express from "express";
import createError from "http-errors";

// include routers
import indexRouter from "./routes/index";
import newsRouter from "./routes/news";
import serviceRouter from "./routes/services";
import aboutRouter from "./routes/about";
import contactRouter from "./routes/contact";
import jobRouter from "./routes/jobs";

export default function(app) {
  
  app.use("/",          indexRouter);
  app.use("/home",      indexRouter);
  app.use("/news",      newsRouter);
  app.use("/services",  serviceRouter);
  app.use("/about",     aboutRouter);
  app.use("/contact",   contactRouter);
  app.use("/jobs",      jobRouter)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}