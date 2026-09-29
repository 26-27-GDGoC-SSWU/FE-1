import { Link } from "react-router";

function PerformanceItem({ id, title, type, date, place }) {
  return (
    <Link to={`/performance/${id}`} className="performance-item">
      <div className="poster"></div>

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