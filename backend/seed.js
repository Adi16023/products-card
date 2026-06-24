require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones with 30-hour battery life.',
    price: 79.99,
    image: 'https://picsum.photos/seed/headphones/300/200',
    sku: 'WH-001',
    stockQuantity: 45,
    discountPercent: 10,
    weight: 250,
    inStock: true,
    isFeatured: true,
    releaseDate: new Date('2024-03-15'),
    category: 'Audio',
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    ratings: [5, 4, 5, 4, 5],
    dimensions: { width: 18, height: 20, depth: 8, unit: 'cm' },
    variants: [
      { color: 'Black', size: 'Standard', sku: 'WH-001-BK', price: 79.99, stock: 25 },
      { color: 'White', size: 'Standard', sku: 'WH-001-WH', price: 79.99, stock: 20 },
    ],
    attributes: new Map([
      ['connectivity', 'Bluetooth 5.3'],
      ['batteryLife', '30 hours'],
      ['driverSize', '40mm'],
    ]),
    metadata: {
      warrantyMonths: 24,
      manufacturer: 'SoundWave Inc.',
      certifications: ['FCC', 'CE'],
    },
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart-rate monitor and GPS.',
    price: 149.99,
    image: 'https://picsum.photos/seed/watch/300/200',
    sku: 'SW-002',
    stockQuantity: 30,
    discountPercent: 0,
    weight: 45,
    inStock: true,
    isFeatured: false,
    releaseDate: new Date('2025-01-10'),
    category: 'Wearables',
    tags: ['fitness', 'gps', 'waterproof'],
    ratings: [4, 4, 5, 3, 4],
    dimensions: { width: 4.5, height: 4.5, depth: 1.2, unit: 'cm' },
    variants: [
      { color: 'Silver', size: '42mm', sku: 'SW-002-SL-42', price: 149.99, stock: 15 },
      { color: 'Black', size: '46mm', sku: 'SW-002-BK-46', price: 159.99, stock: 15 },
    ],
    attributes: new Map([
      ['display', 'AMOLED 1.4"'],
      ['waterResistance', '5 ATM'],
      ['os', 'WearOS 4'],
    ]),
    metadata: {
      warrantyMonths: 12,
      manufacturer: 'TimeTech Labs',
      compatibleDevices: ['Android', 'iOS'],
    },
  },
  {
    name: 'Portable Speaker',
    description: 'Compact waterproof speaker with 360° sound and 12-hour playtime.',
    price: 49.99,
    image: 'https://picsum.photos/seed/speaker/300/200',
    sku: 'PS-003',
    stockQuantity: 0,
    discountPercent: 15,
    weight: 540,
    inStock: false,
    isFeatured: true,
    releaseDate: new Date('2023-11-20'),
    category: 'Electronics',
    tags: ['portable', 'waterproof', 'outdoor'],
    ratings: [5, 5, 4, 4, 5, 4],
    dimensions: { width: 9, height: 9, depth: 9, unit: 'cm' },
    variants: [
      { color: 'Blue', size: 'Mini', sku: 'PS-003-BL', price: 49.99, stock: 0 },
      { color: 'Red', size: 'Mini', sku: 'PS-003-RD', price: 49.99, stock: 0 },
    ],
    attributes: new Map([
      ['outputPower', '20W'],
      ['ipRating', 'IP67'],
      ['chargingPort', 'USB-C'],
    ]),
    metadata: {
      warrantyMonths: 18,
      manufacturer: 'BoomBox Co.',
      maxVolume: 90,
    },
  },
];

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/products-card', {
    serverSelectionTimeoutMS: 5000,
  })
  .then(async () => {
    await Product.deleteMany();
    const inserted = await Product.insertMany(products);

    await Product.findByIdAndUpdate(inserted[0]._id, {
      relatedProducts: [inserted[1]._id, inserted[2]._id],
    });
    await Product.findByIdAndUpdate(inserted[1]._id, {
      relatedProducts: [inserted[0]._id, inserted[2]._id],
    });
    await Product.findByIdAndUpdate(inserted[2]._id, {
      relatedProducts: [inserted[0]._id, inserted[1]._id],
    });

    console.log(`Seeded ${inserted.length} products with all field types`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
