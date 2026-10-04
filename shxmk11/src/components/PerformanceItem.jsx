import { Link } from "react-router";

function PerformanceItem({ id, title, type, date, place, poster }) {
  return (
    <Link to={`/performance/${id}`} className="performance-item">
      <div className="poster">
        {poster && <img src={poster} alt={title} />}
      </div>

      <div className="performance-info">
        <h3>{title}</h3>
        <p>{type}</p>
        <p>{date}</p>
        <p>{place}</p>
      </div>
    </Link>
  );
}

export default PerformanceItem;