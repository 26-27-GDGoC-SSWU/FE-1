import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TodoPage from "./pages/TodoPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import RecommendPage from "./pages/RecommendPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

// 오늘 날짜를 "YYYY-MM-DD" 형식으로 만들어주는 함수 (date input의 value 형식)
function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function App() {
  // 여러 페이지에서 같이 쓰는 상태는 공통 부모인 App에 둔다
  // 선택한 날짜 (처음엔 오늘 날짜)
  const [date, setDate] = useState(getToday());
  // 전체 할 일 목록 - 각 할 일은 어떤 날짜의 것인지 date를 함께 저장한다
  const [todos, setTodos] = useState([]);

  // 새 할 일 추가: 기존 배열 뒤에 붙여서 입력한 순서가 유지되도록 한다
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), date, text, detail: "", done: false };
    setTodos([...todos, newTodo]);
  };

  // 완료 여부 토글
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 할 일 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 세부사항 수정
  const updateDetail = (id, detail) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, detail } : todo))
    );
  };

  return (
    <div className="app">
      {/* 모든 페이지 위에 공통으로 보이는 메뉴 */}
      <Header />

      {/* 주소(path)에 따라 다른 페이지 컴포넌트를 보여준다 */}
      <Routes>
        <Route
          path="/"
          element={
            <TodoPage
              date={date}
              onChangeDate={setDate}
              todos={todos}
              onAdd={addTodo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          }
        />
        {/* :id 자리에 오는 값은 useParams()로 꺼낼 수 있다 */}
        <Route
          path="/todo/:id"
          element={
            <TodoDetailPage todos={todos} onChangeDetail={updateDetail} />
          }
        />
        <Route
          path="/recommend"
          element={<RecommendPage date={date} onAdd={addTodo} />}
        />
        {/* 위에 없는 주소는 모두 여기로 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
