export function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
}

export function averageRating(ratings) {
  if (!ratings?.length) return null;
  const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  return Number(avg.toFixed(1));
}

export function discountedPrice(price, discountPercent) {
  if (!discountPercent) return null;
  return Number((price * (1 - discountPercent / 100)).toFixed(2));
}

export function getDisplayPrice(product) {
  return discountedPrice(product.price, product.discountPercent) ?? product.price;
}

export function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
    case 'price-desc':
      return sorted.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
    case 'rating':
      return sorted.sort(
        (a, b) => (averageRating(b.ratings) ?? 0) - (averageRating(a.ratings) ?? 0)
      );
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
}

export function filterProducts(products, { search, category, inStockOnly, featuredOnly }) {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    if (category && category !== 'All' && product.category !== category) return false;
    if (inStockOnly && !product.inStock) return false;
    if (featuredOnly && !product.isFeatured) return false;

    if (!query) return true;

    const haystack = [
      product.name,
      product.description,
      product.sku,
      product.category,
      ...(product.tags ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}
