export default function MemoryCard({
  id,
  title,
  place,
  date,
  diary,
  onDelete,
}) {
  return (
    <div>
      <h3>{title}</h3>
      <h6>{date}</h6>
      <p>{place}</p>
      <h5>{diary}</h5>
      <button onClick={() => onDelete(id)}>삭제</button>
    </div>
  );
}
