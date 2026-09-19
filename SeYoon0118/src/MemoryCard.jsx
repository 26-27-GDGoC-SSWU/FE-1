export default function MemoryCard({ title, place, date }) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{date}</h5>
      <p>{place}</p>
    </div>
  );
}
