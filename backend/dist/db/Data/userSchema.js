"use strict";

var mongoose = require("mongoose");

// Define the Product schema
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

// Define the Cart schema
var cartSchema = new mongoose.Schema({
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

// Define the User History schema
var userHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  history: [{
    product: {
      type: productSchema,
      // Reference the product schema
      required: true
    },
    purchaseDate: {
      type: Date,
      "default": Date.now
    }
  }],
  cart: [{
    product: {
      type: cartSchema,
      // Reference the cart schema
      required: true
    },
    cartDate: {
      type: Date,
      "default": Date.now
    }
  }]
});

// Create and export the UserHistory model
var UserHistory = mongoose.model("UserHistory", userHistorySchema);
module.exports = UserHistory;