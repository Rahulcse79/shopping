const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const monthlyPurchaseSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    enum: [
      "January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"
    ],
  },
  products: [productSchema],  
});

const MonthlyPurchase = mongoose.model("MonthlyPurchase", monthlyPurchaseSchema);

module.exports = MonthlyPurchase;
