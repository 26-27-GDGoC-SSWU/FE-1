export default function MemoryCard({ title, place, date, diary }) {
  return (
    <div>
      <h3>{title}</h3>
      <h6>{date}</h6>
      <p>{place}</p>
      <h5>{diary}</h5>
    </div>
  );
}
