"use strict";

// Import required modules
const express       = require("express"),
      createError   = require("http-errors");

// include routers
const indexRouter   = require("./routes/index"),
      newsRouter    = require("./routes/news"),
      aboutRouter   = require("./routes/about"),
      contactRouter = require("./routes/contact"),
      jobRouter     = require("./routes/jobs");

// include controllers
const ServiceCtrl   = require("./controllers/service.controller"),
      AdminCtrl     = require("./controllers/admin.controller");
  
module.exports = function(app) {
  
  // Initialize router groups
  const serviceRouter = express.Router(),
        adminRouter   = express.Router();


  app.use("/",          indexRouter);
  app.use("/home",      indexRouter);
  app.use("/news",      newsRouter);
  app.use("/about",     aboutRouter);
  app.use("/contact",   contactRouter);
  app.use("/jobs",      jobRouter)

  // Service router
  app.use("/services", serviceRouter);
  serviceRouter.get("/", ServiceCtrl.index);
  serviceRouter.get("/:serviceName", ServiceCtrl.show);

  // Admin router (TODO protect)
  app.use("/admin", adminRouter);
  adminRouter.get("/", AdminCtrl.auth);

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