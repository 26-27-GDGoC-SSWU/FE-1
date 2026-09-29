import { Link } from "react-router";

function Home() {
  return (
    <div className="home-page">
      <p className="home-label">PERSONAL COLLECTION</p>

      <h1>MY ARCHIVE</h1>
      <p className="home-description">
      </p>

      <div className="archive-menu">
        <Link to="/movies" className="archive-card movie-menu">
          <span>01</span>
          <h2>MOVIE</h2>
          <p>내가 본 영화를 기록합니다</p>
          <strong>→</strong>
        </Link>

        <Link to="/books" className="archive-card book-menu">
          <span>02</span>
          <h2>BOOK</h2>
          <p>내가 읽은 책을 기록합니다</p>
          <strong>→</strong>
        </Link>
      </div>
    </div>
  );
}

export default Home;