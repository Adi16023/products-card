import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import SidebarFilters from './components/SidebarFilters';
import ProductToolbar from './components/ProductToolbar';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import LoadingGrid from './components/LoadingGrid';
import Footer from './components/Footer';
import { filterProducts, getDisplayPrice, sortProducts } from './utils/productHelpers';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImage, setEditImage] = useState('');
  const [tags, setTags] = useState('');
  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      search,
      category: selectedCategory,
      inStockOnly,
      featuredOnly,
    });
    return sortProducts(filtered, sortBy);
  }, [products, search, selectedCategory, inStockOnly, featuredOnly, sortBy]);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.isFeatured).slice(0, 3),
    [products]
  );

  const cartTotal = cartItems.reduce((sum, item) => sum + item.displayPrice, 0);

  function handleAddToCart(product) {
    setCartItems((current) => {
      if (current.some((item) => item._id === product._id)) return current;

      return [
        ...current,
        {
          _id: product._id,
          name: product.name,
          image: product.image,
          displayPrice: getDisplayPrice(product),
        },
      ];
    });
    setCartOpen(true);
  }

  function handleRemoveFromCart(productId) {
    setCartItems((current) => current.filter((item) => item._id !== productId));
  }

  return (
    <div className="app">
      <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(true)} />
      <Hero />

      <main className="storefront" id="shop">
        {error && <p className="error-banner">{error}</p>}

        <FeaturedProducts
          products={featuredProducts}
          onView={setSelectedProduct}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />

        <section className="catalog">
          <SidebarFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            featuredOnly={featuredOnly}
            onFeaturedChange={setFeaturedOnly}
          />

          <div className="catalog-main">
            <ProductToolbar
              search={search}
              onSearchChange={setSearch}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={filteredProducts.length}
            />

            {loading ? (
              <LoadingGrid />
            ) : (
              <ProductGrid
                products={filteredProducts}
                onView={setSelectedProduct}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        inCart={cartItems.some((item) => item._id === selectedProduct?._id)}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        total={cartTotal}
      />
    </div>
  );
}