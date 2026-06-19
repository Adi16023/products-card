const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema(
  {
    color: String,
    size: String,
    sku: String,
    price: Number,
    stock: Number,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    sku: String,
    price: { type: Number, required: true },
    stockQuantity: Number,
    discountPercent: Number,
    weight: Number,
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    releaseDate: Date,
    category: {
      type: String,
      enum: ['Electronics', 'Accessories', 'Wearables', 'Audio'],
    },
    tags: [String],
    ratings: [Number],
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
      unit: { type: String, default: 'cm' },
    },
    variants: [variantSchema],
    attributes: {
      type: Map,
      of: String,
    },
    metadata: mongoose.Schema.Types.Mixed,
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);