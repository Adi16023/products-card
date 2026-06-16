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
  const products = await Product.find().populate('relatedProducts', 'name sku price');
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('relatedProducts', 'name sku price');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product deleted', id: product._id });
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
