"use strict";

var mongoose = require("mongoose");
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
  }
});
var monthlyPurchaseSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    "enum": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  products: [productSchema]
});
var MonthlyPurchase = mongoose.model("MonthlyPurchase", monthlyPurchaseSchema);
module.exports = MonthlyPurchase;