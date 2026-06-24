export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-logo">ShopVault</p>
          <p className="footer-copy">
            Your trusted destination for quality gadgets and everyday tech essentials.
          </p>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="#shop">All products</a></li>
            <li><a href="#featured">Featured</a></li>
            <li><a href="#deals">Deals</a></li>
          </ul>
        </div>

        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#help">Help center</a></li>
            <li><a href="#shipping">Shipping</a></li>
            <li><a href="#returns">Returns</a></li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopVault. All rights reserved.</p>
      </div>
    </footer>
  );
}
