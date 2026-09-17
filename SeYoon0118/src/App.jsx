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

        <Station name="충무로" />
        <Station name="동대문역사문화공원" />
        <Station name="동대문" />
        <Station name="혜화" />
        <Station name="한성대입구" />
        <Station name="성신여대입구" />
      </section>
    </main>
  );
}
