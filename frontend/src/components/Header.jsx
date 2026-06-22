export default function Header({ cartCount, onCartClick ,onAddProduct,}) {
  return (
    <header className="site-header">
      <div className="promo-bar">
        Free shipping on orders over $75 · 30-day easy returns
      </div>

      <div className="header-main">
        <div className="header-inner">
          <a href="/" className="logo">
            <span className="logo-mark">◆</span>
            <span className="logo-text">ShopVault</span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#shop">Shop</a>
            <a href="#featured">Featured</a>
            <a href="#categories">Categories</a>
            <a href="#deals">Deals</a>
          </nav>

          <div className="header-actions">
            <button
  type="button"
  className="btn btn-primary"
  onClick={onAddProduct}
>
  Add Product
</button>
            <button type="button" className="icon-btn" aria-label="Account">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
              </svg>
            </button>

            <button type="button" className="icon-btn" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-7-4.35-9.33-8.5C.8 9.24 2.09 6 5.09 6A4.09 4.09 0 0 1 9 8.09 4.09 4.09 0 0 1 12.91 6c3 0 4.29 3.24 2.42 6.5C19 16.65 12 21 12 21Z" />
              </svg>
            </button>

            <button
              type="button"
              className="icon-btn cart-btn"
              aria-label={`Cart, ${cartCount} items`}
              onClick={onCartClick}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 10 18h9v-2h-8.42a.25.25 0 0 1-.22-.37L11 13h6.55a2 2 0 0 0 1.92-1.45L22 6H6.21l-.94-2ZM7 20a2 2 0 1 0 2-2 2 2 0 0 0-2 2Zm10 0a2 2 0 1 0 2-2 2 2 0 0 0-2 2Z" />
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
