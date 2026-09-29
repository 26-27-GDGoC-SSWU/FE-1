import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import MemoModal from '../components/MemoModal';

// [3단계] 페이지 1 — 달력 + 메모 화면
function HomePage({ studyItems, cycleDays, memos, onSaveMemo }) {
  // 이 페이지 안에서만 쓰는 상태(선택된 날짜)는 페이지 컴포넌트에 둠
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="page">
      <h2 className="page-title">📅 복습 달력</h2>
      <Calendar
        studyItems={studyItems}
        cycleDays={cycleDays}
        memos={memos}
        onDayClick={setSelectedDate}
      />
      <MemoModal
        date={selectedDate}
        initialMemo={selectedDate ? memos[selectedDate] : ''}
        onSave={onSaveMemo}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  );
}

export default HomePage;
