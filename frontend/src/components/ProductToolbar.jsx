export default function ProductToolbar({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount,
}) {
  return (
    <div className="product-toolbar">
      <div className="search-field">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" />
        </svg>
        <input
          type="search"
          placeholder="Search products, tags, SKU..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products"
        />
      </div>

      <div className="toolbar-meta">
        <p>{resultCount} product{resultCount !== 1 ? 's' : ''}</p>
        <label className="sort-field">
          Sort by
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating">Top rated</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>
    </div>
  );
}
