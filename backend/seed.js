require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/headphones/300/200' },
  { name: 'Smart Watch', price: 149.99, image: 'https://picsum.photos/seed/watch/300/200' },
  { name: 'Portable Speaker', price: 49.99, image: 'https://picsum.photos/seed/speaker/300/200' },
];

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/products-card', {
    serverSelectionTimeoutMS: 5000,
  })
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Seeded 3 products');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
