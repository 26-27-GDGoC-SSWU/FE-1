import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 외부 API 주소 - DummyJSON의 할 일 목록 (로그인/키 없이 쓸 수 있는 무료 API)
const API_URL = "https://dummyjson.com/todos";
const LIMIT = 5; // 한 번에 가져올 개수

// 추천 할 일 페이지 ("/recommend") - 외부 API에서 받아온 데이터를 출력한다
function RecommendPage({ date, onAdd }) {
  const [items, setItems] = useState([]); // API에서 받아온 할 일들
  const [loading, setLoading] = useState(true); // 불러오는 중인지
  const [error, setError] = useState(null); // 에러 메시지
  const [skip, setSkip] = useState(0); // 몇 번째부터 가져올지
  const [addedIds, setAddedIds] = useState([]); // 내 할 일에 추가한 항목 id

  // 처음 화면에 나타날 때 + skip이 바뀔 때마다 API를 호출한다
  useEffect(() => {
    fetch(`${API_URL}?limit=${LIMIT}&skip=${skip}`)
      .then((res) => {
        if (!res.ok) throw new Error(`요청 실패 (${res.status})`);
        return res.json(); // 응답(JSON)을 자바스크립트 객체로 변환
      })
      .then((data) => {
        setItems(data.todos);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [skip]);

  // 다른 추천 보기: 랜덤 위치부터 가져오도록 skip 변경 → useEffect 다시 실행
  const handleRefresh = () => {
    setLoading(true);
    setSkip(Math.floor(Math.random() * 250));
  };

  // 추천 할 일을 현재 선택된 날짜의 내 할 일에 추가
  const handleAdd = (item) => {
    onAdd(item.todo);
    setAddedIds([...addedIds, item.id]);
  };

  return (
    <>
      <p className="subtitle">
        외부 API(DummyJSON)에서 받아온 할 일이에요. 마음에 드는 걸{" "}
        <b>{date}</b> 할 일에 추가해보세요
      </p>

      <div className="todo-card">
        {loading && <p className="empty">불러오는 중...</p>}
        {!loading && error && <p className="empty error">{error}</p>}
        {!loading && !error && (
          <ul className="todo-list">
            {items.map((item) => (
              <li key={item.id} className="todo-item">
                <span className="text">{item.todo}</span>
                <button
                  className="add"
                  onClick={() => handleAdd(item)}
                  disabled={addedIds.includes(item.id)}
                >
                  {addedIds.includes(item.id) ? "추가됨" : "추가"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="recommend-actions">
        <button onClick={handleRefresh} disabled={loading}>
          다른 추천 보기
        </button>
        <Link to="/">내 할 일 보러가기 →</Link>
      </div>
    </>
  );
}

export default RecommendPage;
