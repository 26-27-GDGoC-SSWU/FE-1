import {useState} from "react";

import "./App.css";
import PerformanceItem from "./components/PerformanceItem";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  function handleAdd() {
    setShowForm(!showForm);
  }

  const [performances, setPerformances] = useState([
    {
      id: 1,
      title: "헤르츠클란",
      type: "연극",
      date: "2026.04.11",
      place: "링크아트센터드림 드림3관",
    },
    {
      id: 2,
      title: "오 맡겨주세요!",
      type: "콘서트",
      date: "2026.05.07",
      place: "링크아트센터드림 드림1관",
    },
    {
      id: 3,
      title: "디어 에반 핸슨",
      type: "뮤지컬",
      date: "2026.08.19",
      place: "충무아트센터 대극장",
    },
  ]);

  function handleSubmit() {
    setPerformances([
      ...performances,
      {
        id: performances.length + 1,
        title: title,
        type: type,
        date: date,
        place: place,
      },
    ]);

    setTitle("");
    setType("");
    setDate("");
    setPlace("");
  }

  return (
    <div className = "app">
      <header className = "header">
        <h1> STAGE ARCHIVE </h1>
        <p> 📁 Performing_art.zip </p>
      </header>

      <main className = "container">
        <button onClick={handleAdd} className = "add-button">
          + 기록 추가
        </button>

        {showForm && (
          <div className="add-form">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공연명을 입력하세요"
            />

            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className={type === "" ? "placeholder" : ""}
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

            <button onClick={handleSubmit}>추가</button>
          </div>
        )}

        <section className="performance-section">
          <h2> 최근 관람한 공연 </h2>

          <div className="filter">
            <button> 전체 </button>
            <button> 뮤지컬 </button>
            <button> 연극 </button>
            <button> 콘서트 </button>
          </div>

          {performances.length > 0 ? (
            <div className="performance-grid">
              {performances.map((performance) => (
                <PerformanceItem
                  key={performance.id}
                  title={performance.title}
                  type={performance.type}
                  date={performance.date}
                  place={performance.place}
                />
              ))}
            </div>
          ) : (
          <p className="empty-massage"> 아직 기록한 공연이 없어요. </p>
        )}
        </section>
      </main>
    </div>
  );
}

export default App;