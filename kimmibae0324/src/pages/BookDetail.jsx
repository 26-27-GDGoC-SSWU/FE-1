import { Link, useLocation, useParams } from "react-router";
import RatingStars from "../components/RatingStars";

function BookDetail() {
  const { id } = useParams();
  const location = useLocation();

  const book = location.state?.book;

  return (
    <div className="detail-page">
      <Link to="/books" className="back-link">
          ← BOOKS
        </Link>

      <h1>BOOK DETAIL</h1>

      {book && (
        <div className="detail-content">
          <h2>{book.title}</h2>

          <div className="detail-rating">
            <RatingStars rating={book.rating} />

            {book.rating >= 4 && (
              <span className="recommend-badge">
                추천작
              </span>
            )}
          </div>

          <p className="detail-review">
            {book.review}
          </p>
        </div>
      )}
    </div>
  );
}

export default BookDetail;