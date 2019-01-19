"use strict";

const express   = require('express'),
      router    = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("jobs", { 
    title: "Lohnunternehmen Nielen",
    path: "/jobs"
  });
});

module.exports = router;
