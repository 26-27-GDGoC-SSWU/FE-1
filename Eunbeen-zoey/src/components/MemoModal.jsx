import React, { useState, useEffect } from 'react';

// [기능 3] 달력 한 칸을 누르면 그 날의 계획을 입력할 수 있는 메모칸이 나타남
// [2단계] 사용자 행동(날짜 클릭)에 따라 화면 상태가 변하는 대표 기능
function MemoModal({ date, initialMemo, onSave, onClose }) {
  const [text, setText] = useState(initialMemo || '');

  useEffect(() => {
    setText(initialMemo || '');
  }, [date, initialMemo]);

  if (!date) return null;

  const handleSave = () => {
    onSave(date, text);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{date} 계획 메모</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="이 날 복습할 내용이나 계획을 적어보세요."
          rows={6}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose} className="cancel-btn">닫기</button>
        </div>
      </div>
    </div>
  );
}

export default MemoModal;
