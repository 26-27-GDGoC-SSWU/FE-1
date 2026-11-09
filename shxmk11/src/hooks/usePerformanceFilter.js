
import { useMemo } from "react";

function usePerformanceFilter(performances, selectedType) {
  return useMemo(() => {
    if (selectedType === "전체") {
      return performances;
    }

    return performances.filter((performance) => {
      const type = performance.type || "";

      if (selectedType === "뮤지컬") {
        return type.includes("뮤지컬");
      }

      if (selectedType === "연극") {
        return type.includes("연극");
      }

      if (selectedType === "콘서트") {
        return type.includes("대중음악") || type.includes("콘서트");
      }

      return true;
    });
  }, [performances, selectedType]);
}

export default usePerformanceFilter;
