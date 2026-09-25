// 할 일 하나를 그리는 컴포넌트
// 부모(TodoList)로부터 props로 순서 번호, todo 객체, 이벤트 함수를 전달받는다
function TodoItem({ order, todo, onToggle, onDelete, onSelect }) {
  return (
    <li className="todo-item">
      <span className="order">{order}</span>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {/* 텍스트를 클릭하면 상세 화면으로 들어간다 */}
      <button className="text-button" onClick={() => onSelect(todo.id)}>
        <span className={todo.done ? "text done" : "text"}>{todo.text}</span>
        {todo.detail && <span className="has-detail">📝</span>}
      </button>
      <button className="delete" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
