import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./App.css";

// 화면에 보여줄 할 일 목록 (배열 데이터)
const todos = [
  { id: 1, text: "리액트 스터디 예습", done: true },
  { id: 2, text: "투두리스트 만들기", done: false },
  { id: 3, text: "과제 제출", done: false },
];

function App() {
  return (
    <div className="app">
      <Header />
      <p>2주차 실습입니다.</p>
      {/* 배열을 props로 자식 컴포넌트에 전달 */}
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
