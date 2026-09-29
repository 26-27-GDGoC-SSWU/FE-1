// 에빙하우스 망각 곡선 기반 복습일 계산 유틸

// startDate: 'YYYY-MM-DD' 형식의 학습 시작일
// cycleDays: 복습 주기 배열 (예: [1, 3, 7, 14, 30])
export function calculateReviewDates(startDate, cycleDays) {
  const base = new Date(startDate);
  return cycleDays.map((days) => {
    const reviewDate = new Date(base);
    reviewDate.setDate(reviewDate.getDate() + days);
    return formatDate(reviewDate);
  });
}

export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// year, month(0-indexed)를 받아 7열짜리 주 단위 달력 매트릭스를 반환
export function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();

  const matrix = [];
  let week = new Array(startWeekday).fill(null);

  for (let day = 1; day <= lastDay.getDate(); day++) {
    week.push(new Date(year, month, day));
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}

// 학습 항목별로 순환 배정할 기본 색상 팔레트
export const COLOR_PALETTE = [
  '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
  '#9b59b6', '#1abc9c', '#e67e22', '#34495e',
];
