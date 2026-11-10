import { createContext, useState } from "react";

export const BookContext = createContext();

const initialBooks = [
  {
    id: 1,
    title: "1984",
    rating: 5,
    review: "생각할 거리가 많았던 책",
    color: "#7a4635",
  },
  {
    id: 2,
    title: "Norwegian Wood",
    rating: 4,
    review: "분위기가 인상적이었다",
    color: "#31594c",
  },
];

function BookProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
}

export default BookProvider;