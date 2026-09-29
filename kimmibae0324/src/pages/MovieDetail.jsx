import { Link, useLocation, useParams } from "react-router";
import RatingStars from "../components/RatingStars";

function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();

  const movie = location.state?.movie;

  return (
    <div className="detail-page">
      <Link to="/movies" className="back-link">
          ← MOVIES
        </Link>

      <h1>MOVIE DETAIL</h1>

      {movie && (
        <div className="detail-content">
          <h2>{movie.title}</h2>

          <div className="detail-rating">
            <RatingStars rating={movie.rating} />

            {movie.rating >= 4 && (
              <span className="recommend-badge">
                추천작
              </span>
            )}
          </div>

          <p className="detail-review">
            {movie.review}
          </p>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;