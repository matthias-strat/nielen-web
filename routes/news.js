"use strict";

const express   = require('express'),
      router    = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("news", { 
    title: "Lohnunternehmen Nielen",
    path: "/news"
  });
});

router.get("/:newsId", (req, res, next) => {
  console.log(req.params.newsId);
});

module.exports = router;
