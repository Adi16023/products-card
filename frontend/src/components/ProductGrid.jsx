import ProductCard from './ProductCard';

export default function ProductGrid({ products, onView, onAddToCart, cartItems, onEdit,onDelete, }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products match your filters.</p>
        <span>Try adjusting search or category filters.</span>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onView={onView}
          onAddToCart={onAddToCart}
          inCart={cartItems.some((item) => item._id === product._id)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
