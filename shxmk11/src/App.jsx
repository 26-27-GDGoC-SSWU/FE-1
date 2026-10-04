import { useEffect, useState } from "react";
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
                  poster={performance.poster}
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

  const [searchResults, setSearchResults] = useState([]);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  async function handleSearch() {
  if (!title.trim()) {
    setSearchMessage("공연명을 입력해주세요.");
    return;
  }

  setIsSearching(true);
  setSearchResults([]);
  setSearchMessage("");

  try {
    const apiKey = import.meta.env.VITE_KOPIS_KEY;
    
    // 1. API 키 존재 여부 검증
    if (!apiKey) {
      throw new Error(".env 파일의 VITE_KOPIS_KEY를 읽어오지 못했습니다. 개발 서버를 재시작해 보세요.");
    }

    const formatDate = (date) => {
      return (
        date.getFullYear().toString() +
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0")
      );
    };

    const today = new Date();
    // 2. 최근 3년 동안의 공연 검색 (필요에 따라 연도 조절 가능)
    const startDate = new Date();
    startDate.setFullYear(today.getFullYear() - 3);

    const url = `/kopis/pblprfr?service=${apiKey}&stdate=${formatDate(
      startDate
    )}&eddate=${formatDate(today)}&cpage=1&rows=100&shprfnm=${encodeURIComponent(
      title.trim()
    )}`;

    // 3. 브라우저 콘솔(F12)에서 실제 전송되는 URL 확인용
    console.log("요청 URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = Array.from(xml.querySelectorAll("db"));

    const results = items.map((item) => ({
      id: item.querySelector("mt20id")?.textContent || "",
      title: item.querySelector("prfnm")?.textContent || "",
      type: item.querySelector("genrenm")?.textContent || "",
      place: item.querySelector("fcltynm")?.textContent || "",
      poster: item.querySelector("poster")?.textContent || "",
    }));

    if (results.length === 0) {
      setSearchMessage("검색 결과가 없어요.");
    } else {
      setSearchResults(results);
    }
  } catch (error) {
    setSearchMessage(`검색 오류: ${error.message}`);
  } finally {
    setIsSearching(false);
  }
}

  function handleSelectPerformance(performance) {
    setSelectedPerformance(performance);
    setSearchResults([]);
    setTitle(performance.title);
    setType(performance.type);
    setPlace(performance.place);
    setSearchMessage("");
  }

  function handleSubmit() {
    const newPerformance = {
      id: performances.length + 1,
      title: title,
      type: type,
      date: date,
      place: place,
      poster: selectedPerformance?.poster || "",
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

      <div className="search-performance">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="공연명을 입력하세요"
        />

        <button onClick={handleSearch}>
          {isSearching ? "검색 중..." : "공연 정보 불러오기"}
        </button>
      </div>

      {searchMessage && (
        <p className="search-message">{searchMessage}</p>
      )}

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((performance) => (
            <button
              key={performance.id}
              onClick={() => handleSelectPerformance(performance)}
            >
              {performance.poster && (
                <img
                  src={performance.poster}
                  alt=""
                  className="search-result-poster"
                />
              )}

              <div className="search-result-info">
                <strong>{performance.title}</strong>
                <span>{performance.type}</span>
                <span>{performance.place}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedPerformance && (
        <div className="selected-performance">
          <div>
            <span>공연명</span>
            <p>{title}</p>
          </div>

          <div>
            <span>공연 종류</span>
            <p>{type}</p>
          </div>

          <div>
            <span>공연 장소</span>
            <p>{place}</p>
          </div>
        </div>
      )}

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
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
          <div className="detail-poster">
            {performance.poster && (
              <img src={performance.poster} alt={performance.title} />
            )}
          </div>

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