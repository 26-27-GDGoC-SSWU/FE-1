# Custom Hook & 외부 데이터 — 핵심 키워드

## 전체 키워드

| 키워드 | 짧은 설명 |
|---|---|
| Custom Hook | 여러 컴포넌트에서 반복되는 상태와 로직을 `use~` 함수로 분리해 재사용 |
| useLocalStorage | state와 localStorage 저장을 하나로 묶은 Custom Hook |
| useTodos | Todo 목록 state와 추가·삭제·완료 로직을 모은 Custom Hook |
| useEffect | 렌더링 후 API 요청, 저장 같은 추가 작업을 실행하는 Hook |
| 비동기 처리 | 시간이 걸리는 작업을 기다리는 동안 다른 작업을 멈추지 않는 방식 (`async` / `await`) |
| REST API | 주소 + HTTP 메서드(GET, POST…)로 서버와 데이터를 주고받는 방식 |
| JSON | 서버와 데이터를 주고받을 때 쓰는 데이터 형식 |

---

## Part 1. Custom Hook

### 1. 로직 재사용 — Custom Hook이 뭘까?

여러 컴포넌트에서 **반복해서 사용하는 상태와 로직을 하나의 Hook으로 분리**해서 재사용하는 방법.

- 이름은 반드시 `use`로 시작한다 (`useCounter`, `useTodos` …)
- 안에서 `useState`, `useEffect` 같은 다른 Hook을 사용할 수 있다
- **화면(JSX)을 만드는 게 아니라, 상태와 로직을 돌려준다**

예: 숫자를 세는 로직을 `useCounter`로 분리

```jsx
// useCounter.js
import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increase = () => setCount((prev) => prev + 1);

  return { count, increase }; // 화면이 아니라 값과 함수를 반환
}

export default useCounter;
```

```jsx
// 사용하는 컴포넌트 - useState와 증가 로직을 직접 쓸 필요가 없다
function Counter() {
  const { count, increase } = useCounter();

  return <button onClick={increase}>{count}</button>;
}
```

- `setCount(count + 1)`로 써도 되지만, 3주차에서 본 것처럼 `prev => prev + 1`(함수형 업데이트)이 연속 호출에도 안전하다
- 같은 Hook을 여러 컴포넌트에서 호출해도 **state는 각자 따로** 가진다 (로직만 공유, 값은 공유 X)

### 2. useLocalStorage — state + localStorage를 한 번에

localStorage를 쓰려면 매번 이런 코드가 필요하다.

1. localStorage에서 값 **불러오기**
2. 그 값으로 **state 만들기**
3. state가 바뀌면 localStorage에 다시 **저장하기**

이게 여러 컴포넌트에서 반복되면 중복 코드가 되니까 Hook 하나로 묶는다.

**간단 버전** — 값을 바꾸는 `save` 함수 안에서 state 변경 + 저장을 같이 한다

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(
    localStorage.getItem(key) ?? initialValue // 저장된 값이 없으면(null) 초기값
  );

  const save = (newValue) => {
    setValue(newValue);                 // state 변경
    localStorage.setItem(key, newValue); // localStorage 저장
  };

  return [value, save];
}
```

문자열(`"윤경"`)을 저장할 때는 이걸로 충분하다. 그런데 **배열이나 객체**(예: todos)를 저장하면 문제가 생긴다.

```jsx
localStorage.setItem("todos", [{ text: "공부" }]);
localStorage.getItem("todos"); // "[object Object]" ← 문자열로 망가져서 저장됨
```

**개선 버전** — `JSON.stringify` / `JSON.parse`로 어떤 값이든 저장하고, `useEffect`로 값이 바뀔 때마다 자동 저장

```jsx
// useLocalStorage.js
import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  // ① 처음 한 번: 저장된 값이 있으면 그걸로, 없으면 초기값으로 state 생성
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  // ② value가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]; // useState와 같은 모양으로 반환
}

export default useLocalStorage;
```

```jsx
// 사용법 - useState와 거의 똑같다
const [name, setName] = useLocalStorage("name", "");

