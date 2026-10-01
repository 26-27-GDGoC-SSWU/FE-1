import { Link } from 'react-router';

export default function Station({ id, name, memoryCount }) {
  return (
    <Link to={`/station/${id}`}>
      <h3>{name}</h3>
      {memoryCount > 0 && <p>추억 {memoryCount}개</p>}
    </Link>
  );
}
