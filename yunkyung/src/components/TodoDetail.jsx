// 할 일 하나의 상세 화면 - 세부사항을 적을 수 있다
function TodoDetail({ todo, onChangeDetail, onBack }) {
  return (
    <div className="todo-detail">
      <button className="back" onClick={onBack}>
        ← 목록으로
      </button>
      <p className="detail-date">{todo.date}</p>
      <h2 className={todo.done ? "done" : ""}>{todo.text}</h2>
      {/* 입력할 때마다 바로 App의 todos에 저장된다 */}
      <textarea
        value={todo.detail}
        onChange={(e) => onChangeDetail(todo.id, e.target.value)}
        placeholder="세부사항을 적어보세요"
        rows={8}
      />
    </div>
  );
}

export default TodoDetail;
