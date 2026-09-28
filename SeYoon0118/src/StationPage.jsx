import { useParams } from 'react-router';
import { stations } from './data.js';

export default function StationPage() {
  const { stationId } = useParams();

  const selectedStation = stations.find(
    (station) => station.id === Number(stationId),
  );

  return (
    <div>
      <h1>역 기록 페이지</h1>
      <p>현재 선택된 역 ID: {stationId}</p>
      <h2>{selectedStation.name}</h2>
    </div>
  );
}
