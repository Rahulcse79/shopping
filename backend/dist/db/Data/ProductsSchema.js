"use strict";

var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});
var Product = mongoose.model("Product", productSchema);
module.exports = Product;