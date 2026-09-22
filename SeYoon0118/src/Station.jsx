export default function Station({ name, memoryCount, onSelect }) {
  //4.props로 name을 전달한다
  return (
    <button onClick={onSelect}>
      <h3>{name}</h3>
      {memoryCount > 0 && <p>추억 {memoryCount}개</p>}
    </button>
  );
}
