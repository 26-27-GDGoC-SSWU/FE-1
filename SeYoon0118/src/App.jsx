import { Routes, Route } from 'react-router';
import HomePage from './HomePage.jsx';
import StationPage from './StationPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/station/:stationId" element={<StationPage />} />
    </Routes>
  );
}
