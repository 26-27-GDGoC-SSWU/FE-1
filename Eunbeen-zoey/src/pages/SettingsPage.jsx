import React from 'react';
import CycleSettings from '../components/CycleSettings';
import StudyItemForm from '../components/StudyItemForm';

// [3단계] 페이지 2 — 복습 주기 설정 + 학습 항목 관리 화면
function SettingsPage({ cycleDays, onChangeCycle, studyItems, onAddItem, onRemoveItem }) {
  return (
    <div className="page">
      <h2 className="page-title">⚙️ 설정</h2>
      <CycleSettings cycleDays={cycleDays} onChange={onChangeCycle} />
      <StudyItemForm onAdd={onAddItem} />

      <div className="study-item-list">
        <h3>등록된 학습 항목</h3>
        {studyItems.length === 0 && (
          <p className="empty-msg">아직 등록된 항목이 없어요.</p>
        )}
        <ul>
          {studyItems.map((item) => (
            <li key={item.id}>
              <span className="legend-dot" style={{ backgroundColor: item.color }} />
              {item.title} ({item.startDate})
              <button onClick={() => onRemoveItem(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SettingsPage;
