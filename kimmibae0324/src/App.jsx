import MovieList from "./components/MovieList";

const movies = [
  {
    id: 1,
    title: "Interstellar",
    rating: 5,
    review: "다시 보고 싶은 영화",
  },
  {
    id: 2,
    title: "Dune",
    rating: 4,
    review: "영상미가 인상적이었다",
  },
  {
    id: 3,
    title: "Avatar",
    rating: 3,
    review: "세계관은 좋았지만 조금 길었다",
  },
];

function App() {
  return (
    <div>
      <h1>MY ARCHIVE</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;