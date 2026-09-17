function Station() {
  return (
    <div>
      <p>성신여대입구</p>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <h1>나만의 추억 노선도</h1>

      <section>
        <h2>학교 가는 길</h2>

        <p>충무로</p>
        <p>동대문역사문화공원</p>
        <p>동대문</p>
        <p>혜화</p>
        <p>한성대입구</p>
        {/*<p>성신여대입구</p>*/}
        <Station />
      </section>
    </main>
  );
}
