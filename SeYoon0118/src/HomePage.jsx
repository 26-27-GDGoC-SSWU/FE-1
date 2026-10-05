//import MemoryCard from './MemoryCard.jsx';
import Station from './Station.jsx';
import { stations } from './data.js';
import { useState } from 'react';
import { Link } from 'react-router';

export default function HomePage({ memories, setMemories }) {
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id);
  const selectedStation = stations.find(
    (station) => station.id === selectedStationId,
  );

  const selectedMemories = memories.filter(
    (memory) => memory.stationId === selectedStationId,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMemory = selectedMemories[currentIndex];
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

    setCurrentIndex(selectedMemories.length);
    setIsFormOpen(false);
  }
  return (
    <main className="home-page">
      <header className="home-header">
        <div>
          <p className="home-eyebrow">나만의 추억 노선도</p>
          <h1>학교 가는 길</h1>
        </div>
      </header>

      <div className="home-layout">
        {/* 전체 노선 */}
        <section className="route-panel">
          <div className="route-panel-header">
            <div>
              <p className="section-label">나의 노선</p>
              <h2>학교 가는 길</h2>
            </div>

            <p className="route-summary">{stations.length}개 역</p>
          </div>

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
                  isSelected={selectedStationId === station.id}
                  onSelect={() => {
                    setSelectedStationId(station.id);
                    setCurrentIndex(0);
                    setIsFormOpen(false);
                  }}
                />
              );
            })}
          </div>
        </section>
        <aside className="memory-panel">
          <div className="memory-panel-header">
            <div>
              <p className="section-label">선택한 역</p>
              <h2>{selectedStation.name}</h2>
            </div>

            <Link
              className="full-view-link"
              to={`/station/${selectedStation.id}`}
            >
              전체보기 →
            </Link>
          </div>

          {currentMemory ? (
            <>
              <div className="home-memory-card">
                <p className="memory-date">{currentMemory.date}</p>

                <h3>{currentMemory.title}</h3>

                <p className="memory-place">● {currentMemory.place}</p>

                <div className="memory-divider"></div>

                <p className="memory-diary">{currentMemory.diary}</p>
              </div>

              <div className="memory-navigation">
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
            </>
          ) : (
            <div className="empty-memory">
              <p>아직 이 역에 남긴 추억이 없어요.</p>
            </div>
          )}

          <button
            className="add-memory-button"
            onClick={() => setIsFormOpen(true)}
          >
            + 새 기록 추가
          </button>
          {isFormOpen && (
            <div className="memory-form home-memory-form">
              <h3>{selectedStation.name}에 새 기록</h3>

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

                <button className="save-button" onClick={handleSave}>
                  저장
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
