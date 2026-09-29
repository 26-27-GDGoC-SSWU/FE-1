function RatingStars({ rating }) {
  return (
    <div className="rating-display">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default RatingStars;