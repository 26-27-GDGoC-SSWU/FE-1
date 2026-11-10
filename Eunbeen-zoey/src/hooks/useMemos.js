import useLocalStorage from './useLocalStorage';

// 날짜별 메모 상태 + 저장 로직
function useMemos() {
  const [memos, setMemos] = useLocalStorage('memos', {});

  const saveMemo = (dateStr, text) => {
    setMemos((prev) => {
      const updated = { ...prev };
      if (text.trim()) updated[dateStr] = text;
      else delete updated[dateStr];
      return updated;
    });
  };

  return { memos, saveMemo };
}

export default useMemos;