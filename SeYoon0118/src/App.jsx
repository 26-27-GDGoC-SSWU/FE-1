import MemoryCard from './MemoryCard.jsx';
import Station from './Station.jsx';
import { stations, memories as initialMemories } from './data.js'; //initialMemories:앱이 처음 시작할 때 사용할 추억 데이터
import { useState } from 'react';

export default function App() {
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id); //[현재 선택된 역 ID,그 값을 바꾸는 함수]
  const [memories, setMemories] = useState(initialMemories);
  const selectedMemories = memories.filter(
    (memory) => memory.stationId === selectedStationId,
  );
  const selectedStation = stations.find(
    (station) => station.id === selectedStationId,
  );
  const [newMemory, setNewMemory] = useState({
    title: '',
    place: '',
    date: '',
    diary: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleChange(e) {
    setNewMemory({
      ...newMemory,
      [e.target.name]: e.target.value,
    });
  }
  function handleSave() {
    const createdMemory = {
      id: Date.now(),
      stationId: selectedStationId,
      ...newMemory,
    };
    setMemories([...memories, createdMemory]);
    setNewMemory({
      title: '',
      place: '',
      date: '',
      diary: '',
    });
    setIsFormOpen(false);
  }

  return (
    <main>
      <h1>나만의 추억 노선도</h1>
      <h2>학교 가는 길</h2>
      <p>선택된 역 ID: {selectedStationId}</p>
      <div className="route-layout">
        {/*전체 노선*/}
        <div className="route-list">
          {stations.map((station) => {
            const memoryCount = memories.filter(
              (memory) => memory.stationId === station.id,
            ).length;

            return (
              <Station
                key={station.id}
                name={station.name}
                memoryCount={memoryCount}
                onSelect={() => setSelectedStationId(station.id)}
              />
            );
          })}
        </div>

        {/*선택된 역의 추억 */}
        <div className="memory-panel">
          <h2>[{selectedStation.name}에서의 추억]</h2>

          {selectedMemories.length > 0 ? (
            selectedMemories.map((memory) => (
              <MemoryCard
                key={memory.id}
                title={memory.title}
                place={memory.place}
                date={memory.date}
                diary={memory.diary}
              />
            ))
          ) : (
            <p>아직 기록이 없어요</p>
          )}
        </div>
        <button onClick={() => setIsFormOpen(true)}>
          +{selectedStation.name}에 기록 추가하기
        </button>
        {isFormOpen && (
          <div>
            <h3>새로운 추억 기록하기</h3>

            <input
              type="text"
              name="title"
              value={newMemory.title}
              onChange={handleChange}
              placeholder="제목"
            />

            <input
              type="text"
              name="place"
              value={newMemory.place}
              onChange={handleChange}
              placeholder="장소"
            />

            <input
              type="text"
              name="date"
              value={newMemory.date}
              onChange={handleChange}
              placeholder="날짜"
            />

            <textarea
              name="diary"
              value={newMemory.diary}
              onChange={handleChange}
              placeholder="오늘의 추억을 기록해보세요"
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={() => setIsFormOpen(false)}>취소</button>
          </div>
        )}
      </div>
    </main>
  );
}
