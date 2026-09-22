// 할 일 하나를 그리는 컴포넌트
// 부모(TodoList)로부터 props로 todo 객체를 전달받는다
function TodoItem({ todo }) {
  return (
    <li className="todo-item">
      <span className={todo.done ? "done" : ""}>{todo.text}</span>
      <span className="badge">{todo.done ? "완료" : "진행중"}</span>
    </li>
  );
}

export default TodoItem;
