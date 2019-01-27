"use strict";

// Import required modules
const express       = require("express"),
      session       = require("express-session"),
      passport      = require("passport"),
      passportSvc   = require("./config/passport.config"),
      createError   = require("http-errors"),
      flash         = require("connect-flash");

const config        = require("./config/app.config");

// include controllers
const HomeCtrl      = require("./controllers/home.controller"),
      NewsCtrl      = require("./controllers/news.controllers"),
      ServiceCtrl   = require("./controllers/service.controller"),
      AboutCtrl     = require("./controllers/about.controller"),
      JobsCtrl      = require("./controllers/jobs.controller"),
      ContactCtrl   = require("./controllers/contact.controller"),
      AdminCtrl     = require("./controllers/admin.controller");
  
const requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/admin/login")
};

const requireLogin = function(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/login",
    failureFlash: true
  })(req, res, next);
};

const redirectAdmin = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  }
  return next();
}

module.exports = function(app) {
  app.use(session( { 
    secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000    // 15 secs.. forz
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // Initialize router groups
  const homeRouter    = express.Router(),
        newsRouter    = express.Router(),
        serviceRouter = express.Router(),
        aboutRouter   = express.Router(),
        jobsRouter    = express.Router(),
        contactRouter = express.Router(),
        adminRouter   = express.Router();

  // Home router
  app.use("/", homeRouter);
  homeRouter.get("/", HomeCtrl.index);
  homeRouter.get("/home", HomeCtrl.index);

  // News router
  app.use("/news", newsRouter);
  newsRouter.get("/", NewsCtrl.index);

  // Service router
  app.use("/services", serviceRouter);
  serviceRouter.get("/", ServiceCtrl.index);
  serviceRouter.get("/:serviceName", ServiceCtrl.show);

  // About router
  app.use("/about", aboutRouter);
  aboutRouter.get("/", AboutCtrl.index);

  // Jobs router
  app.use("/jobs", jobsRouter);
  jobsRouter.get("/", JobsCtrl.index);

  // Contact router
  app.use("/contact", contactRouter);
  contactRouter.get("/", ContactCtrl.index);

  // Admin router (TODO protect)
  app.use("/admin", adminRouter);
  adminRouter.get("/", requireAuth, AdminCtrl.index);
  adminRouter.get("/login", redirectAdmin, AdminCtrl.login);
  adminRouter.post("/login", requireLogin);
  adminRouter.get("/logout", requireAuth, AdminCtrl.logout);
  
  adminRouter.post("/user", AdminCtrl.userCreate);

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