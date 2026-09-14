# FE-1 Study Repository

프론트엔드 테크스터디 **개인 실습 코드 공유용 Repository**입니다.

각자 본인의 **GitHub ID 브랜치**와 **개인 프로젝트 폴더**를 하나씩 사용하며,  
매주 학습한 내용은 같은 프로젝트에 계속 적용하고 **Commit 기록으로 주차별 학습 내용을 남기는 방식**으로 진행합니다.

---

## 1. 기본 규칙

- 개인 브랜치명은 **본인의 GitHub ID**를 사용합니다.
- 개인 폴더명도 **본인의 GitHub ID**를 사용합니다.
- 본인 폴더 안에서만 작업합니다.
- 다른 멤버의 폴더는 수정하지 않습니다.
- 공용 파일을 수정해야 하는 경우 먼저 공유해주세요.
- `node_modules`는 업로드하지 않습니다.
- **주차별 브랜치를 새로 만들지 않습니다.**
- **주차별 폴더를 새로 만들지 않습니다.**
- 매주 같은 프로젝트를 발전시키고, 학습 내용은 Commit 기록으로 남깁니다.

### 예시 구조

```text
FE-1/
├─ README.md
├─ member-a/
│  ├─ public/
│  ├─ src/
│  ├─ package.json
│  └─ ...
├─ member-b/
└─ member-c/
```

### 브랜치 예시

```text
member-a
member-b
member-c
```

---

# 처음 한 번만 하기

## 2. Repository 받기

터미널에서 아래 명령어를 실행합니다.

```bash
git clone https://github.com/26-27-GDGoC-SSWU/FE-1.git
cd FE-1
```

---

## 3. 내 개인 브랜치 만들기

본인의 GitHub ID로 브랜치를 생성합니다.

```bash
git checkout -b member-a
```

`member-a` 부분을 본인의 GitHub ID로 변경해주세요.

예:

```bash
git checkout -b myGithubId
```

개인 브랜치는 처음 한 번만 생성하며, 이후 매주 같은 브랜치를 계속 사용합니다.

---

## 4. 개인 실습 프로젝트 만들기

본인의 GitHub ID를 프로젝트 폴더명으로 사용합니다.

```bash
npm create vite@latest member-a
```

`member-a` 부분을 본인의 GitHub ID로 변경해주세요.

프로젝트 생성 시 스터디에서는 아래 설정을 사용합니다.

```text
Framework → React
Variant → JavaScript
Linter → ESLint
Install with npm and start now? → Yes
```

생성 후 구조는 대략 다음과 같습니다.

```text
FE-1/
├─ README.md
└─ member-a/
   ├─ public/
   ├─ src/
   ├─ package.json
   └─ ...
```

이미 로컬에 개인 React 프로젝트를 만들어둔 경우에는  
해당 프로젝트를 본인의 GitHub ID 폴더 안으로 옮겨도 됩니다.

---

# 매주 작업하기

## 5. 작업 전 최신 main 확인

공용 Repository의 변경사항이 있다면 먼저 최신 내용을 확인합니다.

```bash
git checkout main
git pull origin main
```

그다음 다시 본인의 브랜치로 이동합니다.

```bash
git checkout member-a
```

---

## 6. 개인 프로젝트 작업

매주 새로운 프로젝트를 만들지 않고, 
기존 개인 실습 프로젝트에 해당 주차 학습 내용을 계속 추가합니다.

예:

```text
1주차 → React 프로젝트 생성
2주차 → Component / Props 적용
3주차 → State / Event 적용
4주차 → Router 적용
5주차 → API 연동
```

---

## 7. 변경 내용 확인

작업 후 변경된 파일을 확인합니다.

```bash
git status
```

---

## 8. Commit 하기

변경된 파일을 추가합니다.

```bash
git add .
```

그다음 Commit Message를 작성합니다.

```bash
git commit -m "feat: week2 add component and props"
```

### Commit Message 예시

```text
feat: week1 setup react project
feat: week2 add components and props
feat: week3 add state and input
feat: week4 add routing
feat: week5 fetch api data

fix: handle empty state

refactor: split components

docs: update README
```

주차별 폴더나 브랜치를 따로 만들지 않기 때문에,  
**Commit Message에서 어떤 주차의 작업인지 알 수 있도록 작성하는 것을 권장합니다.**

---

## 9. 개인 브랜치 Push

개인 브랜치를 처음 GitHub에 올릴 때:

```bash
git push -u origin member-a
```

`member-a` 부분은 본인의 GitHub ID로 변경해주세요.

처음 한 번 연결한 이후에는:

```bash
git push
```

만 입력하면 됩니다.

---

# Pull Request 생성

## 10. Pull Request

Push를 완료한 뒤 GitHub Repository에 접속합니다.

상단에 표시되는 **`Compare & pull request`** 버튼을 클릭합니다.

다음과 같이 설정되어 있는지 확인해주세요.

```text
Base     → main
Compare  → 본인의 개인 브랜치
```

예:

```text
Base     → main
Compare  → member-a
```

확인 후 Pull Request를 생성합니다.

---

### PR 제목 예시

```text
[Week 2] 이름 - Component / Props 실습
```

예:

```text
[Week 2] Lina - Component / Props 실습
```

### PR 본문 예시

```markdown
## 구현 내용
- 반복 UI를 Component로 분리
- Props를 이용해 데이터 전달
- 개인 실습 웹에 리스트 UI 적용

## 새롭게 알게 된 점
- Component 분리 기준
- Props 전달 방식
```

길게 작성할 필요는 없으며,  
**이번 주에 구현한 내용과 새롭게 알게 된 내용을 간단히 작성**하면 됩니다.

---

# 다음 주에는?

새로운 브랜치나 주차별 폴더를 만들 필요가 없습니다.

같은 개인 브랜치에서 계속 작업합니다.

```bash
git checkout main
git pull origin main

git checkout member-a
```

이후 기존 개인 프로젝트에 다음 주차 학습 내용을 추가합니다.

```text
작업
→ git add .
→ git commit
→ git push
→ Pull Request
```

순서로 반복합니다.

---

# 전체 흐름 한눈에 보기

### 처음 한 번

```text
Repository Clone
↓
개인 브랜치 생성
↓
개인 GitHub ID 폴더에 React 프로젝트 생성
```

### 매주

```text
main 최신화
↓
개인 브랜치 이동
↓
기존 개인 프로젝트에 주차별 기능 추가
↓
git add
↓
git commit
↓
git push
↓
Pull Request
```
---

## 주의사항

- 다른 멤버의 폴더는 수정하지 않습니다.
- 공용 파일 수정이 필요한 경우 먼저 공유해주세요.
- Push 전 프로젝트가 정상적으로 실행되는지 확인해주세요.
- 주차별 프로젝트 복사본을 새로 만들지 않습니다.
- 주차별 학습 내용은 Commit 기록으로 관리합니다.
- Push 권한 관련 오류가 발생하면 스터디 운영자에게 알려주세요.
