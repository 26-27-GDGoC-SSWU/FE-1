import React, { useState } from 'react';

// [기능 1] 사용자가 복습 주기를 자신의 기호에 따라 변경 가능
// Props로 현재 주기 배열과 변경 콜백(onChange)을 부모로부터 전달받음
function CycleSettings({ cycleDays, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const num = parseInt(inputValue, 10);
    if (!num || num <= 0) return;
    if (cycleDays.includes(num)) return;
    const updated = [...cycleDays, num].sort((a, b) => a - b);
    onChange(updated);
    setInputValue('');
  };

  const handleRemove = (day) => {
    onChange(cycleDays.filter((d) => d !== day));
  };

  const handleReset = () => {
    onChange([1, 3, 7, 14, 30]);
  };

  return (
    <div className="cycle-settings">
      <h3>복습 주기 설정</h3>
      <p className="cycle-desc">
        학습일로부터 며칠 뒤에 복습할지 자유롭게 추가/삭제하세요.
      </p>
      <div className="cycle-list">
        {cycleDays.map((day) => (
          <span key={day} className="cycle-chip">
            {day}일 후
            <button onClick={() => handleRemove(day)} aria-label="삭제">
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="cycle-input-row">
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="예: 21"
        />
        <button onClick={handleAdd}>추가</button>
        <button onClick={handleReset} className="reset-btn">
          기본값
        </button>
      </div>
    </div>
  );
}

export default CycleSettings;
