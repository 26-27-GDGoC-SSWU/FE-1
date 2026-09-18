function PerformanceItem({ title, type, date, place }) {
  return (
    <div className="performance-item">
      <div className="poster"></div>

      <div className="performance-info">
        <h3>{title}</h3>
        <p>{type}</p>
        <p>{date}</p>
        <p>{place}</p>
      </div>
    </div>
  );
}

export default PerformanceItem;