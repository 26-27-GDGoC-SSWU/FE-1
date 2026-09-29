import React, { useState, useMemo } from 'react';
import DayCell from './DayCell';
import { getMonthMatrix, calculateReviewDates, formatDate } from '../utils/ebbinghaus';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// [기능 2] 달력 형태로 한 눈에 계획을 알아보기 쉽게 표현
function Calendar({ studyItems, cycleDays, memos, onDayClick }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const monthMatrix = useMemo(
    () => getMonthMatrix(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  // [1단계] 배열 데이터(studyItems)를 가공해 '날짜 -> 복습 색상 목록' 리스트 생성
  const reviewMap = useMemo(() => {
    const map = {};
    studyItems.forEach((item) => {
      const reviewDates = calculateReviewDates(item.startDate, cycleDays);
      reviewDates.forEach((dateStr) => {
        if (!map[dateStr]) map[dateStr] = [];
        map[dateStr].push(item.color);
      });
    });
    return map;
  }, [studyItems, cycleDays]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const todayStr = formatDate(today);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>‹</button>
        <h2>{viewYear}년 {viewMonth + 1}월</h2>
        <button onClick={handleNextMonth}>›</button>
      </div>

      <div className="calendar-grid weekday-row">
        {WEEKDAYS.map((w) => (
          <div key={w} className="weekday-label">{w}</div>
        ))}
      </div>

      {monthMatrix.map((week, wi) => (
        <div key={wi} className="calendar-grid">
          {week.map((date, di) => {
            const dateStr = date ? formatDate(date) : null;
            return (
              <DayCell
                key={di}
                date={date}
                reviewColors={dateStr ? reviewMap[dateStr] || [] : []}
                hasMemo={dateStr ? Boolean(memos[dateStr]) : false}
                isToday={dateStr === todayStr}
                onClick={onDayClick}
              />
            );
          })}
        </div>
      ))}

      <div className="legend">
        {studyItems.map((item) => (
          <div key={item.id} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: item.color }} />
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
