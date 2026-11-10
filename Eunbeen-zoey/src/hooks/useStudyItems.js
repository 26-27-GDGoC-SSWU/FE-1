import useLocalStorage from './useLocalStorage';
import { COLOR_PALETTE } from '../utils/ebbinghaus';

// 학습 항목 상태 + 추가/삭제 로직을 한곳에 모은 훅
function useStudyItems() {
  const [studyItems, setStudyItems] = useLocalStorage('studyItems', []);

  const addItem = ({ title, startDate }) => {
    setStudyItems((prev) => {
      const color = COLOR_PALETTE[prev.length % COLOR_PALETTE.length];
      return [...prev, { id: Date.now(), title, startDate, color }];
    });
  };

  const removeItem = (id) => {
    setStudyItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { studyItems, addItem, removeItem };
}

export default useStudyItems;