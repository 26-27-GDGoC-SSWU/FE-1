import TodoItem from "./TodoItem";

// 배열(todos)을 props로 받아서 map()으로 TodoItem을 반복 출력하는 컴포넌트
function TodoList({ todos, onToggle, onDelete, onSelect }) {
  return (
    <ul className="todo-list">
      {/* index + 1 로 입력한 순서 번호를 붙인다 */}
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          order={index + 1}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

export default TodoList;