setName("윤경"); // state 변경 + localStorage 저장 → 새로고침해도 "윤경" 유지
```

- localStorage는 **문자열만** 저장할 수 있어서 `JSON.stringify`로 저장, `JSON.parse`로 꺼낸다
- 핵심: **state 관리와 localStorage 저장 로직을 재사용 가능한 Hook 하나로 묶은 것**

### 3. useTodos — Todo 로직을 통째로 분리

Todo 목록 state와 추가·삭제·완료 기능을 Hook 안으로 옮긴다.
**컴포넌트는 UI에 집중하고, 데이터 관리는 Hook이 담당**한다.

**간단 버전** — 배열의 순서(index)로 삭제

```jsx
function useTodos() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { text, done: false }]);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index)); // index가 다른 것만 남김
  };

  return { todos, addTodo, deleteTodo };
}
```

index로 삭제하면 목록이 **필터링되거나 순서가 바뀔 때** 엉뚱한 항목이 지워질 수 있다.
(예: 날짜별로 걸러서 보여줄 때 화면의 1번 ≠ 전체 배열의 1번)
그래서 각 할 일에 고유한 `id`를 붙이고 `id`로 찾는 게 안전하다. `map()`의 `key`로도 그대로 쓸 수 있다.

**개선 버전** — `id`로 삭제 + 완료 토글 추가 + 위에서 만든 `useLocalStorage` 재사용 (Hook 안에서 Hook 사용 가능)

```jsx
// useTodos.js
import useLocalStorage from "./useLocalStorage";

function useTodos() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return { todos, addTodo, deleteTodo, toggleTodo };
}

export default useTodos;
```

```jsx
// 컴포넌트에는 화면 그리는 코드만 남는다
function TodoApp() {
  const { todos, addTodo, deleteTodo } = useTodos();

  return <TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} />;
}
```

컴포넌트는 Todo를 **어떻게** 관리하는지 몰라도 되고, 필요한 값과 함수만 꺼내 쓰면 된다.

### 4. 핵심 구조

```
Component  →  Custom Hook  →  State / Logic
(화면, UI)     (use~ 함수)     (useState, 변경 함수)
```

| 역할 | 담당 | Todo 프로젝트 예시 |
|---|---|---|
| 화면을 어떻게 보여줄지 | Component | `TodoList` - 목록을 화면에 출력 |
| 데이터를 어떻게 관리할지 | Custom Hook | `useTodos` - 추가 / 삭제 / 완료 처리 |

역할을 나누면

- 같은 로직을 여러 컴포넌트에서 재사용할 수 있고
- 컴포넌트 코드가 단순해진다

> **한 줄 정리: 화면을 만드는 코드와 상태를 관리하는 코드를 분리해서 로직을 재사용하는 것**

---

## Part 2. useEffect / 비동기 처리 / REST API / JSON

### 1. useEffect — 렌더링 후에 할 일

컴포넌트가 **렌더링된 후** 특정 작업을 실행할 때 사용하는 Hook.
API 요청, 데이터 저장, 이벤트 등록처럼 "화면 그리기 말고 추가로 해야 하는 일"에 쓴다.

```jsx
useEffect(() => {
  // 실행할 작업
}, [의존성]);
```

| 두 번째 인자 | 언제 실행? |
|---|---|
| `[]` | 처음 화면에 나타날 때 **한 번** |
| `[value]` | 처음 + `value`가 **바뀔 때마다** |
| 생략 | 렌더링될 **때마다** (거의 안 씀) |

```jsx
useEffect(() => {
  console.log("실행됨");
}, []); // 처음 한 번만 실행
```

- 왜 컴포넌트 안에서 바로 `fetch`하면 안 될까? → 컴포넌트 함수는 렌더링마다 다시 실행되니까, `fetch → setState → 렌더링 → fetch → …` **무한 반복**이 된다

### 2. 비동기 처리 — 기다리는 동안 멈추지 않기

시간이 걸리는 작업(인터넷으로 데이터 받아오기 등)이 끝날 때까지 **프로그램 전체가 멈춰서 기다리지 않고** 다른 작업을 계속하는 방식.

```jsx
async function getData() {
  const response = await fetch("/api/todos"); // 응답 올 때까지 이 함수 안에서만 기다림
  const data = await response.json();         // 응답을 JSON → JS 데이터로 변환

  console.log(data);
}
```

| 코드 | 의미 |
|---|---|
| `async function` | 이 함수 안에서 `await`를 쓸 수 있게 해줌 |
| `await fetch(...)` | API 응답이 올 때까지 기다림 (함수 밖은 멈추지 않음) |
| `await response.json()` | 받은 응답을 JavaScript 데이터로 변환 |

```
API 요청 → 응답 기다림 → JSON 데이터 변환 → 데이터 사용
```

`.then()`으로 써도 같은 뜻이다.

```jsx
fetch("/api/todos")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### 3. REST API — 서버와 데이터를 주고받는 규칙

**주소(URL)** 로 "무엇을", **HTTP 메서드**로 "어떻게"를 표현해서 서버에 요청한다.
React에서는 보통 `fetch()`로 요청을 보낸다.

