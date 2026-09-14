import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          rating={movie.rating}
          review={movie.review}
        />
      ))}
    </div>
  );
}

export default MovieList;