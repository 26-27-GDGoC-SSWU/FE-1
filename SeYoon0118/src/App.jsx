import MemoryCard from './MemoryCard.jsx';
import Station from './Station.jsx';
import { stations, memories } from './data.js';
import { useState } from 'react';

export default function App() {
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id); //[현재 선택된 역 ID,그 값을 바꾸는 함수]
  const selectedMemories = memories.filter(
    (memory) => memory.stationId === selectedStationId,
  );
  const selectedStation = stations.find(
    (station) => station.id === selectedStationId,
  );
  return (
    <main>
      <h1>나만의 추억 노선도</h1>
      <h2>학교 가는 길</h2>
      <p>선택된 역 ID: {selectedStationId}</p>
      <div className="route-lauout">
        {/*전체 노선*/}
        <div className="route-list">
          {stations.map(
            //1.stations 배열을 하나씩 꺼낸다.
            (
              station, //2.꺼낸역 하나를 'station'이라 부르고
            ) => (
              <Station //3.그 데이터로 Station 컴포넌트를 하나 만든다
                key={station.id}
                name={station.name} //5.{name}으로 JSX에 표시한다.
                memoryCount={station.memoryCount}
                onSelect={() => setSelectedStationId(station.id)}
                //Station이 선택되면 setselectedStationId()실행하고, 현재 station의 id를 새로운 값으로 자장하라
              />
            ),
          )}
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
      </div>
    </main>
  );
}
