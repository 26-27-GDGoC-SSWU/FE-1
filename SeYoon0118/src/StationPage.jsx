import { stations } from './data.js';
import MemoryCard from './MemoryCard.jsx';
import { useState } from 'react';
import { Link, useParams } from 'react-router';

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
    <main className="station-page">
      <div className="station-page-header">
        <Link className="back-to-route" to="/">
          ← 노선도로
        </Link>

        <p className="section-label">역의 기록</p>

        <div className="station-title-row">
          <h1>{selectedStation.name}에서의 추억</h1>

          <p>기록 {selectedMemories.length}개</p>
        </div>
      </div>

      <div className="station-memory-area">
        {currentMemory ? (
          <MemoryCard
            id={currentMemory.id}
            title={currentMemory.title}
            place={currentMemory.place}
            date={currentMemory.date}
            diary={currentMemory.diary}
            onDelete={handleDelete}
          />
        ) : (
          <div className="empty-memory">
            <p>아직 기록이 없어요.</p>
          </div>
        )}
      </div>

      <div className="station-memory-navigation">
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ← 이전
        </button>

        <p>
          <strong>{currentIndex + 1}</strong>
          {' / '}
          {selectedMemories.length}
        </p>

        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex === selectedMemories.length - 1}
        >
          다음 →
        </button>
      </div>

      <button
        className="station-add-button"
        onClick={() => setIsFormOpen(true)}
      >
        + {selectedStation.name}에 기록 추가하기
      </button>
{isFormOpen && (
  <div className="memory-form">
    <h3>
      {selectedStation.name}에 새 기록
    </h3>

    <input
      type="text"
      name="title"
      value={newMemory.title}
      onChange={handleChange}
      placeholder="제목"
    />

    <div className="memory-form-row">
      <input
        type="text"
        name="date"
        value={newMemory.date}
        onChange={handleChange}
        placeholder="날짜"
      />

      <input
        type="text"
        name="place"
        value={newMemory.place}
        onChange={handleChange}
        placeholder="장소"
      />
    </div>

    <textarea
      name="diary"
      value={newMemory.diary}
      onChange={handleChange}
      placeholder="오늘 이 역에서 있었던 일을 적어보세요"
    />

    <div className="memory-form-actions">
      <button
        className="cancel-button"
        onClick={() => setIsFormOpen(false)}
      >
        취소
      </button>

      <button
        className="save-button"
        onClick={handleSave}
      >
        저장
      </button>
    </div>
  </div>
)}
      
    </main>
  );
}
