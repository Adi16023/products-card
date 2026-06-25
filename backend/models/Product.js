const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,          // String
  price: Number,         // Number
  image: String,

  tags: [String],        // Array

  description: {
    type: String,
    default: null        // NULL
  },

  inStock: {
    type: Boolean,
    default: true        // Default to in stock
  },

  createdAtUTC: {
    type: Date,
    default: Date.now    // DateTime UTC
  },

  createdAtIST: String   // DateTime IST
});

module.exports = mongoose.model('Product', productSchema);