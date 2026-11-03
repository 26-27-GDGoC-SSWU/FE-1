import { useState, useEffect } from 'react';

// 외부 API(Nager.Date)에서 한국 공휴일을 받아오는 커스텀 훅
// status: 'loading' | 'error' | 'empty' | 'success'
export default function useHolidays(year, month) {
  const [holidays, setHolidays] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchHolidays() {
      setStatus('loading');
      setError('');
      try {
        const res = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/KR`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`서버 응답 오류 (${res.status})`);

        const data = await res.json();

        // 이번 달 공휴일만 거르기 (date 형식: "2026-11-03")
        const monthStr = String(month).padStart(2, '0');
        const filtered = data.filter((h) =>
          h.date.startsWith(`${year}-${monthStr}`)
        );

        setHolidays(filtered);
        setStatus(filtered.length === 0 ? 'empty' : 'success');
      } catch (err) {
        if (err.name === 'AbortError') return; // 페이지 이동 시 취소된 요청은 무시
        setError(err.message || '네트워크 오류');
        setStatus('error');
      }
    }

    fetchHolidays();
    return () => controller.abort();
  }, [year, month, reloadKey]);

  // "다시 시도" 버튼용
  const retry = () => setReloadKey((k) => k + 1);

  return { holidays, status, error, retry };
}