import { Link } from "react-router";

function BookCard({ id, title, rating, review, color }) {
  const book = {
    id,
    title,
    rating,
    review,
    color,
  };

  return (
    <Link
      to={`/books/${id}`}
      state={{ book }}
      className="book-card-link"
    >
      <div
        className="book-cover"
        style={{ backgroundColor: color }}
      >
        <span className="book-label">MY BOOK</span>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default BookCard;