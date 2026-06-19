import Badge from './Badge';
import StarRating from './StarRating';
import { averageRating, discountedPrice } from '../utils/productHelpers';

export default function ProductCard({ product, onView, onAddToCart, inCart }) {
  const salePrice = discountedPrice(product.price, product.discountPercent);
  const avgRating = averageRating(product.ratings);

  return (
    <article className="product-card">
      <button type="button" className="product-card-media" onClick={() => onView(product)}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-card-badges">
          {product.discountPercent > 0 && (
            <Badge variant="sale">-{product.discountPercent}%</Badge>
          )}
          {product.isFeatured && <Badge variant="featured">Featured</Badge>}
          {!product.inStock && <Badge variant="out">Sold out</Badge>}
        </div>
      </button>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <button type="button" className="product-card-title" onClick={() => onView(product)}>
          {product.name}
        </button>

        <StarRating value={avgRating} count={product.ratings?.length} size="sm" />
<p className="product-card-description">
  {product.description}
</p>

<p className="product-card-stock">
  Stock: {product.stockQuantity}
</p>

<p className="product-card-sku">
  SKU: {product.sku}
</p>

<p className="product-card-status">
  {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
</p>
        <div className="product-card-price">
          {salePrice ? (
            <>
              <span className="price-current">${salePrice.toFixed(2)}</span>
              <span className="price-was">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="price-current">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="product-card-actions">
          <button type="button" className="btn btn-ghost" onClick={() => onView(product)}>
            View details
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
          >
            {inCart ? 'Added' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
