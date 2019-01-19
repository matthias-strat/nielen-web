"use strict";

const mongoose  = require("mongoose"),
      Schema    = mongoose.Schema;



const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  view: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["lw", "bgw"]
  },
  altersCarousel: {
    type: Boolean,
    required: true
  },
  carouselItems: []

});

module.exports = mongoose.model("Service", ServiceSchema);