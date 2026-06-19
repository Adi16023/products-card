import Badge from './Badge';
import StarRating from './StarRating';
import { averageRating, discountedPrice, formatDate } from '../utils/productHelpers';

function DetailField({ label, value }) {
  if (value === undefined || value === null || value === '') return null;

  return (
    <div className="detail-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function ProductDetailModal({ product, onClose, onAddToCart, inCart }) {
  if (!product) return null;

  const salePrice = discountedPrice(product.price, product.discountPercent);
  const avgRating = averageRating(product.ratings);
  const attributes = product.attributes ? Object.entries(product.attributes) : [];
  const metadata = product.metadata ? Object.entries(product.metadata) : [];

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-grid">
          <div className="modal-media">
            <img src={product.image} alt={product.name} />
            <div className="modal-badges">
              {product.isFeatured && <Badge variant="featured">Featured</Badge>}
              <Badge variant={product.inStock ? 'stock' : 'out'}>
                {product.inStock ? 'In stock' : 'Out of stock'}
              </Badge>
            </div>
          </div>

          <div className="modal-content">
            <p className="modal-category">{product.category}</p>
            <h2 id="product-modal-title">{product.name}</h2>
            <p className="modal-description">{product.description}</p>

            <StarRating value={avgRating} count={product.ratings?.length} />

            <div className="modal-price">
              {salePrice ? (
                <>
                  <span className="price-current">${salePrice.toFixed(2)}</span>
                  <span className="price-was">${product.price.toFixed(2)}</span>
                  <Badge variant="sale">Save {product.discountPercent}%</Badge>
                </>
              ) : (
                <span className="price-current">${product.price.toFixed(2)}</span>
              )}
            </div>

            {product.tags?.length > 0 && (
              <div className="tag-list">
                {product.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                disabled={!product.inStock}
                onClick={() => onAddToCart(product)}
              >
                {inCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={onClose}>
                Continue shopping
              </button>
            </div>

            <section className="modal-section">
              <h3>Product details</h3>
              <DetailField label="SKU" value={product.sku} />
              <DetailField label="Stock" value={product.stockQuantity} />
              <DetailField label="Weight" value={product.weight != null ? `${product.weight} g` : null} />
              <DetailField label="Release date" value={formatDate(product.releaseDate)} />
              {product.dimensions && (
                <DetailField
                  label="Dimensions"
                  value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} ${product.dimensions.unit}`}
                />
              )}
            </section>

            {product.variants?.length > 0 && (
              <section className="modal-section">
                <h3>Variants</h3>
                <div className="variant-cards">
                  {product.variants.map((variant) => (
                    <div key={variant.sku} className="variant-card">
                      <strong>{variant.color} · {variant.size}</strong>
                      <span>{variant.sku}</span>
                      <span>${variant.price.toFixed(2)}</span>
                      <span>{variant.stock} in stock</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {attributes.length > 0 && (
              <section className="modal-section">
                <h3>Specifications</h3>
                {attributes.map(([key, value]) => (
                  <DetailField key={key} label={key} value={value} />
                ))}
              </section>
            )}

            {metadata.length > 0 && (
              <section className="modal-section">
                <h3>More info</h3>
                {metadata.map(([key, value]) => (
                  <DetailField
                    key={key}
                    label={key}
                    value={Array.isArray(value) ? value.join(', ') : String(value)}
                  />
                ))}
              </section>
            )}

            {product.relatedProducts?.length > 0 && (
              <section className="modal-section">
                <h3>You may also like</h3>
                <ul className="related-list">
                  {product.relatedProducts.map((related) => {
                    const id = typeof related === 'string' ? related : related._id;
                    const isPopulated = typeof related === 'object' && related.name;

                    return (
                      <li key={id}>
                        {isPopulated
                          ? `${related.name} (${related.sku}) — $${related.price.toFixed(2)}`
                          : id}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
