import { useParams } from 'react-router';
import { stations } from './data.js';
import MemoryCard from './MemoryCard.jsx';

export default function StationPage({ memories, setMemories }) {
  const { stationId } = useParams();

  const selectedStation = stations.find(
    (station) => station.id === Number(stationId),
  );
  const selectedMemories = memories.filter(
    (memory) => memory.stationId === Number(stationId),
  );

  function handleDelete(id) {
    setMemories(memories.filter((memory) => memory.id !== id));
  }

  return (
    <div>
      <h1>{selectedStation.name}에서의 추억</h1>

      {selectedMemories.length > 0 ? (
        selectedMemories.map((memory) => (
          <MemoryCard
            key={memory.id}
            id={memory.id}
            title={memory.title}
            place={memory.place}
            date={memory.date}
            diary={memory.diary}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>아직 기록이 없어요</p>
      )}
    </div>
  );
}
