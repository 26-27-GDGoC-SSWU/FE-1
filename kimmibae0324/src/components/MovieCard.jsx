import { Link } from "react-router";

function MovieCard({ id, title, rating, review }) {
  const movie = {
    id,
    title,
    rating,
    review,
  };

  return (
    <Link
      to={`/movies/${id}`}
      state={{ movie }}
      className="movie-card-link"
    >
      <div className="movie-slate">
        <div className="slate-top"></div>

        <div className="slate-body">
          <span>MOVIE</span>
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;