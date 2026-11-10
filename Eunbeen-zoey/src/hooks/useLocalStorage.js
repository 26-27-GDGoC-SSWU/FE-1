import { useState, useEffect } from 'react';

// state와 localStorage를 동기화하는 훅 (useState처럼 [값, 변경함수]를 반환)
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 저장 실패 시 무시
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;