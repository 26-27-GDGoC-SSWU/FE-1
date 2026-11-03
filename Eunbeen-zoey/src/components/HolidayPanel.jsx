// 외부 API로 받은 공휴일을 상태별(Loading / Error / Empty / Success)로 출력
function HolidayPanel({ month, holidays, status, error, onRetry }) {
  return (
    <section className="holiday-panel">
      <h3>🎌 {month}월 공휴일</h3>

      {/* Loading 상태 */}
      {status === 'loading' && (
        <p className="state state-loading">⏳ 공휴일 정보를 불러오는 중...</p>
      )}

      {/* Error 상태 */}
      {status === 'error' && (
        <div className="state state-error">
          <p>⚠️ 공휴일 정보를 불러오지 못했어요. ({error})</p>
          <button onClick={onRetry}>다시 시도</button>
        </div>
      )}

      {/* Empty 상태 */}
      {status === 'empty' && (
        <p className="state state-empty">
          📭 이번 달에는 공휴일이 없어요. 계획대로 복습해요!
        </p>
      )}

      {/* Success 상태 */}
      {status === 'success' && (
        <ul className="holiday-list">
          {holidays.map((h) => (
            <li key={h.date + h.localName}>
              <span className="holiday-date">
                {h.date.slice(5).replace('-', '/')}
              </span>
              <span>{h.localName}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HolidayPanel;