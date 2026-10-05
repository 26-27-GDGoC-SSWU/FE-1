import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import RatingStars from "../components/RatingStars";

function BookDetail() {
  const { id } = useParams();
  const location = useLocation();

  const book = location.state?.book;

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getBookDescription() {
      if (!book?.workKey) return;

      setLoading(true);

      try {
        const workKey = book.workKey.startsWith("/works/")
          ? book.workKey
          : `/works/${book.workKey}`;

        const response = await fetch(
          `https://openlibrary.org${workKey}.json`
        );

        const data = await response.json();

        if (typeof data.description === "string") {
          setDescription(data.description);
        } else if (data.description?.value) {
          setDescription(data.description.value);
        } else {
          setDescription("등록된 책 소개가 없습니다.");
        }
      } catch (error) {
        console.error(error);
        setDescription("책 소개를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    getBookDescription();
  }, [book?.workKey]);

  return (
    <div className="detail-page">
      <Link to="/books" className="back-link">
        ← BOOKS
      </Link>

      <h1>BOOK DETAIL</h1>

      {book && (
        <div className="detail-content">

          {book.coverId && (
            <img
              className="book-detail-cover"
              src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
              alt={book.title}
            />
          )}

          <h2>{book.title}</h2>

          {book.author && (
            <p className="book-author">
              {book.author}
            </p>
          )}

          {book.publishYear && (
            <p className="book-year">
              {book.publishYear}
            </p>
          )}

          <div className="detail-rating">
            <RatingStars rating={book.rating} />

            {book.rating >= 4 && (
              <span className="recommend-badge">
                추천작
              </span>
            )}
          </div>

          <div className="my-review">
            <h3>내 감상평</h3>
            <p className="detail-review">
              {book.review}
            </p>
          </div>

          <div className="book-description">
            <h3>책 소개</h3>

            {loading ? (
              <p>책 정보를 불러오는 중...</p>
            ) : (
              <p>{description}</p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default BookDetail;