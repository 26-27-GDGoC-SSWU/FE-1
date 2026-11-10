# MY ARCHIVE

영화와 책을 기록하고, 평점과 감상평을 남길 수 있는 개인 아카이브 웹 프로젝트입니다.  
React 스터디를 진행하며 매주 학습한 개념을 단계적으로 적용하였습니다.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- React Router
- Open Library API

## Study Progress

### Week 1 - React / JSX / Component

- React 프로젝트 환경 구성
- JSX 문법 학습
- Component 개념 이해
- MY ARCHIVE 프로젝트 구조 및 화면 기획

### Week 2 - Props / List Rendering

- Props를 활용한 컴포넌트 간 데이터 전달
- `map()`을 이용한 영화 목록 렌더링
- `key`를 활용한 리스트 관리
- MovieCard / MovieList 등 컴포넌트 분리

### Week 3 - Event / useState

- `useState`를 활용한 상태 관리
- `onClick`, `onChange` 등 사용자 이벤트 처리
- 영화 추가 기능 구현
- 별점 선택 및 감상평 입력 기능 구현
- Modal을 활용한 입력 UI 구성

### Week 4 - React Router

- React Router를 활용한 페이지 이동
- Home / Movies / Books / Detail 페이지 구성
- 동적 URL `:id` 활용
- `useParams`, `useLocation`, `Link` 사용
- 영화와 책 상세 페이지 구현

### Week 5 - API / useEffect

- REST API와 JSON 구조 이해
- `fetch`, `async / await`를 활용한 비동기 통신
- Open Library API를 활용한 책 검색 기능 구현
- 검색 결과에서 원하는 책을 선택하여 아카이브에 추가
- 책 표지, 저자, 출간연도 등의 외부 데이터 활용
- `useEffect`를 이용하여 책 상세 소개 데이터 호출

### Week 6 - API State Management

- API 요청 상태 관리
- Loading / Error / Empty 상태 구현
- `try / catch / finally`를 활용한 오류 처리
- `response.ok`를 이용한 HTTP 응답 확인
- 조건부 렌더링을 통한 상태별 UI 구성

### Week 7 - Context API

- Props Drilling 개념 이해
- `createContext`, `Provider`, `useContext` 학습
- books State를 BookContext로 분리
- Books와 BookDetail에서 동일한 State 공유
- URL의 id와 Context 데이터를 이용한 상세 데이터 조회

## Main Features

- 영화 및 책 목록 관리
- 영화 / 책 평점 기록
- 개인 감상평 작성
- 영화 및 책 상세 페이지
- Open Library API 책 검색
- 실제 책 표지, 저자, 출간연도 표시
- 책 소개 API 연동
- Loading / Error / Empty 상태 처리
- Context API를 활용한 책 데이터 공유

## Project Structure

```text
src
├─ components
│  ├─ MovieCard
│  ├─ MovieList
│  ├─ BookCard
│  └─ RatingStars
│
├─ context
│  └─ BookContext.jsx
│
├─ pages
│  ├─ Home.jsx
│  ├─ Movies.jsx
│  ├─ MovieDetail.jsx
│  ├─ Books.jsx
│  └─ BookDetail.jsx
│
├─ App.jsx
└─ main.jsx
```

## What I Learned

React의 기본적인 Component와 Props부터 시작하여 State 관리, 사용자 이벤트 처리, 페이지 라우팅, 외부 API 연동, 비동기 데이터 상태 관리, Context를 통한 공유 State 관리까지 단계적으로 학습하였습니다.

단순히 화면을 구성하는 것뿐만 아니라 사용자의 행동과 데이터의 변화에 따라 React가 화면을 다시 렌더링하는 흐름을 이해하고, 여러 페이지와 컴포넌트가 연결되는 구조를 직접 구현해보았습니다.