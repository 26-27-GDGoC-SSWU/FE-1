import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

// 메인 페이지 ("/") - 날짜를 고르고 할 일을 순서대로 적는다
function TodoPage({ date, onChangeDate, todos, onAdd, onToggle, onDelete }) {
  // 선택한 날짜의 할 일만 골라낸다
  const todosOfDate = todos.filter((todo) => todo.date === date);

  return (
    <>
      <p className="subtitle">날짜를 고르고 할 일을 순서대로 적어보세요</p>

      <label className="date-picker">
        날짜
        <input
          type="date"
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
        />
      </label>

      <div className="todo-card">
        <TodoForm onAdd={onAdd} />
        {todosOfDate.length === 0 ? (
          <p className="empty">이 날짜에 등록된 할 일이 없어요</p>
        ) : (
          <TodoList
            todos={todosOfDate}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        )}
      </div>
    </>
  );
}

export default TodoPage;
