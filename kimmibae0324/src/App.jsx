import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetail />} />

      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetail />} />
    </Routes>
  );
}

export default App;