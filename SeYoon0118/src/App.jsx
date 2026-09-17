const stations = [
  {
    id: 1,
    name: '충무로',
    memoryCount: 1,
  },
  {
    id: 2,
    name: '동대문역사문화공원',
    memoryCount: 1,
  },
  {
    id: 3,
    name: '동대문',
    memoryCount: 0,
  },
  {
    id: 4,
    name: '혜화',
    memoryCount: 1,
  },
  {
    id: 5,
    name: '한성대입구',
    memoryCount: 0,
  },
  {
    id: 6,
    name: '성신여대입구',
    memoryCount: 2,
  },
];

const memories = [
  {
    id: 1,
    stationId: 1,
    title: '친구랑 먹은 케이크',
    place: 'XX카페',
    date: '2026년 X월 X일',
  },
  {
    id: 2,
    stationId: 2,
    title: '비오는 날엔 파전',
    place: 'XX파전',
    date: '2025년 X월 X일',
  },
  {
    id: 3,
    stationId: 4,
    title: '뮤지컬 본 날',
    place: 'XX 팬케이크',
    date: '2026년 X월 X일',
  },
  {
    id: 4,
    stationId: 6,
    title: '나 혼자 과제',
    place: '스타벅스',
    date: '2025년 X월 X일',
  },
  {
    id: 5,
    stationId: 6,
    title: '쉬는 날 휴식',
    place: 'XX플라워 카페',
    date: '2026년 X월 X일',
  },
];

function Station({ name, memoryCount }) {
  //4.props로 name을 전달한다
  return (
    <div>
      <h3>{name}</h3>
      {memoryCount > 0 ? (
        <p>추억 {memoryCount}개</p>
      ) : (
        <p>아직 기록이 없어요</p>
      )}
    </div>
  );
}
function MemoryCard({ title, place, date }) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{date}</h5>
      <p>{place}</p>
    </div>
  );
}

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
