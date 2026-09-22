import TodoItem from "./TodoItem";

// 배열(todos)을 props로 받아서 map()으로 TodoItem을 반복 출력하는 컴포넌트
function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} /> // 리스트 렌더링 시 key는 필수
      ))}
    </ul>
  );
}

export default TodoList;
