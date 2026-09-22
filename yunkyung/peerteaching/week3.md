# React 상호작용성 — 핵심 키워드

## 전체 키워드

| 키워드 | 짧은 설명 |
|---|---|
| Event | 클릭, 입력, 제출 등 사용자의 행동을 감지 |
| Event Handler | 사용자의 행동이 발생했을 때 실행할 함수 |
| State | 사용자 행동에 따라 변하는 값을 저장 |
| useState | 컴포넌트에서 State를 만들고 변경하는 Hook |
| 상태 변경 → 화면 업데이트 | State가 바뀌면 React가 화면을 다시 렌더링 |
| Controlled Input | 입력창의 값을 State로 관리 |
| State 구조화 | 여러 상태를 어떤 형태로 관리할지 결정 |
| State 끌어올리기 | 여러 컴포넌트가 같은 State를 사용해야 할 때 부모로 이동 |

---

## 핵심 5개

### 1. Event — 사용자의 행동을 어떻게 감지할까?

사용자가 화면에서 하는 행동(클릭, 입력, 제출, 마우스 올리기 등)을 React는 이벤트로 받는다.
JSX 요소에 `on + 이벤트이름` 형태의 속성을 붙여서 감지한다.

| 이벤트 | 언제 발생? | 주로 쓰는 곳 |
|---|---|---|
| `onClick` | 클릭했을 때 | 버튼, 카드 |
| `onChange` | 입력값이 바뀔 때 | input, select, textarea |
| `onSubmit` | 폼을 제출할 때 | form |
| `onMouseEnter` | 마우스를 올렸을 때 | 툴팁, hover 효과 |

- HTML은 `onclick`(소문자), React는 `onClick`(camelCase)
- HTML은 문자열(`"handleClick()"`), React는 **함수 자체**(`{handleClick}`)를 넘긴다

### 2. Event Handler — 행동이 발생하면 어떤 코드를 실행할까?

이벤트가 발생했을 때 React가 대신 호출해줄 함수.
보통 컴포넌트 안에 정의하고, 이름은 `handle + 이벤트/대상`으로 짓는다. (`handleClick`, `handleNameChange`)

```jsx
function handleClick() {
  alert('클릭!');
}

<button onClick={handleClick}>클릭</button>        // 함수를 전달 → 클릭할 때 실행
<button onClick={() => alert('클릭!')}>클릭</button> // 짧으면 인라인 화살표 함수도 가능
```

- 핸들러는 이벤트 객체(`e`)를 인자로 받을 수 있다 → `e.target.value`, `e.preventDefault()` 등
- 컴포넌트 안에 있으니 props와 state에 바로 접근할 수 있다

### 3. State — 화면에서 바뀌어야 하는 값은 어디에 저장할까?

컴포넌트가 "기억"해야 하는 값. 사용자 행동에 따라 바뀌고, 바뀌면 화면에 반영돼야 하는 값을 State로 둔다.

**왜 일반 변수로는 안되는 이유**

```jsx
let count = 0;

function handleClick() {
  count = count + 1; // 값은 바뀌지만 화면은 그대로
}
```

1. 일반 변수는 렌더링될 때마다 다시 0으로 초기화된다 → 값을 기억하지 못함
2. 일반 변수를 바꿔도 React는 다시 그려야 한다는 걸 모른다 → 화면이 안 바뀜

State가 해결하는 것: **값을 유지하고, 바뀌면 다시 렌더링을 요청한다.**

### 4. useState — State를 만들고 변경하는 방법

```jsx
import { useState } from 'react';

const [count, setCount] = useState(0);
//     현재 값  변경 함수      초기값
```

- 배열 구조 분해로 `[값, 값을 바꾸는 함수]`를 받는다
- 이름은 관례적으로 `[something, setSomething]`
- 초기값은 첫 렌더링 때만 사용된다
- 값을 바꿀 때는 반드시 `setCount`를 사용 (`count = 5`처럼 직접 바꾸면 안 됨)
- Hook이므로 **컴포넌트 최상위**에서만 호출한다 (조건문, 반복문 안에서 X)

### 5. State 변경 → Re-render — State가 바뀌면 React가 화면을 업데이트

`setCount`를 호출하면 React는 컴포넌트 함수를 다시 실행(re-render)하고, 새 값으로 만든 JSX와 이전 화면을 비교해 바뀐 부분만 실제 화면에 반영한다.

