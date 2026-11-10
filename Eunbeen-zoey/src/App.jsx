import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import useLocalStorage from './hooks/useLocalStorage';
import useStudyItems from './hooks/useStudyItems';
import useMemos from './hooks/useMemos';
import './App.css';

function App() {
  const [cycleDays, setCycleDays] = useLocalStorage('cycleDays', [1, 3, 7, 14, 30]);
  const { studyItems, addItem, removeItem } = useStudyItems();
  const { memos, saveMemo } = useMemos();

  return (
    <div className="app">
      <header className="app-header">
        <h1>망각 곡선 복습 플래너</h1>
      </header>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <HomePage studyItems={studyItems} cycleDays={cycleDays}
                    memos={memos} onSaveMemo={saveMemo} />
        } />
        <Route path="/settings" element={
          <SettingsPage cycleDays={cycleDays} onChangeCycle={setCycleDays}
                        studyItems={studyItems} onAddItem={addItem}
                        onRemoveItem={removeItem} />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;