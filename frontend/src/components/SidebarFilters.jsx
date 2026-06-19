const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Wearables', 'Audio'];

export default function SidebarFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
  featuredOnly,
  onFeaturedChange,
}) {
  const options = categories.length ? ['All', ...categories.filter((c) => c !== 'All')] : CATEGORIES;

  return (
    <aside className="sidebar-filters" id="categories">
      <h2>Filters</h2>

      <div className="filter-group">
        <h3>Category</h3>
        <div className="filter-chips">
          {options.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Availability</h3>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
          />
          In stock only
        </label>
      </div>

      <div className="filter-group">
        <h3>Highlights</h3>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => onFeaturedChange(e.target.checked)}
          />
          Featured products
        </label>
      </div>
    </aside>
  );
}
