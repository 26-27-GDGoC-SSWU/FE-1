function MovieCard({ title, rating, review }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{rating}점</p>
      {review && <p>{review}</p>}
      {rating >= 4 && <p>⭐ 추천작</p>}
    </div>
  );
}

export default MovieCard;