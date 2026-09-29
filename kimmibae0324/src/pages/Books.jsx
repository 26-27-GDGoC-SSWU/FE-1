import { useState } from "react";
import { Link } from "react-router";
import BookCard from "../components/BookCard";

const initialBooks = [
  {
    id: 1,
    title: "1984",
    rating: 5,
    review: "생각할 거리가 많았던 책",
    color: "#7a4635",
  },
  {
    id: 2,
    title: "Norwegian Wood",
    rating: 4,
    review: "분위기가 인상적이었다",
    color: "#31594c",
  },
];

function Books() {
  const [books, setBooks] = useState(initialBooks);

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [color, setColor] = useState("#6b5b95");

  const [showForm, setShowForm] = useState(false);

  function handleAddBook() {
    const newBook = {
      id: Date.now(),
      title: title,
      rating: Number(rating),
      review: review,
      color: color,
    };

    setBooks([...books, newBook]);

    setTitle("");
    setRating("");
    setReview("");
    setColor("#6b5b95");

    setShowForm(false);
  }

  return (
    <div>
      <Link to="/" className="back-link">
        ← HOME
      </Link>

      <h1>BOOK ARCHIVE</h1>

      <button onClick={() => setShowForm(true)}>
        + 책 추가
      </button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>책 추가</h2>

            <input
              type="text"
              placeholder="책 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                >
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>

            <textarea
              placeholder="감상평"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <div className="book-color-select">
              <span>표지 색상</span>

              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="modal-buttons">
              <button onClick={() => setShowForm(false)}>
                취소
              </button>

              <button onClick={handleAddBook}>
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="book-list">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            rating={book.rating}
            review={book.review}
            color={book.color}
          />
        ))}
      </div>
    </div>
  );
}

export default Books;