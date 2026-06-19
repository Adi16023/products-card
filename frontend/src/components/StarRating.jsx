export default function StarRating({ value, count, size = 'md' }) {
  if (!value) return null;

  return (
    <div className={`star-rating star-rating-${size}`} aria-label={`${value} out of 5 stars`}>
      <span className="star-rating-stars">{'★'.repeat(Math.round(value))}</span>
      <span className="star-rating-value">{value}</span>
      {count != null && <span className="star-rating-count">({count})</span>}
    </div>
  );
}
