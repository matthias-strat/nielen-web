#!/usr/bin node

"use strict";

// import required node modules and initialize express
const express   = require("express"),
      app       = express(),
      path      = require("path"),
      morgan    = require("morgan");

// Set basic middleware function for all Express requests
app.use(morgan("dev"));

// Set static file directory
app.use(express.static(path.join(__dirname, "public")));

// Start express and listen on port 3030
let server = app.listen(3030, () => {
    const port = server.address().port;
    console.log("The server is now listening on port", port);
});