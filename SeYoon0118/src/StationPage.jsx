import { useParams } from 'react-router';
import { stations, memories } from './data.js';

export default function StationPage() {
  const { stationId } = useParams();

  const selectedStation = stations.find(
    (station) => station.id === Number(stationId),
  );
  const selectedMemories = memories.filter(
    (memory) => memory.stationId === Number(stationId),
  );

  return (
    <div>
      <h1>{selectedStation.name}에서의 추억</h1>

      {selectedMemories.length > 0 ? (
        selectedMemories.map((memory) => (
          <div key={memory.id}>
            <h3>{memory.title}</h3>
            <p>{memory.place}</p>
            <p>{memory.date}</p>
            <p>{memory.diary}</p>
          </div>
        ))
      ) : (
        <p>아직 기록이 없어요</p>
      )}
    </div>
  );
}
