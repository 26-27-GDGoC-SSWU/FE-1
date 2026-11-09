
import { createContext, useContext, useState } from "react";

const PerformanceContext = createContext(null);

export function PerformanceProvider({ children }) {
  const [selectedType, setSelectedType] = useState("전체");

  return (
    <PerformanceContext.Provider
      value={{ selectedType, setSelectedType }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceContext() {
  const context = useContext(PerformanceContext);

  if (!context) {
    throw new Error(
      "usePerformanceContext는 PerformanceProvider 안에서 사용해야 합니다."
    );
  }

  return context;
}
