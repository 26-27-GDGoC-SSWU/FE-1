import { Routes, Route } from 'react-router';
import HomePage from './HomePage.jsx';
import StationPage from './StationPage.jsx';
import RouteSearchPage from './RouteSearchPage.jsx';
import { useState } from 'react';
import { memories as initialMemories } from './data.js';

export default function App() {
  const [memories, setMemories] = useState(initialMemories);
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage memories={memories} setMemories={setMemories} />}
      />
      <Route
        path="/station/:stationId"
        element={<StationPage memories={memories} setMemories={setMemories} />}
      />
      <Route path="/route/new" element={<RouteSearchPage />} />
    </Routes>
  );
}
