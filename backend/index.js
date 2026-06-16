require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/products-card",
    {
      serverSelectionTimeoutMS: 5000,
    },
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
// CREATE
app.post("/api/products", async (req, res) => {
  try {
    const now = new Date();

    const createdAtUTC = now.toISOString();

    const createdAtIST = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    )
      .toISOString()
      .replace("Z", "+05:30");

    const product = await Product.create({
      ...req.body,
      createdAtUTC,
      createdAtIST,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
