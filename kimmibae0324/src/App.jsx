import { useState } from "react";
import MovieList from "./components/MovieList";
import "./App.css";

const initialMovies = [
  {
    id: 1,
    title: "Interstellar",
    rating: 5,
    review: "다시 보고 싶은 영화",
  },
  {
    id: 2,
    title: "Dune",
    rating: 4,
    review: "영상미가 인상적이었다",
  },
  {
    id: 3,
    title: "Avatar",
    rating: 3,
    review: "세계관은 좋았지만 조금 길었다",
  },
];

function App() {
  // ① state는 여기
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [movies, setMovies] = useState(initialMovies);
  const [showForm, setShowForm] = useState(false);

  function handleAddMovie() {
    const newMovie = {
      id: Date.now(),
      title: title,
      rating: Number(rating),
      review: review,
    };

    setMovies([...movies, newMovie]);

    setTitle("");
    setRating("");
    setReview("");

    setShowForm(false);
  }

  return (
    <div>
      <h1>MY ARCHIVE</h1>

    <button onClick={() => setShowForm(true)}>
      + 영화 추가
    </button>

    {showForm && (
      <div className="modal">
        <div className="modal-content">
          <h2>영화 추가</h2>

          <input
            type="text"
            placeholder="영화 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="감상평"
            value={review}
            onChange={(e) => setReview(e.target.value)}
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

          <div className="modal-buttons">
            <button onClick={() => setShowForm(false)}>
              취소
            </button>

            <button onClick={handleAddMovie}>
              추가
            </button>
          </div>
        </div>
      </div>
    )}

    

      {/* ③ 기존 영화 목록은 그대로 */}
      <MovieList movies={movies} />
    </div>
  );
}

export default App;