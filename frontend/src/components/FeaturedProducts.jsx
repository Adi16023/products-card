import ProductCard from './ProductCard';

export default function FeaturedProducts({ products, onView, onAddToCart, cartItems }) {
  if (products.length === 0) return null;

  return (
    <section className="featured-section" id="deals">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">Staff picks</p>
          <h2>Featured deals</h2>
        </div>
        <p>Limited-time savings on our most-loved products.</p>
      </div>

      <div className="featured-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onView={onView}
            onAddToCart={onAddToCart}
            inCart={cartItems.some((item) => item._id === product._id)}
          />
        ))}
      </div>
    </section>
  );
}
