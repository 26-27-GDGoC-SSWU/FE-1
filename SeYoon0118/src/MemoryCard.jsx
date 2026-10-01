export default function MemoryCard({
  id,
  title,
  place,
  date,
  diary,
  onDelete,
}) {
  return (
    <article className="memory-card">
      <div className="memory-card-top">
        <p className="memory-card-date">{date}</p>

        <button className="memory-delete-button" onClick={() => onDelete(id)}>
          삭제
        </button>
      </div>

      <h3 className="memory-card-title">{title}</h3>

      <p className="memory-card-place">
        <span className="place-dot"></span>
        {place}
      </p>

      <div className="memory-card-divider"></div>

      <p className="memory-card-diary">{diary}</p>
    </article>
  );
}