| 메서드 | 의미 | 예시 |
|---|---|---|
| GET | 조회 | 할 일 목록 가져오기 |
| POST | 생성 | 할 일 추가 |
| PUT | 전체 수정 | 할 일 전체 수정 |
| PATCH | 일부 수정 | 완료 상태만 변경 |
| DELETE | 삭제 | 할 일 삭제 |

```jsx
// GET (fetch의 기본값)
const response = await fetch("/api/todos");
const data = await response.json();

// POST - 메서드와 보낼 데이터를 같이 적는다
await fetch("/api/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "React 공부" }),
});
```

| 코드 | 의미 |
|---|---|
| `fetch("/api/todos")` | `/api/todos` 주소로 요청을 보냄 |
| `response` | 서버가 보내준 응답 (상태 코드, 데이터 등) |
| `response.ok` | 성공(200번대)이면 `true` |
| `response.json()` | 응답 데이터를 JS에서 쓸 수 있게 변환 |

- 주의: `fetch`는 404, 500 에러여도 **실패로 처리하지 않는다** → `response.ok`를 직접 확인해야 함

### 4. JSON — 데이터를 주고받는 형식

서버와 데이터를 주고받을 때 쓰는 **텍스트 형식**. JS 객체와 비슷하게 생겼지만 key도 `"큰따옴표"`로 감싼다.

```json
{
  "id": 1,
  "title": "React 공부",
  "done": false
}
```

JS 데이터로 변환한 뒤에는 객체처럼 쓴다.

```jsx
data.title; // "React 공부"
data.done;  // false
```

배열 형태로 오면 `map()`으로 화면에 출력한다.

```json
[
  { "id": 1, "title": "React 공부" },
  { "id": 2, "title": "API 공부" }
]
```

```jsx
data.map((todo) => <div key={todo.id}>{todo.title}</div>);
```

| 변환 | 함수 |
|---|---|
| JSON 문자열 → JS 데이터 | `JSON.parse()` / `response.json()` |
| JS 데이터 → JSON 문자열 | `JSON.stringify()` |

---

## 한 줄 흐름 — 네 가지가 합쳐지면

실제로 API 데이터를 가져올 때는 **useEffect + 비동기 처리 + REST API + JSON** 을 같이 쓴다.

```jsx
import { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const response = await fetch("/api/todos"); // REST API - GET 요청
      const data = await response.json();         // JSON → JS 데이터
      setTodos(data);                             // state 변경
    }

    getTodos();
  }, []); // 처음 한 번만

  return (
    <div>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}
```

- `useEffect(async () => ...)`처럼 **useEffect 함수 자체에 async를 붙이면 안 된다** → 안에 async 함수를 만들고 호출한다

```
컴포넌트 렌더링
   ↓
useEffect 실행
   ↓
getTodos() 실행
   ↓
REST API에 GET 요청
   ↓
서버에서 JSON 응답
   ↓
response.json() → JavaScript 데이터로 변환
   ↓
setTodos(data) → State 변경
   ↓
화면 다시 렌더링
```

| 코드 | 대응하는 키워드 |
|---|---|
| `useEffect(() => { ... }, [])` | useEffect |
| `async` / `await` | 비동기 처리 |
| `fetch("/api/todos")` | REST API (GET) |
| `response.json()` | JSON |
| `setTodos(data)` → 다시 렌더링 | State 변경 → Re-render |

---

## 더 알아보기

### 로딩 / 에러 처리

API는 시간이 걸리고 실패할 수도 있으니 **데이터 / 로딩 / 에러** 세 가지 state를 같이 두면 좋다.

```jsx
const [todos, setTodos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function getTodos() {
    try {
      const response = await fetch("https://dummyjson.com/todos?limit=5");
      if (!response.ok) throw new Error(`요청 실패 (${response.status})`);
      const data = await response.json();
      setTodos(data.todos);
    } catch (err) {
      setError(err.message); // 네트워크 오류, 404/500 등
    } finally {
      setLoading(false);     // 성공이든 실패든 로딩 끝
    }
  }

  getTodos();
}, []);

if (loading) return <p>불러오는 중...</p>;
if (error) return <p>{error}</p>;
```

### 두 파트 합치기 — API 호출도 Custom Hook으로

API를 부르는 로직도 여러 곳에서 반복되니까 `useFetch` 같은 Custom Hook으로 뺄 수 있다.

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`요청 실패 (${res.status})`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// 사용
const { data, loading, error } = useFetch("https://dummyjson.com/todos?limit=5");
```

→ **Component(화면) → useFetch(Custom Hook) → useEffect + fetch(State / Logic)** 구조가 된다.
