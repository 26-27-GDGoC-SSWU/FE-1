import { useState } from 'react';
import { Link } from 'react-router';

export default function RouteSearchPage() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  function handleStartChange(e) {
    setStartLocation(e.target.value);
  }

  function handleEndChange(e) {
    setEndLocation(e.target.value);
  }
  return (
    <main className="station-page">
      <div className="station-page-header">
        <Link className="back-to-route" to="/">
          ← 노선도로
        </Link>

        <p className="section-label">새 노선 만들기</p>

        <div className="station-title-row">
          <h1>경로를 입력하세요</h1>
        </div>
      </div>
      <div className="memory-form">
        <h3>어디에서 어디로 가나요?</h3>

        <div className="memory-form-row">
          <input
            type="text"
            value={startLocation}
            onChange={handleStartChange}
            placeholder="출발지"
          />

          <input
            type="text"
            value={endLocation}
            onChange={handleEndChange}
            placeholder="도착지"
          />
        </div>

        {/* 임시 확인용: 6단계에서 삭제 예정 */}
        <p>
          입력 확인: {startLocation || '(비어 있음)'} →{' '}
          {endLocation || '(비어 있음)'}
        </p>
      </div>
    </main>
  );
}
