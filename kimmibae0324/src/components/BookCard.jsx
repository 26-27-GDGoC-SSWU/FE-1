import { Link } from "react-router";

function BookCard({ book }) {
  return (
    <Link
      to={`/books/${book.id}`}
      state={{ book }}
      className="book-card-link"
    >
      <div
        className="book-cover"
        style={{ backgroundColor: book.color }}
      >
        <span className="book-label">MY BOOK</span>
        <h2>{book.title}</h2>
      </div>
    </Link>
  );
}

export default BookCard;