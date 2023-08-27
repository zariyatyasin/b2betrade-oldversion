// server.js
// models/Ad.js

const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: String,
  targetCriteria: [
    {
      targetUsers: [String],
      ageRange: {
        min: Number,
        max: Number,
      },
      interests: [String],
    },
  ],
});

module.exports = mongoose.model("Ad", adSchema);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Dummy data for ads
let ads = [];

// Create a new ad
app.post("/api/ads", (req, res) => {
  const newAd = req.body;
  ads.push(newAd);
  res.status(201).json({ message: "Ad created successfully" });
});

// Simulate showing ads to targeted users
app.get("/api/show-ads/:userId", (req, res) => {
  const userId = req.params.userId;
  const userAds = ads.filter((ad) =>
    ad.targetCriteria.some((criteria) => isUserInTarget(userId, criteria))
  );
  res.json(userAds);
});

// Check if a user matches the targeting criteria
function isUserInTarget(userId, criteria) {
  if (criteria.targetUsers.includes(userId)) {
    if (criteria.ageRange) {
      const userAge = getUserAge(userId); // You should have a way to get user's age
      if (
        userAge >= criteria.ageRange.min &&
        userAge <= criteria.ageRange.max
      ) {
        return true;
      }
    }
    if (criteria.interests) {
      const userInterests = getUserInterests(userId); // You should have a way to get user's interests
      if (
        userInterests.some((interest) => criteria.interests.includes(interest))
      ) {
        return true;
      }
    }
  }
  return false;
}

// Simulate getting user age
function getUserAge(userId) {
  // Replace this with your actual logic to get user's age
  return 30;
}

// Simulate getting user interests
function getUserInterests(userId) {
  // Replace this with your actual logic to get user's interests
  return ["fashion", "electronics"];
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

////two

// routes/ads.js

const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");

router.post("/", async (req, res) => {
  try {
    const newAd = await Ad.create(req.body);
    res.status(201).json(newAd);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userAds = await Ad.find({
      "targetCriteria.targetUsers": userId,
    });
    res.json(userAds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
////

// server.js

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

let ads = [];

app.post("/api/ads", (req, res) => {
  const newAd = req.body;
  ads.push(newAd);
  res.status(201).json({ message: "Ad created successfully" });
});

app.get("/api/show-ads/:userId", (req, res) => {
  const userId = req.params.userId;
  const userAds = ads.filter((ad) =>
    ad.targetCriteria.some((criteria) => isUserInTarget(userId, criteria))
  );
  res.json(userAds);
});

function isUserInTarget(userId, criteria) {
  // ... (Same as before)
}

function getUserAge(userId) {
  // ... (Same as before)
}

function getUserInterests(userId) {
  // ... (Same as before)
}

// Simulate fetching products from a database
let products = [
  { id: 1, name: "Product A", price: 50 },
  { id: 2, name: "Product B", price: 100 },
  // ...
];

// Fetch all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Simulate user cart storage
let userCarts = {};

// Add a product to the user's cart
app.post("/api/cart/add", (req, res) => {
  const { userId, productId } = req.body;
  if (!userCarts[userId]) {
    userCarts[userId] = [];
  }
  userCarts[userId].push(productId);
  res.status(200).json({ message: "Product added to cart" });
});

// Get the user's cart
app.get("/api/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  const cartItems = userCarts[userId] || [];
  const cartProducts = products.filter((product) =>
    cartItems.includes(product.id)
  );
  res.json(cartProducts);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
////

// server.js

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

let ads = [];
let products = [];
let userCarts = {};

// Create a new ad
app.post("/api/ads", (req, res) => {
  const newAd = req.body;
  ads.push(newAd);
  res.status(201).json({ message: "Ad created successfully" });
});

// Show ads to targeted users
app.get("/api/show-ads/:userId", (req, res) => {
  const userId = req.params.userId;
  const userAds = ads.filter((ad) =>
    ad.targetCriteria.some((criteria) => isUserInTarget(userId, criteria))
  );
  res.json(userAds);
});

// Check if a user matches the targeting criteria
function isUserInTarget(userId, criteria) {
  // ... (Same as before)
}

// Simulate fetching products from a database
products = [
  { id: 1, name: "Product A", price: 50 },
  { id: 2, name: "Product B", price: 100 },
  // ...
];

// Fetch all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Add a product to the user's cart
app.post("/api/cart/add", (req, res) => {
  const { userId, productId } = req.body;
  if (!userCarts[userId]) {
    userCarts[userId] = [];
  }
  userCarts[userId].push(productId);
  res.status(200).json({ message: "Product added to cart" });
});

// Get the user's cart
app.get("/api/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  const cartItems = userCarts[userId] || [];
  const cartProducts = products.filter((product) =>
    cartItems.includes(product.id)
  );
  res.json(cartProducts);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
