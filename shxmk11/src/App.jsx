import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router";
import "./App.css";
import PerformanceItem from "./components/PerformanceItem";

const initialPerformances = [
  {
    id: 1,
    title: "헤르츠클란",
    type: "연극",
    date: "2026.04.11",
    place: "링크아트센터드림 드림3관",
    casting: "",
    seat: "",
    price: "",
    rating: 0,
    review: "",
  },
  {
    id: 2,
    title: "오 맡겨주세요!",
    type: "콘서트",
    date: "2026.05.07",
    place: "링크아트센터드림 드림1관",
    casting: "",
    seat: "",
    price: "",
    rating: 0,
    review: "",
  },
  {
    id: 3,
    title: "디어 에반 핸슨",
    type: "뮤지컬",
    date: "2026.08.19",
    place: "충무아트센터 대극장",
    casting: "",
    seat: "",
    price: "",
    rating: 0,
    review: "",
  },
];

function Home({ performances }) {
  return (
    <div className="app">
      <header className="header">
        <h1>STAGE ARCHIVE</h1>
        <p>📁 Performing_art.zip</p>
      </header>

      <main className="container">
        <Link to="/archiving" className="add-button">
          + 기록 추가
        </Link>

        <section className="performance-section">
          <h2>최근 관람한 공연</h2>

          <div className="filter">
            <button>전체</button>
            <button>뮤지컬</button>
            <button>연극</button>
            <button>콘서트</button>
          </div>

          {performances.length > 0 ? (
            <div className="performance-grid">
              {performances.map((performance) => (
                <PerformanceItem
                  key={performance.id}
                  id={performance.id}
                  title={performance.title}
                  type={performance.type}
                  date={performance.date}
                  place={performance.place}
                />
              ))}
            </div>
          ) : (
            <p className="empty-massage">아직 기록한 공연이 없어요.</p>
          )}
        </section>
      </main>
    </div>
  );
}

function Archiving({ performances, setPerformances }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [casting, setCasting] = useState("");
  const [seat, setSeat] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  function handleSubmit() {
    const newPerformance = {
      id: performances.length + 1,
      title: title,
      type: type,
      date: date,
      place: place,
      casting: casting,
      seat: seat,
      price: price,
      rating: Number(rating),
      review: review,
    };

    setPerformances([...performances, newPerformance]);
    navigate("/");
  }

  return (
    <div className="archiving-page">
      <h1>공연 기록하기</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="공연명을 입력하세요"
      />

      <select
        className={type ? "has-value" : ""}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">공연 종류를 선택하세요</option>
        <option value="뮤지컬">뮤지컬</option>
        <option value="연극">연극</option>
        <option value="콘서트">콘서트</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="공연 장소를 입력하세요"
      />

      <input
        value={casting}
        onChange={(e) => setCasting(e.target.value)}
        placeholder="캐스팅을 입력하세요"
      />

      <input
        value={seat}
        onChange={(e) => setSeat(e.target.value)}
        placeholder="좌석을 입력하세요"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="티켓 가격을 입력하세요"
      />

      <select
        className={rating ? "has-value" : ""}
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">별점을 선택하세요</option>
        <option value="1">★☆☆☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="3">★★★☆☆</option>
        <option value="4">★★★★☆</option>
        <option value="5">★★★★★</option>
      </select>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="관람 후기를 남겨보세요"
      />

      <button onClick={handleSubmit}>저장하기</button>
    </div>
  );
}

function PerformanceDetail({ performances }) {
  const { id } = useParams();

  const performance = performances.find(
    (performance) => performance.id === Number(id)
  );

  if (!performance) {
    return <h1>공연 기록을 찾을 수 없습니다.</h1>;
  }

  return (
    <div className="detail-page">
      <Link to="/">← 돌아가기</Link>

      <div className="detail-card">
        <div className="detail-top">
          <div className="detail-poster"></div>

          <div className="detail-main">
            <p className="detail-type">{performance.type}</p>
            <h1>{performance.title}</h1>
            <p className="detail-date">{performance.date}</p>
            <p className="detail-place">{performance.place}</p>
          </div>
        </div>

        <div className="detail-bottom">
          <div className="detail-item">
            <span>CASTING</span>
            <p>{performance.casting || "기록 없음"}</p>
          </div>

          <div className="detail-item">
            <span>SEAT</span>
            <p>{performance.seat || "기록 없음"}</p>
          </div>

          <div className="detail-item">
            <span>PRICE</span>
            <p>{performance.price || "기록 없음"}</p>
          </div>

          <div className="detail-item">
            <span>RATING</span>
            <p className="rating">
              {"★".repeat(performance.rating)}
              {"☆".repeat(5 - performance.rating)}
            </p>
          </div>

          <div className="detail-item review">
            <span>REVIEW</span>
            <p>{performance.review || "아직 후기가 없습니다."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [performances, setPerformances] = useState(initialPerformances);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home performances={performances} />}
        />

        <Route
          path="/archiving"
          element={
            <Archiving
              performances={performances}
              setPerformances={setPerformances}
            />
          }
        />

        <Route
          path="/performance/:id"
          element={
            <PerformanceDetail performances={performances} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;