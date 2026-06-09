require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/products-card', {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
