"use strict";

const express   = require('express'),
      router    = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("services", { 
    title: "Lohnunternehmen Nielen",
    path: "/services"
   });
});

module.exports = router;
