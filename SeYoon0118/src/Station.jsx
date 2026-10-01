export default function Station({ name, memoryCount, onSelect, isSelected }) {
  return (
    <button
      className={`station-item ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <span className="station-dot"></span>

      <span className="station-name">{name}</span>

      <span className="station-count">
        {memoryCount > 0 ? `추억 ${memoryCount}` : '기록 없음'}
      </span>
    </button>
  );
}