주의할 점: **set 함수를 호출해도 현재 렌더링 안의 값은 바로 바뀌지 않는다.**

```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count); // 아직 이전 값이 찍힘
}
```

같은 핸들러 안에서 여러 번 누적해서 바꾸고 싶다면 함수형 업데이트를 쓴다.

```jsx
setCount(count + 1);
setCount(count + 1); // 결과: +1 (둘 다 같은 count 기준)

setCount(prev => prev + 1);
setCount(prev => prev + 1); // 결과: +2 (직전 값 기준)
```

---

## 한 줄 흐름

```
사용자 행동(Event)
   ↓
Event Handler 실행
   ↓
State 변경
   ↓
React가 다시 렌더링
   ↓
화면 변화
```

---

## 예시: 버튼 클릭 → 숫자 증가

버튼을 클릭하면 숫자가 증가하는 기능 하나로 이 섹션의 핵심을 거의 다 설명할 수 있다.

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
}

return (
  <>
    <p>{count}</p>
    <button onClick={handleClick}>+1</button>
  </>
);
```

### 포인트

`onClick` → `handleClick` → `setCount` → 화면 변화

| 코드 | 대응하는 키워드 |
|---|---|
| `onClick` | Event |
| `handleClick` | Event Handler |
| `count` | State |
| `useState(0)` / `setCount` | useState |
| `<p>{count}</p>` 갱신 | State 변경 → Re-render |

---

## 더 알아보기

### Controlled Input — 입력창의 값을 State로 관리

입력창의 값을 브라우저가 알아서 들고 있게 두지 않고, **State가 입력창의 값을 결정**하게 만드는 방식.

```jsx
function NameForm() {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <>
      <input value={name} onChange={handleChange} />
      <p>안녕하세요, {name}님</p>
    </>
  );
}
```

흐름: 타이핑 → `onChange` → `setName(e.target.value)` → 다시 렌더링 → `input`에 새 `name` 표시

- `value`와 `onChange`는 세트. `value`만 있고 `onChange`가 없으면 입력이 안 된다
- 입력값을 State로 들고 있으니 실시간 미리보기, 글자 수 제한, 유효성 검사 등을 쉽게 할 수 있다

### State 구조화 — 여러 상태를 어떤 형태로 관리할지 결정

State가 많아지면 "어떻게 나눠 담을지"가 중요해진다. 기본 원칙:

| 원칙 | 설명 |
|---|---|
| 함께 바뀌는 값은 묶기 | `x`, `y`를 따로 두기보다 `position = { x, y }` |
| 서로 모순될 수 있는 값 피하기 | `isSending`, `isSent`를 따로 두면 둘 다 `true`가 될 수 있음 → `status = 'typing' \| 'sending' \| 'sent'` |
| 계산할 수 있는 값은 State로 두지 않기 | `firstName`, `lastName`이 있으면 `fullName`은 렌더링 중에 계산 |
| 중복 피하기 | 목록 전체와 선택된 항목 객체를 둘 다 저장하지 말고, 선택된 항목은 `id`만 저장 |

```jsx
// X 중복 State
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

// 계산으로 해결
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = firstName + ' ' + lastName;
```

State가 적고 단순할수록 버그가 줄어든다.

### State 끌어올리기 — 여러 컴포넌트가 같은 State를 사용해야 할 때

두 컴포넌트가 같은 값을 공유하거나 서로 영향을 줘야 하면, State를 **가장 가까운 공통 부모**로 옮기고 props로 내려준다.

예: 패널 두 개 중 하나만 열려 있어야 하는 아코디언

```jsx
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0); // 부모가 State를 가짐

  return (
    <>
      <Panel
        title="소개"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      />
      <Panel
        title="사용법"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      />
    </>
  );
}

function Panel({ title, isActive, onShow }) {
  return (
    <section>
      <h3>{title}</h3>
      {isActive ? <p>내용...</p> : <button onClick={onShow}>열기</button>}
    </section>
  );
}
```

3단계로 정리하면:

1. 자식에서 State를 **제거**한다
2. 공통 부모에 State를 **추가**한다
3. 값은 props로, 변경 함수는 이벤트 핸들러 props(`onShow` 등)로 **전달**한다

각 `Panel`이 자기 `isActive`를 따로 가지고 있으면 서로 상태를 모르기 때문에 하나만 열기가 불가능하다. 부모가 관리하면 해결된다.