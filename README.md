# 💻 PRACTICING

## 01. Context 생성

> 공연 필터 상태를 여러 컴포넌트에서 공유하기 위해 Context 생성
> 

```jsx
const PerformanceContext = createContext(null);

export function PerformanceProvider({ children }) {
  const [selectedType, setSelectedType] = useState("전체");

  return (
    <PerformanceContext.Provider value={{ selectedType, setSelectedType }}>
      {children}
    </PerformanceContext.Provider>
  );
}
```

## 02. Provider 적용

> App 전체에서 Context를 사용할 수 있도록 Provider 적용
> 

```jsx
<PerformanceProvider>
  <App />
</PerformanceProvider>
```

## 03. Custom Hook 생성

> 공연 종류에 따른 필터링 로직을 별도 파일로 분리
> 
- usePerformanceFilter.js를 생성하고 useMemo를 활용해 필터링 결과 관리

```jsx
function usePerformanceFilter(performances, selectedType) {
  return useMemo(() => {
    if (selectedType === "전체") return performances;

    return performances.filter((performance) => {
      return performance.type === selectedType;
    });
  }, [performances, selectedType]);
}
```

## 04. Context를 활용한 공연 필터 구현

> 필터 컴포넌트와 공연 목록 컴포넌트에서 Context 상태 사용
> 

```jsx
const { selectedType, setSelectedType } = usePerformanceContext();

<button onClick={() => setSelectedType("뮤지컬")}>
  뮤지컬
</button>
```

➡️ 버튼을 클릭하면 Context의 상태가 변경되고 공연 목록에도 반영

## 05. Custom Hook 적용

> 공연 목록에서 Custom Hook을 호출해 선택된 종류의 공연만 출력
> 

```jsx
const { selectedType } = usePerformanceContext();

const filteredPerformances = usePerformanceFilter(
  performances,
  selectedType
);
```

➡️ 필터링 로직을 컴포넌트 외부로 분리하여 공연 목록에서 재사용

## 06. 공연 종류 직접 선택 기능 추가

> API에서 가져온 공연 종류를 사용자가 기록 추가 과정에서 수정할 수 있도록 구현
> 

```jsx
<select value={type} onChange={(e) => setType(e.target.value)}>
  <option value="">공연 종류를 선택하세요</option>
  <option value="뮤지컬">뮤지컬</option>
  <option value="연극">연극</option>
  <option value="콘서트">콘서트</option>
</select>
```

➡️ API에서 가져온 기본 분류를 사용자가 변경하고, 최종 선택한 종류를 공연 기록에 저장
