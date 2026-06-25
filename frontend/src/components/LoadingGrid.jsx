export default function LoadingGrid() {
  return (
    <div className="product-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="product-card skeleton-card">
          <div className="skeleton skeleton-image" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-line" />
        </div>
      ))}
    </div>
  );
}
