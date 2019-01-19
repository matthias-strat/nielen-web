"use strict";

const express   = require('express'),
      router    = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("contact", { 
    title: "Lohnunternehmen Nielen",
    path: "/contact"
  });
});

module.exports = router;
