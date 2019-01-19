"use strict";

const express   = require('express'),
      router    = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("services", { 
    title: "LU Nielen - Leistungen",
    path: "/services"
   });
});

router.get("/:serviceName", (req, res, next) => {
  res.render("services/" + req.params.serviceName, {
    title: "LU Nielen - Leistungen",
    path: "/services"
  });
});



module.exports = router;
