import { useState } from 'react';
import { Link } from 'react-router';
import { searchPlace, searchTransitRoutes } from './kakaoApi.js';
export default function RouteSearchPage() {
  //출발지 입력값
  const [startLocation, setStartLocation] = useState('');
  //도착지 입력 값
  const [endLocation, setEndLocation] = useState('');
  //API에서 받아온 경로 후보
  const [routeOptions, setRouteOptions] = useState();

  //API호출 중 발생한 에러메세지
  const [errorMessage, setErrorMessage] = useState('');
  //현재 API 요청 중인지
  const [isLoading, setIsLoading] = useState(false);
  //사용자가 한 번이라도 경로찾기를 눌렀는지
  const [hasSearched, setHasSearched] = useState(false);
  // Empty 상태는 별도 state로 만들지 않고 계산
  const isEmpty =
    hasSearched && !isLoading && !errorMessage && routeOptions.length === 0;

  function handleStartChange(e) {
    setStartLocation(e.target.value);
  }

  function handleEndChange(e) {
    setEndLocation(e.target.value);
  }
  // [경로 찾기] 버튼을 클릭했을 때 실행되는 함수
  async function handleSearch() {
    const start = startLocation.trim();
    const end = endLocation.trim();

    if (start === '' || end === '') {
      setErrorMessage('출발지와 도착지를 모두 입력해주세요.');
      return;
    }

    if (start === end) {
      setErrorMessage('출발지와 도착지가 같아요.');
      return;
    }

    setErrorMessage('');
    setRouteOptions([]);
    setHasSearched(true);
    setIsLoading(true);
    try {
      // 1) 출발지/도착지 문자열 → 좌표
      const startPlace = await searchPlace(start);
      const endPlace = await searchPlace(end);

      console.log('출발지 검색 결과:', startPlace);
      console.log('도착지 검색 결과:', endPlace);
      //장소검색 실패
      if (!startPlace) {
        setErrorMessage(`'${start}'에 해당하는 장소를 찾지 못했어요.`);
        return;
      }

      if (!endPlace) {
        setErrorMessage(`'${end}'에 해당하는 장소를 찾지 못했어요.`);
        return;
      }

      // 2) 좌표 → 대중교통 경로
      const routeData = await searchTransitRoutes(startPlace, endPlace);
      console.log('대중교통 API 전체 응답:', routeData);
      setRouteOptions(routeData.routes);
    } catch (error) {
      console.error(error);
      setErrorMessage('경로를 불러오지 못했어요. 콘솔을 확인해주세요.');
    } finally {
      // 성공하든 실패하든, 중간에 return해도 마지막에 항상 실행
      setIsLoading(false);
    }
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
        {/* 추가: 에러 메시지가 있을 때만 보여주기 */}
        {isLoading && <p>경로를 찾고 있어요...</p>}

        {errorMessage && <p className="route-search-error">{errorMessage}</p>}

        {isEmpty && (
          <p className="route-search-empty">해당하는 경로가 없어요.</p>
        )}

        {/* 추가: 기존 저장 버튼 스타일 재사용 */}
        <div className="memory-form-actions">
          <button
            className="save-button"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? '찾는 중...' : '경로 찾기'}
          </button>
        </div>
      </div>
    </main>
  );
}
