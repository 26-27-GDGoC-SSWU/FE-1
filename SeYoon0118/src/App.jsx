import MemoryCard from './MemoryCard.jsx';
import Station from './Station.jsx';
import { stations, memories } from './data.js';

export default function App() {
  return (
    <main>
      <h1>나만의 추억 노선도</h1>

      <section>
        <h2>학교 가는 길</h2>

        {stations.map(
          //1.stations 배열을 하나씩 꺼낸다.
          (
            station, //2.꺼낸역 하나를 'station'이라 부르고
          ) => (
            <Station //3.그 데이터로 Station 컴포넌트를 하나 만든다
              key={station.id}
              name={station.name} //5.{name}으로 JSX에 표시한다.
              memoryCount={station.memoryCount}
            />
          ),
        )}

        {stations.map((station) => {
          const stationMemories = memories.filter(
            (memory) => memory.stationId === station.id,
          );
          return (
            <section key={station.id}>
              <h2>[{station.name}에서의 추억]</h2>
              {stationMemories.length > 0 ? (
                stationMemories.map((memory) => (
                  <MemoryCard
                    key={memory.id}
                    title={memory.title}
                    place={memory.place}
                    date={memory.date}
                  />
                ))
              ) : (
                <p>아직 기록이 없어요</p>
              )}
            </section>
          );
        })}
      </section>
    </main>
  );
}
