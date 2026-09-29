import React from 'react';
import { formatDate } from '../utils/ebbinghaus';

// [1단계] 반복되는 UI(달력 한 칸)를 컴포넌트로 분리 + Props로 데이터 전달받는 예시
function DayCell({ date, reviewColors, hasMemo, isToday, onClick }) {
  if (!date) {
    return <div className="day-cell empty" />;
  }

  const dateStr = formatDate(date);

  return (
    <div
      className={`day-cell ${isToday ? 'today' : ''}`}
      onClick={() => onClick(dateStr)}
    >
      <span className="day-number">{date.getDate()}</span>

      {/* [기능 2] 같은 학습 항목의 복습일에는 같은 색깔 선으로 표시 */}
      {reviewColors.length > 0 && (
        <div className="review-marks">
          {reviewColors.map((color, idx) => (
            <span
              key={idx}
              className="review-line"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      {hasMemo && <span className="memo-dot" title="메모 있음" />}
    </div>
  );
}

export default DayCell;
