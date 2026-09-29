import { Link, useNavigate, useParams } from "react-router-dom";

// 할 일 상세 페이지 ("/todo/:id") - 세부사항을 적을 수 있다
function TodoDetailPage({ todos, onChangeDetail }) {
  // 주소의 :id 부분을 꺼낸다 (문자열이라 숫자로 바꿔서 비교)
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = todos.find((todo) => todo.id === Number(id));

  // 없는 할 일이면 (예: 새로고침해서 데이터가 사라진 경우) 안내 문구
  if (!todo) {
    return (
      <div className="todo-detail">
        <p className="empty">할 일을 찾을 수 없어요</p>
        <Link to="/">← 목록으로</Link>
      </div>
    );
  }

  return (
    <div className="todo-detail">
      {/* navigate(-1): 브라우저 뒤로가기와 같다 */}
      <button className="back" onClick={() => navigate(-1)}>
        ← 뒤로
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

export default TodoDetailPage;
