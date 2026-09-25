import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import "./App.css";

// 오늘 날짜를 "YYYY-MM-DD" 형식으로 만들어주는 함수 (date input의 value 형식)
function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function App() {
  // 선택한 날짜 (처음엔 오늘 날짜)
  const [date, setDate] = useState(getToday());
  // 전체 할 일 목록 - 각 할 일은 어떤 날짜의 것인지 date를 함께 저장한다
  const [todos, setTodos] = useState([]);
  // 클릭해서 들어간 할 일의 id (null이면 목록 화면)
  const [selectedId, setSelectedId] = useState(null);

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

  // 클릭한 할 일 찾기
  const selectedTodo = todos.find((todo) => todo.id === selectedId);

  // 할 일을 클릭했으면 상세 화면을 보여준다
  if (selectedTodo) {
    return (
      <div className="app">
        <TodoDetail
          todo={selectedTodo}
          onChangeDetail={updateDetail}
          onBack={() => setSelectedId(null)}
        />
      </div>
    );
  }

  // 선택한 날짜의 할 일만 골라낸다
  const todosOfDate = todos.filter((todo) => todo.date === date);

  return (
    <div className="app">
      <h1>투두리스트</h1>
      <p className="subtitle">날짜를 고르고 할 일을 순서대로 적어보세요</p>

      <label className="date-picker">
        날짜
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <div className="todo-card">
        <TodoForm onAdd={addTodo} />
        {todosOfDate.length === 0 ? (
          <p className="empty">이 날짜에 등록된 할 일이 없어요</p>
        ) : (
          <TodoList
            todos={todosOfDate}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onSelect={setSelectedId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
