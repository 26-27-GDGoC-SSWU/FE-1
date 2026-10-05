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

  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  function handleAddBook() {
    if (!selectedBook) {
      alert("검색 결과에서 책을 선택해주세요.");
      return;
    }

    const newBook = {
      id: Date.now(),

      title: selectedBook.title,
      author: selectedBook.author_name?.[0] || "",
      coverId: selectedBook.cover_i,
      publishYear: selectedBook.first_publish_year,
      workKey: selectedBook.key,

      rating: Number(rating),
      review: review,
      color: color,
    };

    setBooks([...books, newBook]);

    setTitle("");
    setRating("");
    setReview("");
    setColor("#6b5b95");

      setSelectedBook(null);
      setSearchResults([]);

    setShowForm(false);
  }

  async function handleSearchBook() {
    if (!title.trim()) return;

    setSearching(true);

    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(
        title
      )}&fields=key,title,author_name,cover_i,first_publish_year&limit=5`
    );

    const data = await response.json();

    console.log(data.docs);

    setSearchResults(data.docs);
    setSearching(false);
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

            <button
              type="button"
              onClick={handleSearchBook}
            >
              책 검색
            </button>

            {searching && <p>검색 중...</p>}

              <div className="book-search-results">
                {searchResults.map((result) => (
                  <div
                    key={result.key}
                    className="book-search-item"
                  >
                    {result.cover_i && (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${result.cover_i}-S.jpg`}
                        alt={result.title}
                      />
                    )}

                    <div>
                      <strong>{result.title}</strong>

                      <p>
                        {result.author_name?.[0] || "저자 정보 없음"}
                      </p>

                      <p>
                        {result.first_publish_year || "출간연도 정보 없음"}
                      </p>
                    </div>
                        <button
                        type="button"
                        onClick={() => setSelectedBook(result)}
                      >
                        선택
                      </button>
                  </div>
                ))}
              </div>

              {selectedBook && (
                <div className="selected-book">
                  선택한 책:
                  <strong>
                    {selectedBook.title} - {selectedBook.author_name?.[0]}
                  </strong>
                </div>
              )}

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
            book={book}
          />
        ))}
      </div>
    </div>
  );
}

export default Books;