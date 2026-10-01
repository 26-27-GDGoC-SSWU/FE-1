import { useParams } from 'react-router';
import { stations } from './data.js';
import MemoryCard from './MemoryCard.jsx';
import { useState } from 'react';

export default function StationPage({ memories, setMemories }) {
  const { stationId } = useParams();

  const selectedStation = stations.find(
    (station) => station.id === Number(stationId),
  );
  const selectedMemories = memories.filter(
    (memory) => memory.stationId === Number(stationId),
  );

  const [newMemory, setNewMemory] = useState({
    title: '',
    place: '',
    date: '',
    diary: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleDelete(id) {
    setMemories(memories.filter((memory) => memory.id !== id));
  }

  function handleChange(e) {
    setNewMemory({
      ...newMemory,
      [e.target.name]: e.target.value,
    });
  }
  function handleSave() {
    const createdMemory = {
      id: Date.now(),
      stationId: Number(stationId),
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
  const currentMemory = selectedMemories[currentIndex];

  return (
    <div>
      <h1>{selectedStation.name}에서의 추억</h1>

      {currentMemory ? (
        <MemoryCard
          //key={memory.id}
          id={currentMemory.id}
          title={currentMemory.title}
          place={currentMemory.place}
          date={currentMemory.date}
          diary={currentMemory.diary}
          onDelete={handleDelete}
        />
      ) : (
        <p>아직 기록이 없어요</p>
      )}
      <button
        onClick={() => setCurrentIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
      >
        ← 이전
      </button>
      <p>
        {currentIndex + 1} / {selectedMemories.length}
      </p>
      <button
        onClick={() => setCurrentIndex(currentIndex + 1)}
        disabled={currentIndex === selectedMemories.length - 1}
      >
        다음 →
      </button>
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
  );
}
