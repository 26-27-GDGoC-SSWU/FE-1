import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import { COLOR_PALETTE } from './utils/ebbinghaus';
import './App.css';

function App() {
  const [cycleDays, setCycleDays] = useState([1, 3, 7, 14, 30]);
  const [studyItems, setStudyItems] = useState([]);
  const [memos, setMemos] = useState({});

  const handleAddStudyItem = ({ title, startDate }) => {
    const color = COLOR_PALETTE[studyItems.length % COLOR_PALETTE.length];
    const newItem = { id: Date.now(), title, startDate, color };
    setStudyItems((prev) => [...prev, newItem]);
  };

  const handleRemoveStudyItem = (id) => {
    setStudyItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveMemo = (dateStr, text) => {
    setMemos((prev) => {
      const updated = { ...prev };
      if (text.trim()) {
        updated[dateStr] = text;
      } else {
        delete updated[dateStr];
      }
      return updated;
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>망각 곡선 복습 플래너</h1>
        <p>에빙하우스 망각 곡선에 따라 복습일을 자동으로 계산해주는 개인 학습 플래너</p>
      </header>

      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              studyItems={studyItems}
              cycleDays={cycleDays}
              memos={memos}
              onSaveMemo={handleSaveMemo}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              cycleDays={cycleDays}
              onChangeCycle={setCycleDays}
              studyItems={studyItems}
              onAddItem={handleAddStudyItem}
              onRemoveItem={handleRemoveStudyItem}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;