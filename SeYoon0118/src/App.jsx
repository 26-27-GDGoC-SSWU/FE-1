const stations = [
  {
    id: 1,
    name: '충무로',
  },
  {
    id: 2,
    name: '동대문역사문화공원',
  },
  {
    id: 3,
    name: '동대문',
  },
  {
    id: 4,
    name: '혜화',
  },
  {
    id: 5,
    name: '한성대입구',
  },
  {
    id: 6,
    name: '성신여대입구',
  },
];

function Station({ name }) {
  return (
    <div>
      <p>{name}</p>
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
          (
            station, //stations 배열을 하나씩 꺼내서 꺼낸역 하나를 'station'이라 부르고
          ) => (
            <Station
              key={station.id}
              name={station.name} //그 데이터로 Station 컴포넌트를 하나 만든다
            />
          ),
        )}
      </section>
    </main>
  );
}
