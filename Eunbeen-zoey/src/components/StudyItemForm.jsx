import React, { useState } from 'react';

// 새로운 학습 항목(과목/주제)을 등록하는 폼
function StudyItemForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !startDate) return;
    onAdd({ title: title.trim(), startDate });
    setTitle('');
    setStartDate('');
  };

  return (
    <form className="study-item-form" onSubmit={handleSubmit}>
      <h3>학습 항목 추가</h3>
      <input
        type="text"
        placeholder="예: 영어 단어 Chapter 3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default StudyItemForm;
