import { useState } from "react";

// 할 일을 입력받아 부모(App)에게 전달하는 컴포넌트
function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // form 제출 시 새로고침 방지
    if (text.trim() === "") return; // 빈 칸은 추가하지 않음
    onAdd(text.trim());
    setText(""); // 입력창 비우기
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoForm;
