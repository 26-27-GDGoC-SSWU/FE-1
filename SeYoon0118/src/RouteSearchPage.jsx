import { Link } from 'react-router';

export default function RouteSearchPage() {
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
    </main>
  );
}
