import { Link } from "react-router-dom";

// 없는 주소로 들어왔을 때 보여주는 페이지
function NotFoundPage() {
  return (
    <div className="todo-detail">
      <p className="empty">존재하지 않는 페이지예요</p>
      <Link to="/">← 홈으로</Link>
    </div>
  );
}

export default NotFoundPage;
