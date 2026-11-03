import { useState, useMemo } from 'react';
import Calendar from '../components/Calendar';
import MemoModal from '../components/MemoModal';
import HolidayPanel from '../components/HolidayPanel';
import useHolidays from '../hooks/useHolidays';

// [3단계] 페이지 1 — 달력 + 메모 화면
function HomePage({ studyItems, cycleDays, memos, onSaveMemo }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // 보고 있는 달 상태 (Calendar에서 끌어올림)
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0~11

  const handleChangeMonth = (year, month) => {
    setViewYear(year);
    setViewMonth(month);
  };

  // ✅ 외부 API 호출을 HomePage에서 한 번만 하고 결과를 나눠줌
  const { holidays, status, error, retry } = useHolidays(viewYear, viewMonth + 1);

  // ✅ { 일(day): 공휴일 이름 } 형태로 가공 → 예: { 25: '기독탄신일' }
  const holidayMap = useMemo(() => {
    const map = {};
    holidays.forEach((h) => {
      const day = Number(h.date.slice(8, 10)); // "2026-12-25" → 25
      map[day] = map[day] ? `${map[day]}, ${h.localName}` : h.localName;
    });
    return map;
  }, [holidays]);

  return (
    <div className="page">
      <h2 className="page-title">📅 복습 달력</h2>
      <Calendar
        studyItems={studyItems}
        cycleDays={cycleDays}
        memos={memos}
        onDayClick={setSelectedDate}
        viewYear={viewYear}
        viewMonth={viewMonth}
        onChangeMonth={handleChangeMonth}
        holidayMap={holidayMap}
      />

      {/* 외부 API: 한국 공휴일 */}
      <HolidayPanel
        month={viewMonth + 1}
        holidays={holidays}
        status={status}
        error={error}
        onRetry={retry}
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