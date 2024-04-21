const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define sub-schema for price variations
const PriceVariationSchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Define main product schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prices: [PriceVariationSchema], // Array of price variations
  // Add any other fields you may need
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
